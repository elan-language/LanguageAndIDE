/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleClick, handleDblClick, handleKey } from "../editorHandlers";
import { ElanRuntimeError } from "../elan-runtime-error";
import { DefaultProfile } from "../frames/default-profile";
import { CodeSourceFromString, FileImpl, cannotLoadFile } from "../frames/file-impl";
import { editorEvent } from "../frames/interfaces/editor-event";
import { File } from "../frames/interfaces/file";
import { Profile } from "../frames/interfaces/profile";
import { CompileStatus, ParseStatus, RunStatus, TestStatus } from "../frames/status-enums";
import { StdLib } from "../standard-library/std-lib";
import { fetchProfile, hash, transforms } from "./web-helpers";
import { WebInputOutput } from "./web-input-output";
import {
  WebWorkerMessage,
  WebWorkerReadMessage,
  WebWorkerStatusMessage,
  WebWorkerTestMessage,
  WebWorkerWriteMessage,
} from "./web-worker-messages";

// static html elements
const codeContainer = document.querySelector(".elan-code");
const runButton = document.getElementById("run-button") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const pauseButton = document.getElementById("pause") as HTMLButtonElement;
const clearConsoleButton = document.getElementById("clear-console") as HTMLButtonElement;
const clearGraphicsButton = document.getElementById("clear-graphics") as HTMLButtonElement;
const expandCollapseButton = document.getElementById("expand-collapse") as HTMLButtonElement;
const newButton = document.getElementById("new") as HTMLButtonElement;
const demosButton = document.getElementById("demos") as HTMLButtonElement;
const trimButton = document.getElementById("trim") as HTMLButtonElement;
const consoleDiv = document.getElementById("console") as HTMLDivElement;
const graphicsDiv = document.getElementById("graphics") as HTMLDivElement;
const loadButton = document.getElementById("load") as HTMLButtonElement;
const appendButton = document.getElementById("add") as HTMLButtonElement;
const saveButton = document.getElementById("save") as HTMLButtonElement;
const autoSaveButton = document.getElementById("auto-save") as HTMLButtonElement;
const undoButton = document.getElementById("undo") as HTMLButtonElement;
const redoButton = document.getElementById("redo") as HTMLButtonElement;

const codeTitle = document.getElementById("code-title") as HTMLDivElement;
const parse = document.getElementById("parse") as HTMLDivElement;
const compile = document.getElementById("compile") as HTMLDivElement;
const test = document.getElementById("test") as HTMLDivElement;
const runStatus = document.getElementById("run-status") as HTMLDivElement;
const codeControls = document.getElementById("code-controls") as HTMLDivElement;
const demoFiles = document.getElementsByClassName("demo-file");

const inactivityTimeout = 2000;
const stdlib = new StdLib();
const system = stdlib.system;
system.stdlib = stdlib; // to allow injection

// well known ids
const lastDirId = "elan-files";

const elanInputOutput = new WebInputOutput(consoleDiv, graphicsDiv);
let undoRedoFiles: string[] = [];
let previousFileIndex: number = -1;
let currentFileIndex: number = -1;
let nextFileIndex: number = -1;
let undoRedoing: boolean = false;
let currentFieldId: string = "";

let file: File;
let doOnce = true;
let profile: Profile;
let lastSavedHash = "";
let undoRedoHash = "";
let runWorker: Worker | undefined;
let testWorker: Worker | undefined;
let inactivityTimer: any | undefined = undefined;
let autoSaveFileHandle: FileSystemFileHandle | undefined = undefined;

autoSaveButton.hidden = !useChromeFileAPI();

// add all the listeners

undoButton.addEventListener("click", undo);

redoButton.addEventListener("click", redo);

consoleDiv.addEventListener("click", () => {
  consoleDiv.getElementsByTagName("input")?.[0]?.focus();
});

trimButton.addEventListener("click", async () => {
  file.removeAllSelectorsThatCanBe();
  await renderAsHtml();
});

runButton?.addEventListener("click", () => {
  try {
    clearDisplays();
    file.setRunStatus(RunStatus.running);
    updateDisplayValues();
    const path = `${document.location.origin}${document.location.pathname}`.replace(
      "/index.html",
      "",
    );
    const jsCode = file.compileAsWorker(path);
    const asUrl = "data:text/javascript;base64," + btoa(jsCode);

    runWorker = new Worker(asUrl, { type: "module" });

    runWorker.onmessage = async (e: MessageEvent<WebWorkerMessage>) => {
      const data = e.data;

      switch (data.type) {
        case "write":
          await handleWorkerIO(data);
          break;
        case "status":
          switch (data.status) {
            case "finished":
              handleRunWorkerFinished();
              break;
            case "error":
              await handleRunWorkerError(data);
              break;
          }
      }
    };

    runWorker.onerror = async (ev: ErrorEvent) => {
      const err = new ElanRuntimeError(ev.message);
      await showError(err, file.fileName, false);
      file.setRunStatus(RunStatus.error);
      updateDisplayValues();
    };

    runWorker.postMessage({ type: "start" } as WebWorkerMessage);
  } catch (e) {
    console.warn(e);
    file.setRunStatus(RunStatus.error);
    updateDisplayValues();
  }
});

stopButton?.addEventListener("click", () => {
  if (runWorker) {
    runWorker.terminate();
    runWorker = undefined;
    file.setRunStatus(RunStatus.default);
  }
  if (testWorker) {
    endTests();
    file.setTestStatus(TestStatus.default);
  }
  updateDisplayValues();
});

clearConsoleButton?.addEventListener("click", () => {
  elanInputOutput.clearConsole();
});

clearGraphicsButton?.addEventListener("click", () => {
  elanInputOutput.clearGraphics();
});

expandCollapseButton?.addEventListener("click", async () => {
  file.expandCollapseAll();
  await renderAsHtml();
});

newButton?.addEventListener("click", async () => {
  if (checkForUnsavedChanges()) {
    clearDisplays();
    clearUndoRedoAndAutoSave();
    file = new FileImpl(hash, profile, transforms());
    await initialDisplay(false);
  }
});

loadButton.addEventListener("click", chooser(getUploader()));

appendButton.addEventListener("click", chooser(getAppender()));

saveButton.addEventListener("click", getDownloader());

autoSaveButton.addEventListener("click", handleChromeAutoSave);

for (const elem of demoFiles) {
  elem.addEventListener("click", async () => {
    if (checkForUnsavedChanges()) {
      const fileName = `${elem.id}`;
      const f = await fetch(fileName, { mode: "same-origin" });
      const rawCode = await f.text();
      file = new FileImpl(hash, profile, transforms());
      file.fileName = fileName;
      await readAndParse(rawCode, fileName, true);
    }
  });
}

// from https://stackoverflow.com/questions/4565112/how-to-find-out-if-the-user-browser-is-chrome
function checkIsChrome() {
  // please note,
  // that IE11 now returns undefined again for window.chrome
  // and new Opera 30 outputs true for window.chrome
  // but needs to check if window.opr is not undefined
  // and new IE Edge outputs to true now for window.chrome
  // and if not iOS Chrome check
  // so use the below updated condition
  const isChromium = (window as any).chrome;
  const winNav = window.navigator;
  const vendorName = (winNav as any).vendor;
  const isOpera = typeof (window as any).opr !== "undefined";
  const isFirefox = winNav.userAgent.indexOf("Firefox") > -1;
  const isIEedge = winNav.userAgent.indexOf("Edg") > -1;
  const isIOSChrome = winNav.userAgent.match("CriOS");
  const isGoogleChrome =
    typeof (winNav as any).userAgentData !== "undefined"
      ? (winNav as any).userAgentData.brands[0].brand === "Google Chrome"
      : vendorName === "Google Inc.";

  if (isIOSChrome) {
    // is Google Chrome on IOS
    return true;
  } else if (
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false &&
    isGoogleChrome
  ) {
    // is Google Chrome
    return true;
  } else {
    // not Google Chrome
    return false;
  }
}

function confirmContinueOnNonChromeBrowser() {
  return confirm(`We recommend that you access Elan via Chrome,
which runs on all platforms.
If you click OK you may continue to use Elan but, currently,
it is not guaranteed to run correctly on this browser.`);
}

const isChrome = checkIsChrome();
const okToContinue = isChrome || confirmContinueOnNonChromeBrowser();

if (okToContinue) {
  // fetch profile triggers page display
  fetchProfile()
    .then(async (p) => await setup(p))
    .catch(async (e) => {
      console.warn("profile not found - using default");
      await setup(new DefaultProfile());
    });
} else {
  const msg = "Require Chrome";
  disable(runButton, msg);
  disable(stopButton, msg);
  disable(loadButton, msg);
  disable(appendButton, msg);
  disable(saveButton, msg);
  disable(autoSaveButton, msg);
  disable(newButton, msg);
  disable(demosButton, msg);
  disable(trimButton, msg);
  disable(expandCollapseButton, msg);
  disable(undoButton, msg);
  disable(redoButton, msg);
  disable(clearConsoleButton, msg);
  disable(clearGraphicsButton, msg);
  for (const elem of demoFiles) {
    elem.setAttribute("hidden", "");
  }
}

function checkForUnsavedChanges(): boolean {
  return hasUnsavedChanges()
    ? confirm("You have unsaved changes - they will be lost unless you cancel")
    : true;
}

async function setup(p: Profile) {
  clearUndoRedoAndAutoSave();
  profile = p;
  file = new FileImpl(hash, profile, transforms());
  await displayFile();
}

async function renderAsHtml() {
  const content = await file.renderAsHtml();
  try {
    await updateContent(content);
  } catch (e) {
    await showError(e as Error, file.fileName, false);
  }
}

function clearDisplays() {
  elanInputOutput.clearConsole();
  elanInputOutput.clearGraphics();
}

function clearUndoRedoAndAutoSave() {
  autoSaveFileHandle = undefined;
  previousFileIndex = nextFileIndex = currentFileIndex = -1;
  localStorage.clear();
  undoRedoFiles = [];
  lastSavedHash = "";
}

async function resetFile() {
  file = new FileImpl(hash, profile, transforms());
  await renderAsHtml();
}

async function showError(err: Error, fileName: string, reset: boolean) {
  clearDisplays();
  if (reset) {
    await resetFile();
  }

  file.fileName = fileName;

  if (err.message === cannotLoadFile) {
    elanInputOutput.printLine(err.message);
  } else if (err.stack) {
    let msg = "";
    let stack = "";
    if (err instanceof ElanRuntimeError) {
      msg = "A Runtime error occurred in the Elan code";
      stack = err.elanStack;
    } else {
      msg =
        "An unexpected error has occurred; please email whole-screen snapshot to rpawson@nakedobjects.org\nTo continue, try clicking the Refresh icon on the browser.";
      stack = err.stack;
    }
    elanInputOutput.printLine(msg);
    elanInputOutput.printLine(stack);
  } else {
    elanInputOutput.printLine(err.message ?? "Unknown error parsing file");
  }
  cursorDefault();
}

async function refreshAndDisplay(compileIfParsed?: boolean) {
  file.refreshParseAndCompileStatuses(compileIfParsed);
  if (file.readCompileStatus() === CompileStatus.ok) {
    runTests();
  }
  try {
    await renderAsHtml();
  } catch (e) {
    await showError(e as Error, file.fileName, false);
  }
}

async function initialDisplay(reset: boolean) {
  clearDisplays();

  const ps = file.readParseStatus();
  if (ps === ParseStatus.valid || ps === ParseStatus.default) {
    await refreshAndDisplay();
    lastSavedHash = lastSavedHash || file.currentHash;
    updateNameAndSavedStatus();
  } else {
    const msg = file.parseError || "Failed load code";
    await showError(new Error(msg), file.fileName, reset);
  }
}

async function displayCode(rawCode: string, fileName: string) {
  const code = new CodeSourceFromString(rawCode);
  try {
    await file.parseFrom(code);
    file.fileName = fileName || file.defaultFileName;
    await refreshAndDisplay(true);
  } catch (e) {
    await showError(e as Error, fileName || file.defaultFileName, true);
  }
}

async function displayFile() {
  await initialDisplay(true);
}

function getModKey(e: KeyboardEvent | MouseEvent) {
  return { control: e.ctrlKey, shift: e.shiftKey, alt: e.altKey };
}

function hasUnsavedChanges() {
  return !(lastSavedHash === file.currentHash);
}

function updateNameAndSavedStatus() {
  const unsaved = hasUnsavedChanges() ? " UNSAVED" : "";
  codeTitle.innerText = `File: ${file.fileName}${unsaved}`;
}

function canUndo() {
  const isParsing = file.readParseStatus() === ParseStatus.valid;
  return (isParsing && previousFileIndex > -1) || (!isParsing && currentFileIndex > -1);
}

function updateDisplayValues() {
  updateNameAndSavedStatus();
  parse.setAttribute("class", file.readParseStatusForDashboard());
  compile.setAttribute("class", file.readCompileStatusForDashboard());
  test.setAttribute("class", file.readTestStatusForDashboard());
  //Display run status
  runStatus.setAttribute("class", file.readRunStatusForDashboard());

  // Button control
  const isEmpty = file.readParseStatus() === ParseStatus.default;
  const isParsing = file.readParseStatus() === ParseStatus.valid;
  const isCompiling = file.readCompileStatus() === CompileStatus.ok;
  const isRunning = file.readRunStatus() === RunStatus.running;
  const isTestRunning = file.readTestStatus() === TestStatus.running;

  saveButton.hidden = !!autoSaveFileHandle;

  if (isRunning || isTestRunning) {
    disable(runButton, isRunning ? "Program is already running" : "Tests are running");
    enable(stopButton, isRunning ? "Stop the program" : "Stop the Tests");
    const msg = isRunning ? "Program is running" : "Tests are running";
    disable(loadButton, msg);
    disable(appendButton, msg);
    disable(saveButton, msg);
    disable(autoSaveButton, msg);
    disable(newButton, msg);
    disable(demosButton, msg);
    disable(trimButton, msg);
    disable(expandCollapseButton, msg);
    disable(undoButton, msg);
    disable(redoButton, msg);
    for (const elem of demoFiles) {
      elem.setAttribute("hidden", "");
    }
  } else {
    const msg = "Program is not running";
    disable(stopButton, msg);
    //disable(pauseButton, msg);

    enable(loadButton, "Load code from a file");
    enable(appendButton, "Add code from a file onto the end of the existing code");
    enable(newButton, "Clear the current code and start afresh");
    enable(demosButton, "Load a demonstration program");
    enable(trimButton, "Remove all 'newCode' selectors that can be removed (shortcut: Alt-t)");
    enable(expandCollapseButton, "Expand / Collapse all code regions");

    for (const elem of demoFiles) {
      elem.removeAttribute("hidden");
    }

    if (useChromeFileAPI()) {
      if (!isParsing) {
        disable(autoSaveButton, "Code must be parsing in order to save");
      } else {
        enable(
          autoSaveButton,
          "Save to file now and then auto-save to same file whenever code is changed and parses",
        );
      }
    }

    if (isEmpty) {
      disable(saveButton, "Some code must be added in order to save");
    } else if (!isParsing) {
      disable(saveButton, "Code must be parsing in order to save");
    } else {
      enable(saveButton, "Save the code into a file");
    }

    if (!file.containsMain()) {
      disable(runButton, "Code must have a 'main' routine to be run");
    } else if (!isCompiling) {
      disable(
        runButton,
        "Program is not yet compiled. If you have just edited a field, press Enter or Tab to complete.",
      );
    } else {
      enable(runButton, "Run the program");
    }

    if (canUndo()) {
      enable(undoButton, "Undo last change (Ctrl + z)");
    } else {
      disable(undoButton, "Nothing to undo");
    }

    if (nextFileIndex === -1) {
      disable(redoButton, "Nothing to redo");
    } else {
      enable(redoButton, "Redo last change (Ctrl + y");
    }
  }
}

function disable(button: HTMLButtonElement, msg = "") {
  button.setAttribute("disabled", "");
  button.setAttribute("title", msg);
}

function enable(button: HTMLButtonElement, msg = "") {
  button.removeAttribute("disabled");
  button.setAttribute("title", msg);
}

function getEditorMsg(
  type: "key" | "click" | "dblclick" | "paste",
  target: "frame" | "window",
  id: string | undefined,
  key: string | undefined,
  modKey: { control: boolean; shift: boolean; alt: boolean },
  selection: [number, number] | undefined,
  autocomplete: string | undefined,
): editorEvent {
  switch (type) {
    case "paste":
    case "key":
      return {
        type: type,
        target: target,
        id: id,
        key: key,
        modKey: modKey,
        selection: selection,
        autocomplete: autocomplete,
      };
    case "click":
    case "dblclick":
      return {
        type: type,
        target: target,
        id: id,
        modKey: modKey,
        selection: selection,
      };
  }
}

function handlePaste(event: Event, target: HTMLInputElement, msg: editorEvent): boolean {
  target.addEventListener("paste", async (event: ClipboardEvent) => {
    const txt = await navigator.clipboard.readText();
    const mk = { control: false, shift: false, alt: false };
    await handleEditorEvent(event, "paste", "frame", mk, msg.id, txt);
  });
  event.stopPropagation();
  return true;
}

function handleCut(event: Event, target: HTMLInputElement, msg: editorEvent) {
  // outside of handler or selection is gone
  const start = target.selectionStart ?? 0;
  const end = target.selectionEnd ?? 0;
  target.addEventListener("cut", async (event: ClipboardEvent) => {
    const txt = document.getSelection()?.toString() ?? "";
    await navigator.clipboard.writeText(txt);
    const mk = { control: false, shift: false, alt: false };
    await handleEditorEvent(event, "key", "frame", mk, msg.id, "Delete", [start, end]);
  });
  event.stopPropagation();
  return true;
}

function handleCutAndPaste(event: Event, msg: editorEvent) {
  if (event.target instanceof HTMLInputElement && msg.modKey.control) {
    switch (msg.key) {
      case "v":
        return handlePaste(event, event.target, msg);
      case "x":
        return handleCut(event, event.target, msg);
      case "c":
        return true;
    }
  }

  return false;
}

async function handleUndoAndRedo(event: Event, msg: editorEvent) {
  if (msg.modKey.control) {
    switch (msg.key) {
      case "z":
        event.stopPropagation();
        await undo();
        return true;
      case "y":
        event.stopPropagation();
        await redo();
        return true;
    }
  }

  return false;
}

function isSupportedKey(evt: editorEvent) {
  if (evt.type === "paste") {
    return true;
  }

  switch (evt.key) {
    case "Home":
    case "End":
    case "Tab":
    case "Enter":
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
    case "Backspace":
    case "Delete":
      return true;
    default:
      return !evt.key || evt.key.length === 1;
  }
}

async function handleEditorEvent(
  event: Event,
  type: "key" | "click" | "dblclick" | "paste",
  target: "frame" | "window",
  modKey: { control: boolean; shift: boolean; alt: boolean },
  id?: string | undefined,
  key?: string | undefined,
  selection?: [number, number] | undefined,
  autocomplete?: string | undefined,
) {
  const msg = getEditorMsg(type, target, id, key, modKey, selection, autocomplete);

  if (!isSupportedKey(msg)) {
    // discard
    return;
  }

  if (handleCutAndPaste(event, msg)) {
    return;
  }

  if (await handleUndoAndRedo(event, msg)) {
    return;
  }

  handleKeyAndRender(msg);
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Render the document
 */
async function updateContent(text: string) {
  file.setRunStatus(RunStatus.default);
  doOnce = doOnce === undefined || doOnce ? true : false;

  codeContainer!.innerHTML = text;

  const frames = document.querySelectorAll(".elan-code [id]");

  for (const frame of frames) {
    const id = frame.id;

    frame.addEventListener("keydown", (event: Event) => {
      const ke = event as KeyboardEvent;
      handleEditorEvent(event, "key", "frame", getModKey(ke), id, ke.key);
    });

    frame.addEventListener("click", (event) => {
      const pe = event as PointerEvent;
      const selectionStart = (event.target as HTMLInputElement).selectionStart ?? undefined;
      const selectionEnd = (event.target as HTMLInputElement).selectionEnd ?? undefined;

      const selection: [number, number] | undefined =
        selectionStart === undefined ? undefined : [selectionStart, selectionEnd ?? selectionStart];

      handleEditorEvent(event, "click", "frame", getModKey(pe), id, undefined, selection);
    });

    frame.addEventListener("mousedown", (event) => {
      // mousedown rather than click as click does not seem to pick up shift/ctrl click
      const me = event as MouseEvent;
      if (me.button === 0 && me.shiftKey) {
        // left button only
        handleEditorEvent(event, "click", "frame", getModKey(me), id);
      }
    });

    frame.addEventListener("mousemove", (event) => {
      event.preventDefault();
    });

    frame.addEventListener("dblclick", (event) => {
      const ke = event as KeyboardEvent;
      handleEditorEvent(event, "dblclick", "frame", getModKey(ke), id);
    });
  }

  const input = document.querySelector(".focused input") as HTMLInputElement;
  const focused = document.querySelector(".focused") as HTMLUnknownElement;
  const elanCode = document.querySelector(".elan-code") as HTMLDivElement;

  if (doOnce) {
    doOnce = false;

    elanCode!.addEventListener("keydown", (event: Event) => {
      const ke = event as KeyboardEvent;
      handleEditorEvent(event, "key", "window", getModKey(ke), undefined, ke.key);
    });
  }

  if (input) {
    const cursorStart = input.dataset.cursorstart as string;
    const cursorEnd = input.dataset.cursorend as string;
    const startIndex = parseInt(cursorStart) as number;
    const endIndex = parseInt(cursorEnd) as number;
    const cursorIndex1 = Number.isNaN(startIndex) ? input.value.length : startIndex;
    const cursorIndex2 = Number.isNaN(endIndex) ? input.value.length : endIndex;

    input.setSelectionRange(cursorIndex1, cursorIndex2);
    input.focus();
  } else if (focused) {
    focused.focus();
  } else {
    elanCode.focus();
  }

  if (document.querySelector(".autocomplete-popup")) {
    const items = document.querySelectorAll(".autocomplete-item");

    for (const item of items) {
      item.addEventListener("click", (event) => {
        const ke = event as PointerEvent;
        const tgt = ke.target as HTMLDivElement;
        const id = tgt.dataset.id;

        handleEditorEvent(
          event,
          "key",
          "frame",
          getModKey(ke),
          id,
          "Enter",
          undefined,
          tgt.innerText,
        );
      });
    }

    const ellipsis = document.querySelectorAll(".autocomplete-ellipsis");

    if (ellipsis.length === 1) {
      ellipsis[0].addEventListener("click", (event) => {
        const ke = event as PointerEvent;
        const tgt = ke.target as HTMLDivElement;
        const id = tgt.dataset.id;
        const selected = tgt.dataset.selected;

        handleEditorEvent(
          event,
          "key",
          "frame",
          getModKey(ke),
          id,
          "ArrowDown",
          undefined,
          selected,
        );
      });
    }
  }

  await localAndAutoSave(focused);
  updateDisplayValues();

  const dbgFocused = document.querySelectorAll(".focused");

  // debug check
  if (dbgFocused.length > 1) {
    let msg = "multiple focused ";
    dbgFocused.forEach((n) => (msg = `${msg}, Node: ${(n.nodeName, n.id)} `));
    await showError(new Error(msg), file.fileName, false);
  }
  cursorDefault();
}

async function localAndAutoSave(field: HTMLElement | undefined) {
  let code = "";
  const newFieldId = field?.id ?? currentFieldId;

  if (file.readParseStatus() === ParseStatus.valid) {
    // save to local store

    if (undoRedoHash !== file.currentHash && !undoRedoing) {
      if (previousFileIndex !== -1 && previousFileIndex !== undoRedoFiles.length - 2) {
        const trimedIds = undoRedoFiles.slice(previousFileIndex + 2);
        undoRedoFiles = undoRedoFiles.slice(0, previousFileIndex + 2);

        for (const id of trimedIds) {
          localStorage.removeItem(id);
        }
      }
      code = await file.renderAsSource();
      const timestamp = Date.now();
      const overWriteLastEntry = newFieldId === currentFieldId;
      const id = overWriteLastEntry
        ? undoRedoFiles[currentFileIndex]
        : `${file.fileName}.${timestamp}`;

      if (!overWriteLastEntry) {
        undoRedoFiles.push(id);
      }

      previousFileIndex = undoRedoFiles.length > 1 ? undoRedoFiles.length - 2 : -1;
      currentFileIndex = undoRedoFiles.length - 1;
      nextFileIndex = -1;

      localStorage.setItem(id, code);
      saveButton.classList.add("unsaved");
      undoRedoHash = file.currentHash;
      currentFieldId = field?.id ?? currentFieldId;
    }
  }

  undoRedoHash = file.currentHash;
  undoRedoing = false;

  code = code ?? (await file.renderAsSource());

  // autosave if setup
  autoSave(code);
}

function updateIndexes(indexJustUsed: number) {
  currentFileIndex = indexJustUsed;
  nextFileIndex = indexJustUsed + 1;
  nextFileIndex = nextFileIndex > undoRedoFiles.length - 1 ? -1 : nextFileIndex;
  previousFileIndex = indexJustUsed - 1;
  previousFileIndex = previousFileIndex < -1 ? -1 : previousFileIndex;
}

async function replaceCode(indexToUse: number, msg: string) {
  const id = undoRedoFiles[indexToUse];
  updateIndexes(indexToUse);
  const code = localStorage.getItem(id);
  if (code) {
    disable(undoButton, msg);
    disable(redoButton, msg);
    cursorWait();
    undoRedoing = true;
    const fn = file.fileName;
    file = new FileImpl(hash, profile, transforms());
    await displayCode(code, fn);
  }
}

async function undo() {
  if (canUndo()) {
    const isParsing = file.readParseStatus() === ParseStatus.valid;
    const indexToUse = isParsing ? previousFileIndex : currentFileIndex;
    await replaceCode(indexToUse, "Undoing...");
  }
}

async function redo() {
  if (nextFileIndex > -1) {
    await replaceCode(nextFileIndex, "Redoing...");
  }
}

async function inactivityRefresh() {
  if (
    file.readRunStatus() !== RunStatus.running &&
    file.readParseStatus() === ParseStatus.valid &&
    file.readCompileStatus() === CompileStatus.default
  ) {
    await refreshAndDisplay(true);
  }

  inactivityTimer = setTimeout(inactivityRefresh, inactivityTimeout);
}

async function handleKeyAndRender(e: editorEvent) {
  if (file.readRunStatus() === RunStatus.running) {
    // no change while running
    return;
  }

  if (e.key === "Escape") {
    demosButton.focus();
    return;
  }

  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(inactivityRefresh, inactivityTimeout);

  try {
    let isBeingEdited = false;
    switch (e.type) {
      case "click":
        isBeingEdited = file.getFieldBeingEdited(); //peek at value as may be changed
        if (handleClick(e, file) && isBeingEdited) {
          await refreshAndDisplay();
        } else {
          await renderAsHtml();
        }
        return;
      case "dblclick":
        isBeingEdited = file.getFieldBeingEdited(); //peek at value as may be changed
        if (handleDblClick(e, file) && isBeingEdited) {
          await refreshAndDisplay();
        } else {
          await renderAsHtml();
        }
        return;
      case "paste":
      case "key":
        const codeChanged = handleKey(e, file);
        if (codeChanged === true) {
          await refreshAndDisplay();
        } else if (codeChanged === false) {
          await renderAsHtml();
        }
        // undefined just return
        return;
    }
  } catch (e) {
    await showError(e as Error, file.fileName, false);
  }
}

function readMsg(value: string | [string, string]) {
  return { type: "read", value: value } as WebWorkerReadMessage;
}

function errorMsg(value: unknown) {
  return { type: "status", status: "error", error: value } as WebWorkerStatusMessage;
}

async function handleWorkerIO(data: WebWorkerWriteMessage) {
  switch (data.function) {
    case "readLine":
      const line = await elanInputOutput.readLine();
      runWorker?.postMessage(readMsg(line));
      break;
    case "waitForAnyKey":
      await elanInputOutput.waitForAnyKey();
      runWorker?.postMessage(readMsg(""));
      break;
    case "getKey":
      const key = await elanInputOutput.getKey();
      runWorker?.postMessage(readMsg(key));
      break;
    case "getKeyWithModifier":
      const keyWithMod = await elanInputOutput.getKeyWithModifier();
      runWorker?.postMessage(readMsg(keyWithMod));
      break;
    case "readFile":
      try {
        const file = await elanInputOutput.readFile();
        runWorker?.postMessage(readMsg(file));
      } catch (e) {
        runWorker?.postMessage(errorMsg(e));
      }
      break;
    case "writeFile":
      try {
        await elanInputOutput.writeFile(data.parameters[0] as string, data.parameters[1] as string);
        runWorker?.postMessage(readMsg(""));
      } catch (e) {
        runWorker?.postMessage(errorMsg(e));
      }
      break;
    default:
      (elanInputOutput as any)[data.function](...data.parameters);
  }
}

function handleRunWorkerFinished() {
  runWorker?.terminate();
  runWorker = undefined;
  console.info("elan program completed OK");
  file.setRunStatus(RunStatus.default);
  updateDisplayValues();
}

async function handleRunWorkerError(data: WebWorkerStatusMessage) {
  runWorker?.terminate();
  runWorker = undefined;
  const e = data.error;
  const err = e instanceof ElanRuntimeError ? e : new ElanRuntimeError(e as any);
  await showError(err, file.fileName, false);
  file.setRunStatus(RunStatus.error);
  updateDisplayValues();
}

function chooser(uploader: (event: Event) => void) {
  return () => {
    if (checkForUnsavedChanges()) {
      const f = document.createElement("input");
      f.style.display = "none";

      if (useChromeFileAPI()) {
        f.addEventListener("click", uploader);
      } else {
        f.type = "file";
        f.name = "file";
        f.accept = ".elan";
        f.addEventListener("change", uploader);
      }

      codeControls.appendChild(f);
      f.click();
      codeControls.removeChild(f);
    }
  };
}

function useChromeFileAPI() {
  return "showOpenFilePicker" in self;
}

function getUploader() {
  // The `showOpenFilePicker()` method of the File System Access API is supported.
  return useChromeFileAPI() ? handleChromeUpload : handleUpload;
}

function getDownloader() {
  // The `showOpenFilePicker()` method of the File System Access API is supported.
  return useChromeFileAPI() ? handleChromeDownload : handleDownload;
}

function getAppender() {
  // The `showOpenFilePicker()` method of the File System Access API is supported.
  return useChromeFileAPI() ? handleChromeAppend : handleAppend;
}

async function readAndParse(rawCode: string, fileName: string, reset: boolean, append?: boolean) {
  lastDirId;
  const code = new CodeSourceFromString(rawCode);
  file.fileName = fileName;
  try {
    await file.parseFrom(code, append);
    await initialDisplay(reset);
  } catch (e) {
    await showError(e as Error, fileName, reset);
  }
}

async function handleChromeUploadOrAppend(upload: boolean) {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      startIn: "documents",
      types: [{ accept: { "text/elan": ".elan" } }],
      id: lastDirId,
    });
    const codeFile = await fileHandle.getFile();
    const fileName = codeFile.name;
    const rawCode = await codeFile.text();
    if (upload) {
      file = new FileImpl(hash, profile, transforms());
      clearUndoRedoAndAutoSave();
    }
    await readAndParse(rawCode, fileName, upload, !upload);
  } catch (e) {
    // user cancelled
    return;
  }
}

async function handleChromeUpload() {
  await handleChromeUploadOrAppend(true);
}

async function handleChromeAppend() {
  await handleChromeUploadOrAppend(false);
}

function cursorWait() {
  document.body.style.cursor = "wait";
}

function cursorDefault() {
  document.body.style.cursor = "default";
}

function handleUploadOrAppend(event: Event, upload: boolean) {
  const elanFile = (event.target as any).files?.[0] as any;

  if (elanFile) {
    const fileName = elanFile.name;
    cursorWait();
    clearDisplays();
    const reader = new FileReader();
    reader.addEventListener("load", async (event: any) => {
      const rawCode = event.target.result;
      if (upload) {
        file = new FileImpl(hash, profile, transforms());
        clearUndoRedoAndAutoSave();
      }
      await readAndParse(rawCode, fileName, upload, !upload);
    });
    reader.readAsText(elanFile);
  }

  event.preventDefault();
}

function handleUpload(event: Event) {
  handleUploadOrAppend(event, true);
}

function handleAppend(event: Event) {
  handleUploadOrAppend(event, false);
}

function updateFileName() {
  let fileName = prompt("Please enter your file name", file.fileName);

  if (fileName === null) {
    // cancelled
    return;
  }

  if (!fileName) {
    fileName = file.defaultFileName;
  }

  if (!fileName.endsWith(".elan")) {
    fileName = fileName + ".elan";
  }

  file.fileName = fileName;
}

async function handleDownload(event: Event) {
  updateFileName();

  const code = await file.renderAsSource();

  const blob = new Blob([code], { type: "plain/text" });

  const aElement = document.createElement("a");
  aElement.setAttribute("download", file.fileName!);
  const href = URL.createObjectURL(blob);
  aElement.href = href;
  aElement.setAttribute("target", "_blank");
  aElement.click();
  URL.revokeObjectURL(href);
  saveButton.classList.remove("unsaved");
  lastSavedHash = file.currentHash;
  event.preventDefault();
  await renderAsHtml();
}

async function chromeSave(code: string) {
  const fh = await showSaveFilePicker({
    suggestedName: file.fileName,
    startIn: "documents",
    types: [{ accept: { "text/elan": ".elan" } }],
    id: lastDirId,
  });

  file.fileName = fh.name;

  const writeable = await fh.createWritable();
  await writeable.write(code);
  await writeable.close();
  return fh;
}

async function handleChromeDownload(event: Event) {
  const code = await file.renderAsSource();

  try {
    await chromeSave(code);

    saveButton.classList.remove("unsaved");
    lastSavedHash = file.currentHash;

    await renderAsHtml();
  } catch (e) {
    // user cancelled
    return;
  } finally {
    event.preventDefault();
  }
}

async function handleChromeAutoSave(event: Event) {
  if (autoSaveFileHandle) {
    autoSaveFileHandle = undefined;
    autoSaveButton.innerText = "Auto";
    updateDisplayValues();
    return;
  }

  const code = await file.renderAsSource();

  try {
    autoSaveFileHandle = await chromeSave(code);
    lastSavedHash = file.currentHash;
    await renderAsHtml();
    autoSaveButton.innerText = "Auto-off";
    autoSaveButton.setAttribute("title", "Click to turn auto-save off and resume manual saving.");
  } catch (e) {
    // user cancelled
    return;
  } finally {
    event.preventDefault();
  }
}

async function autoSave(code: string) {
  if (autoSaveFileHandle && hasUnsavedChanges()) {
    try {
      const writeable = await autoSaveFileHandle.createWritable();
      await writeable.write(code);
      await writeable.close();
      lastSavedHash = file.currentHash;
      updateNameAndSavedStatus();
    } catch (e) {
      console.warn("autosave failed");
    }
  }
}

function endTests() {
  cancelTestTimeout();
  testWorker?.terminate();
  testWorker = undefined;
}

async function handleTestWorkerFinished(data: WebWorkerTestMessage) {
  endTests();
  file.refreshTestStatuses(data.value);
  console.info("elan tests completed");

  const testErr = file.getTestError();
  if (testErr) {
    const err = testErr instanceof ElanRuntimeError ? testErr : new ElanRuntimeError(testErr);
    await showError(err, file.fileName, false);
  }

  await renderAsHtml();
  updateDisplayValues();
}

async function handleTestWorkerError(data: WebWorkerStatusMessage) {
  endTests();
  const e = data.error;
  const err = e instanceof ElanRuntimeError ? e : new ElanRuntimeError(e as any);
  await showError(err, file.fileName, false);
  file.setTestStatus(TestStatus.error);
  updateDisplayValues();
}

function handleTestAbort() {
  endTests();
  file.setTestStatus(TestStatus.error);
  elanInputOutput.printLine("Tests timed out and were aborted");
  updateDisplayValues();
}

let testTimer: any = undefined;

function cancelTestTimeout() {
  clearInterval(testTimer);
  testTimer = undefined;
}

function runTests() {
  // if already running cancel and restart
  endTests();
  runTestsInner();

  let timeoutCount = 0;
  const testTimeout = 2; // seconds

  testTimer = setInterval(async () => {
    timeoutCount++;

    if (!testWorker) {
      cancelTestTimeout();
    }

    if (timeoutCount === testTimeout && testWorker) {
      cancelTestTimeout();
      handleTestAbort();
    }
  }, 1000);
}

function runTestsInner() {
  try {
    clearDisplays();
    file.setTestStatus(TestStatus.running);
    updateDisplayValues();
    const path = `${document.location.origin}${document.location.pathname}`.replace(
      "/index.html",
      "",
    );
    const jsCode = file.compileAsTestWorker(path);
    const asUrl = "data:text/javascript;base64," + btoa(jsCode);

    testWorker = new Worker(asUrl, { type: "module" });

    testWorker.onmessage = async (e: MessageEvent<WebWorkerMessage>) => {
      const data = e.data;

      switch (data.type) {
        case "status":
          switch (data.status) {
            case "finished":
              await handleTestWorkerError(data);
              break;
          }
          break;
        case "test":
          await handleTestWorkerFinished(data);
      }
    };

    testWorker.onerror = async (ev: ErrorEvent) => {
      endTests();
      const err = new ElanRuntimeError(ev.message);
      await showError(err, file.fileName, false);
      file.setTestStatus(TestStatus.error);
      updateDisplayValues();
    };

    testWorker.postMessage({ type: "start" } as WebWorkerMessage);
  } catch (e) {
    endTests();
    console.warn(e);
    file.setTestStatus(TestStatus.error);
    updateDisplayValues();
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleClick, handleDblClick, handleKey } from "../editorHandlers";
import { ElanCutCopyPasteError } from "../elan-cut-copy-paste-error";
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
  WebWorkerBreakpointMessage,
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
const _debugButton = document.getElementById("debug") as HTMLButtonElement;
const _pauseButton = document.getElementById("pause") as HTMLButtonElement;
const _stepButton = document.getElementById("step") as HTMLButtonElement;
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
const parseStatus = document.getElementById("parse") as HTMLDivElement;
const compileStatus = document.getElementById("compile") as HTMLDivElement;
const testStatus = document.getElementById("test") as HTMLDivElement;
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
  await renderAsHtml(false);
});

runButton?.addEventListener("click", () => {
  try {
    if (file.readRunStatus() === RunStatus.paused && runWorker) {
      runWorker.postMessage({ type: "resume" } as WebWorkerMessage);

      const pausedAt = document.getElementsByClassName("paused-at");

      for (const e of pausedAt) {
        e.classList.remove("paused-at");
      }

      file.setRunStatus(RunStatus.running);
      updateDisplayValues();
      return;
    }

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
        case "breakpoint":
          await handleRunWorkerPaused(data);
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
    handleRunWorkerFinished();
  }
  if (testWorker) {
    endTests();
    file.setTestStatus(TestStatus.default);
    updateDisplayValues();
  }
});

clearConsoleButton?.addEventListener("click", () => {
  elanInputOutput.clearConsole();
});

clearGraphicsButton?.addEventListener("click", () => {
  elanInputOutput.clearGraphics();
});

expandCollapseButton?.addEventListener("click", async () => {
  file.expandCollapseAll();
  await renderAsHtml(false);
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

function warningOrError(tgt: HTMLDivElement): [boolean, string] {
  if (tgt.classList.contains("warning")) {
    return [true, "warning"];
  }
  if (tgt.classList.contains("error")) {
    return [true, "error"];
  }
  return [false, ""];
}

function parentId(e: Element): string {
  if (e.parentElement) {
    if (e.parentElement.id) {
      return e.parentElement.id;
    }
    return parentId(e.parentElement);
  }

  return "";
}

async function handleStatusClick(event: Event, tag: string, useParent: boolean) {
  const pe = event as PointerEvent;
  const [goto, cls] = warningOrError(pe.target as HTMLDivElement);
  if (goto) {
    const elements = document.getElementsByTagName(tag);
    for (const element of elements) {
      // if we're using the parent id we expect text in el-msg
      if (element.classList.contains(cls) && (!useParent || element.textContent)) {
        const mk = { control: false, shift: false, alt: false };
        const id = useParent ? parentId(element) : element.id;
        await handleEditorEvent(event, "click", "frame", mk, id);
        return;
      }
    }
  }
  event.preventDefault();
  event.stopPropagation();
}

parseStatus.addEventListener("click", async (event) => {
  await handleStatusClick(event, "el-field", false);
});

compileStatus.addEventListener("click", async (event) => {
  await handleStatusClick(event, "el-msg", true);
});

testStatus.addEventListener("click", async (event) => {
  await handleStatusClick(event, "el-msg", true);
});

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
  const _isFirefox = winNav.userAgent.indexOf("Firefox") > -1;
  const isIEedge = winNav.userAgent.indexOf("Edg") > -1;
  const isIOSChrome = winNav.userAgent.match("CriOS");
  const isGoogleChrome =
    typeof (winNav as any).userAgentData !== "undefined"
      ? (winNav as any).userAgentData.brands.some((b: any) => b.brand === "Google Chrome")
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
    .catch(async (_e) => {
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

async function renderAsHtml(editingField: boolean) {
  const content = await file.renderAsHtml();
  try {
    await updateContent(content, editingField);
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
  currentFieldId = "";
  undoRedoHash = "";
}

async function resetFile() {
  file = new FileImpl(hash, profile, transforms());
  await renderAsHtml(false);
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

async function refreshAndDisplay(compileIfParsed: boolean, editingField: boolean) {
  file.refreshParseAndCompileStatuses(compileIfParsed);
  if (file.readCompileStatus() === CompileStatus.ok && file.hasTests) {
    runTests();
  }
  try {
    await renderAsHtml(editingField);
  } catch (e) {
    await showError(e as Error, file.fileName, false);
  }
}

async function initialDisplay(reset: boolean) {
  clearDisplays();

  const ps = file.readParseStatus();
  if (ps === ParseStatus.valid || ps === ParseStatus.default) {
    await refreshAndDisplay(false, false);
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
    await refreshAndDisplay(true, false);
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

function setStatus(html: HTMLDivElement, status: string, showTooltip = true): void {
  html.setAttribute("class", status);
  const tooltip =
    showTooltip && (status === "error" || status === "warning")
      ? "Click to navigate to first issue in (expanded) code"
      : "";
  html.setAttribute("title", tooltip);
  html.innerText = status === "default" ? "" : status;
}

function updateDisplayValues() {
  updateNameAndSavedStatus();
  setStatus(parseStatus, file.readParseStatusForDashboard());
  setStatus(compileStatus, file.readCompileStatusForDashboard());
  setStatus(testStatus, file.readTestStatusForDashboard());
  setStatus(runStatus, file.readRunStatusForDashboard(), false);
  // Button control
  const isEmpty = file.readParseStatus() === ParseStatus.default;
  const isParsing = file.readParseStatus() === ParseStatus.valid;
  const isCompiling = file.readCompileStatus() === CompileStatus.ok;
  const isRunning =
    file.readRunStatus() === RunStatus.running || file.readRunStatus() === RunStatus.paused;
  const isPaused = file.readRunStatus() === RunStatus.paused;
  const isTestRunning = file.readTestStatus() === TestStatus.running;

  saveButton.hidden = !!autoSaveFileHandle;

  if (isRunning || isTestRunning) {
    codeContainer?.classList.add("running");

    if (isPaused) {
      enable(runButton, "Resume the program");
    } else {
      disable(runButton, isRunning ? "Program is already running" : "Tests are running");
    }
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
    codeContainer?.classList.remove("running");
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

    if (autoSaveFileHandle) {
      autoSaveButton.innerText = "Cancel Auto Save";
      autoSaveButton.setAttribute("title", "Click to turn auto-save off and resume manual saving.");
    } else {
      if (useChromeFileAPI()) {
        autoSaveButton.innerText = "Auto Save";
        if (isParsing) {
          enable(
            autoSaveButton,
            "Save to file now and then auto-save to same file whenever code is changed and parses",
          );
        } else {
          disable(autoSaveButton, "Code must be parsing in order to save");
        }
      }
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
  type: "key" | "click" | "dblclick" | "paste" | "contextmenu",
  target: "frame",
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
    case "contextmenu":
      return {
        type: type,
        target: target,
        key: "ContextMenu",
        id: id,
        modKey: modKey,
        selection: selection,
        autocomplete: autocomplete,
      };
  }
}

function handlePaste(event: Event, target: HTMLInputElement, msg: editorEvent): boolean {
  // outside of handler or selection is gone
  const start = target.selectionStart ?? 0;
  const end = target.selectionEnd ?? 0;
  target.addEventListener("paste", async (event: ClipboardEvent) => {
    const mk = { control: false, shift: false, alt: false };
    const txt = await navigator.clipboard.readText();
    if (start !== end) {
      await handleEditorEvent(event, "key", "frame", mk, msg.id, "Delete", [start, end]);
    }
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
    case "ContextMenu":
      return true;
    default:
      return !evt.key || evt.key.length === 1;
  }
}

async function handleEditorEvent(
  event: Event,
  type: "key" | "click" | "dblclick" | "paste" | "contextmenu",
  target: "frame",
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

  if (key === "Delete" && !selection && event.target instanceof HTMLInputElement) {
    const start = event.target.selectionStart ?? 0;
    const end = event.target.selectionEnd ?? 0;
    msg.selection = [start, end];
  }

  handleKeyAndRender(msg);
  event.preventDefault();
  event.stopPropagation();
}

function getFocused() {
  return document.querySelector(".focused") as HTMLUnknownElement | undefined;
}

/**
 * Render the document
 */
async function updateContent(text: string, editingField: boolean) {
  file.setRunStatus(RunStatus.default);

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

    frame.addEventListener("contextmenu", (event) => {
      const mk = { control: false, shift: false, alt: false };
      handleEditorEvent(event, "contextmenu", "frame", mk, id);
      event.preventDefault();
    });
  }

  const input = document.querySelector(".focused input") as HTMLInputElement;
  const focused = getFocused();
  const elanCode = document.querySelector(".elan-code") as HTMLDivElement;

  elanCode?.addEventListener("click", () => {
    const focused = getFocused();
    if (focused) {
      focused.focus();
    } else {
      file.getFirstChild().select();
      getFocused()?.focus();
    }
  });

  if (document.querySelector(".context-menu")) {
    const items = document.querySelectorAll(".context-menu-item");

    for (const item of items) {
      item.addEventListener("click", (event) => {
        const ke = event as PointerEvent;
        const tgt = ke.target as HTMLDivElement;
        const id = tgt.dataset.id;
        const func = tgt.dataset.func;
        const href = tgt.dataset.href;

        if (href) {
          window.open(`documentation/${href}`, "_blank")?.focus();
        } else {
          handleEditorEvent(
            event,
            "contextmenu",
            "frame",
            getModKey(ke),
            id,
            "ContextMenu",
            undefined,
            func,
          );
        }
      });
    }
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

  await localAndAutoSave(focused, editingField);
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

async function localAndAutoSave(field: HTMLElement | undefined, editingField: boolean) {
  let code = "";
  const newFieldId = editingField ? field?.id : undefined;

  if (file.readParseStatus() === ParseStatus.valid) {
    // save to local store

    if (undoRedoHash !== file.currentHash && !undoRedoing) {
      if (nextFileIndex !== -1 && nextFileIndex > currentFileIndex) {
        const trimedIds = undoRedoFiles.slice(nextFileIndex);
        undoRedoFiles = undoRedoFiles.slice(0, nextFileIndex);

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
      currentFieldId = newFieldId ?? "";
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
    await refreshAndDisplay(true, false);
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
          await refreshAndDisplay(false, false);
        } else {
          await renderAsHtml(false);
        }
        return;
      case "dblclick":
        isBeingEdited = file.getFieldBeingEdited(); //peek at value as may be changed
        if (handleDblClick(e, file) && isBeingEdited) {
          await refreshAndDisplay(false, false);
        } else {
          await renderAsHtml(false);
        }
        return;
      case "paste":
      case "key":
        const codeChanged = handleKey(e, file);
        if (codeChanged === true) {
          const singleKeyEdit = !(e.modKey.control || e.modKey.shift || e.modKey.alt);
          await refreshAndDisplay(false, singleKeyEdit);
        } else if (codeChanged === false) {
          await renderAsHtml(false);
        }
        // undefined just return
        return;
      case "contextmenu":
        handleKey(e, file);
        await renderAsHtml(false);
        return;
    }
  } catch (e) {
    if (e instanceof ElanCutCopyPasteError) {
      elanInputOutput.printLine(e.message);
      await renderAsHtml(false);
      return;
    }

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

function clearPaused() {
  const pausedAt = document.getElementsByClassName("paused-at");

  for (const e of pausedAt) {
    e.classList.remove("paused-at");
  }
}

function handleRunWorkerFinished() {
  runWorker?.terminate();
  runWorker = undefined;
  console.info("elan program completed OK");
  file.setRunStatus(RunStatus.default);
  clearPaused();
  updateDisplayValues();
}

async function handleRunWorkerPaused(data: WebWorkerBreakpointMessage): Promise<void> {
  console.info("elan program paused");
  file.setRunStatus(RunStatus.paused);
  const variables = data.value;
  elanInputOutput.clearConsole();

  for (const v of variables) {
    elanInputOutput.printLine(`${v[0]} : ${v[1]}`);
  }

  const pausedAt = document.getElementById(data.pausedAt);
  pausedAt?.classList.add("paused-at");

  updateDisplayValues();
}

async function handleRunWorkerError(data: WebWorkerStatusMessage) {
  runWorker?.terminate();
  runWorker = undefined;
  const e = data.error;
  const err = e instanceof ElanRuntimeError ? e : new ElanRuntimeError(e as any);
  await showError(err, file.fileName, false);
  file.setRunStatus(RunStatus.error);
  clearPaused();
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
    const fileName = upload ? codeFile.name : file.fileName;
    const rawCode = await codeFile.text();
    if (upload) {
      file = new FileImpl(hash, profile, transforms());
      clearUndoRedoAndAutoSave();
    }
    await readAndParse(rawCode, fileName, upload, !upload);
  } catch (_e) {
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
    const fileName = upload ? elanFile.name : file.fileName;
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
  await renderAsHtml(false);
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

    await renderAsHtml(false);
  } catch (_e) {
    // user cancelled
    return;
  } finally {
    event.preventDefault();
  }
}

async function handleChromeAutoSave(event: Event) {
  if (autoSaveFileHandle) {
    autoSaveFileHandle = undefined;
    updateDisplayValues();
    return;
  }

  const code = await file.renderAsSource();

  try {
    autoSaveFileHandle = await chromeSave(code);
    lastSavedHash = file.currentHash;
    await renderAsHtml(false);
  } catch (_e) {
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
    } catch (_e) {
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

  await renderAsHtml(false);
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleClick, handleDblClick, handleKey } from "../editorHandlers";
import { ElanRuntimeError } from "../elan-runtime-error";
import { DefaultProfile } from "../frames/default-profile";
import { CodeSourceFromString, FileImpl, cannotLoadFile } from "../frames/file-impl";
import { editorEvent } from "../frames/interfaces/editor-event";
import { File } from "../frames/interfaces/file";
import { Profile } from "../frames/interfaces/profile";
import { CompileStatus, ParseStatus, RunStatus } from "../frames/status-enums";
import { getTestRunner } from "../runner";
import { StdLib } from "../standard-library/std-lib";
import { fetchProfile, hash, transforms } from "./web-helpers";
import { WebInputOutput } from "./web-input-output";
import {
  WebWorkerMessage,
  WebWorkerReadMessage,
  WebWorkerStatusMessage,
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
const lastCodeId = "last-code-id";
const lastFileName = "last-file-name";
const lastSavedStatus = "last-saved-status";

const elanInputOutput = new WebInputOutput(consoleDiv, graphicsDiv);
let undoRedoFiles: string[] = [];
let previousFileIndex: number = -1;
let currentFileIndex: number = -1;
let nextFileIndex: number = -1;
let undoRedoing: boolean = false;
let refreshing: boolean = false;

let file: File;
let doOnce = true;
let profile: Profile;
let lastSavedHash = "";
let undoRedoHash = "";
let programWorker: Worker;
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

runButton?.addEventListener("click", async () => {
  try {
    clearDisplays();
    file.setRunStatus(RunStatus.running);
    await updateDisplayValues();
    const path = `${document.location.origin}${document.location.pathname}`.replace(
      "/index.html",
      "",
    );
    const jsCode = file.compileAsWorker(path);
    const asUrl = "data:text/javascript;base64," + btoa(jsCode);

    programWorker = new Worker(asUrl, { type: "module" });

    programWorker.onmessage = async (e: MessageEvent<WebWorkerMessage>) => {
      const data = e.data;

      switch (data.type) {
        case "write":
          await handleWorkerIO(data);
          break;
        case "status":
          switch (data.status) {
            case "finished":
              await handleWorkerFinished();
              break;
            case "error":
              await handleWorkerError(data);
              break;
          }
      }
    };

    programWorker.onerror = async (ev: ErrorEvent) => {
      const err = new ElanRuntimeError(ev.message);
      await showError(err, file.fileName, false);
      file.setRunStatus(RunStatus.error);
      await updateDisplayValues();
    };

    programWorker.postMessage({ type: "start" } as WebWorkerMessage);
  } catch (e) {
    console.warn(e);
    file.setRunStatus(RunStatus.error);
    await updateDisplayValues();
  }
});

stopButton?.addEventListener("click", async () => {
  programWorker?.terminate();
  file.setRunStatus(RunStatus.default);
  await updateDisplayValues();
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

// fetch profile triggers page display
fetchProfile()
  .then(async (p) => await setup(p))
  .catch(async (e) => {
    console.warn("profile not found - using default");
    await setup(new DefaultProfile());
  });

function checkForUnsavedChanges(): boolean {
  return hasUnsavedChanges()
    ? confirm("You have unsaved changes - they will be lost unless you cancel")
    : true;
}

async function setup(p: Profile) {
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
      msg = "A Runtime error occured in the Elan code";
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
  const testRunner = await getTestRunner(system, stdlib);
  await file.refreshAllStatuses(testRunner, compileIfParsed);
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
    if (!refreshing) {
      lastSavedHash = file.currentHash;
    }
    refreshing = false;
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
    await initialDisplay(true);
  } catch (e) {
    await showError(e as Error, fileName || file.defaultFileName, true);
  }
}

async function displayFile() {
  const [previousCode, previousFileName] = getLastLocalSave();
  if (previousCode) {
    refreshing = true;
    await displayCode(previousCode, previousFileName);
  } else {
    await initialDisplay(true);
  }
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

async function updateDisplayValues() {
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

  saveButton.hidden = !!autoSaveFileHandle;

  if (isRunning) {
    disable(runButton, "Program is already running");
    enable(stopButton, "Stop the program");
    const msg = "Program is running";
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
    enable(trimButton, "Remove all 'newCode' selectors that can be removed");
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
      enable(undoButton, "Undo last change");
    } else {
      disable(undoButton, "Nothing to undo");
    }

    if (nextFileIndex === -1) {
      disable(redoButton, "Nothing to redo");
    } else {
      enable(redoButton, "Redo last change");
    }
  }

  const testErr = file.getTestError();
  if (testErr) {
    const err = testErr instanceof ElanRuntimeError ? testErr : new ElanRuntimeError(testErr);
    await showError(err, file.fileName, false);
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
  type: "key" | "click" | "dblclick",
  target: "frame" | "window",
  id: string | undefined,
  key: string | undefined,
  modKey: { control: boolean; shift: boolean; alt: boolean },
  selection: [number, number] | undefined,
  autocomplete: string | undefined,
): editorEvent {
  switch (type) {
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
    await handleEditorEvent(event, "key", "frame", mk, msg.id, txt);
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

function isSupportedKey(key: string | undefined) {
  switch (key) {
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
      return !key || key.length === 1;
  }
}

async function handleEditorEvent(
  event: Event,
  type: "key" | "click" | "dblclick",
  target: "frame" | "window",
  modKey: { control: boolean; shift: boolean; alt: boolean },
  id?: string | undefined,
  key?: string | undefined,
  selection?: [number, number] | undefined,
  autocomplete?: string | undefined,
) {
  if (!isSupportedKey(key)) {
    // discard
    return;
  }

  const msg = getEditorMsg(type, target, id, key, modKey, selection, autocomplete);

  if (handleCutAndPaste(event, msg)) {
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
  }

  await localAndAutoSave();
  await updateDisplayValues();

  const dbgFocused = document.querySelectorAll(".focused");

  // debug check
  if (dbgFocused.length > 1) {
    let msg = "multiple focused ";
    dbgFocused.forEach((n) => (msg = `${msg}, Node: ${(n.nodeName, n.id)} `));
    await showError(new Error(msg), file.fileName, false);
  }
  cursorDefault();
}

async function localAndAutoSave() {
  let code = "";

  if (file.readParseStatus() === ParseStatus.valid) {
    // save to local store

    if (undoRedoHash !== file.currentHash && !undoRedoing) {
      code = await file.renderAsSource();
      const timestamp = Date.now();
      const id = `${file.fileName}.${timestamp}`;

      if (previousFileIndex !== -1 && previousFileIndex !== undoRedoFiles.length - 2) {
        const trimedIds = undoRedoFiles.slice(previousFileIndex + 2);
        undoRedoFiles = undoRedoFiles.slice(0, previousFileIndex + 2);

        for (const id of trimedIds) {
          localStorage.removeItem(id);
        }
      }

      undoRedoFiles.push(id);
      previousFileIndex = undoRedoFiles.length > 1 ? undoRedoFiles.length - 2 : -1;
      currentFileIndex = undoRedoFiles.length - 1;
      nextFileIndex = -1;

      localStorage.setItem(lastCodeId, id);
      localStorage.setItem(id, code);
      localStorage.setItem(lastFileName, file.fileName);
      saveButton.classList.add("unsaved");
      undoRedoHash = file.currentHash;
    }
  }

  undoRedoHash = file.currentHash;
  undoRedoing = false;

  code = code ?? (await file.renderAsSource());

  // autosave if setup
  autoSave(code);
}

function getLastLocalSave(): [string, string] {
  const id = localStorage.getItem(lastCodeId) ?? "";
  const previousCode = localStorage.getItem(id);
  const previousFileName = localStorage.getItem(lastFileName) ?? "";
  lastSavedHash = localStorage.getItem(lastSavedStatus) ?? "";

  return [previousCode ?? "", previousFileName];
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
      programWorker.postMessage(readMsg(line));
      break;
    case "waitForAnyKey":
      await elanInputOutput.waitForAnyKey();
      programWorker.postMessage(readMsg(""));
      break;
    case "getKey":
      const key = await elanInputOutput.getKey();
      programWorker.postMessage(readMsg(key));
      break;
    case "getKeyWithModifier":
      const keyWithMod = await elanInputOutput.getKeyWithModifier();
      programWorker.postMessage(readMsg(keyWithMod));
      break;
    case "readFile":
      try {
        const file = await elanInputOutput.readFile();
        programWorker.postMessage(readMsg(file));
      } catch (e) {
        programWorker.postMessage(errorMsg(e));
      }
      break;
    case "writeFile":
      try {
        await elanInputOutput.writeFile(data.parameters[0] as string, data.parameters[1] as string);
        programWorker.postMessage(readMsg(""));
      } catch (e) {
        programWorker.postMessage(errorMsg(e));
      }
      break;
    default:
      (elanInputOutput as any)[data.function](...data.parameters);
  }
}

async function handleWorkerFinished() {
  programWorker.terminate();
  console.info("elan program completed OK");
  file.setRunStatus(RunStatus.default);
  await updateDisplayValues();
}

async function handleWorkerError(data: WebWorkerStatusMessage) {
  programWorker.terminate();
  const e = data.error;
  const err = e instanceof ElanRuntimeError ? e : new ElanRuntimeError(e as any);
  await showError(err, file.fileName, false);
  file.setRunStatus(RunStatus.error);
  await updateDisplayValues();
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
  localStorage.setItem(lastFileName, file.fileName);
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
  localStorage.setItem(lastSavedStatus, lastSavedHash);
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
  localStorage.setItem(lastFileName, file.fileName);

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
    localStorage.setItem(lastSavedStatus, lastSavedHash);

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
    await updateDisplayValues();
    return;
  }

  const code = await file.renderAsSource();

  try {
    autoSaveFileHandle = await chromeSave(code);
    lastSavedHash = file.currentHash;
    localStorage.setItem(lastSavedStatus, lastSavedHash);
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
      localStorage.setItem(lastSavedStatus, lastSavedHash);
      updateNameAndSavedStatus();
    } catch (e) {
      console.warn("autosave failed");
    }
  }
}

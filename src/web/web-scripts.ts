/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleClick, handleDblClick, handleKey } from "../editorHandlers";
import { ElanCutCopyPasteError } from "../elan-cut-copy-paste-error";
import { ElanRuntimeError } from "../elan-runtime-error";
import { CodeSourceFromString, fileErrorPrefix, FileImpl } from "../frames/file-impl";
import { editorEvent, toDebugString } from "../frames/interfaces/editor-event";
import { File } from "../frames/interfaces/file";
import { Profile } from "../frames/interfaces/profile";
import { Group, Individual } from "../frames/interfaces/user-config";
import { CompileStatus, ParseStatus, RunStatus, TestStatus } from "../frames/status-enums";
import { isElanProduction } from "../production";
import { StdLib } from "../standard-library/std-lib";
import { checkIsChrome, confirmContinueOnNonChromeBrowser } from "./ui-helpers";
import {
  fetchDefaultProfile,
  fetchProfile,
  fetchUserConfig,
  hash,
  transforms,
} from "./web-helpers";
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
const codeContainer = document.querySelector(".elan-code") as HTMLDivElement;
const runButton = document.getElementById("run-button") as HTMLButtonElement;
const runDebugButton = document.getElementById("run-debug-button") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const pauseButton = document.getElementById("pause") as HTMLButtonElement;
const stepButton = document.getElementById("step") as HTMLButtonElement;
const clearSystemInfoButton = document.getElementById("clear-system-info") as HTMLButtonElement;
const clearGraphicsButton = document.getElementById("clear-display") as HTMLButtonElement;
const expandCollapseButton = document.getElementById("expand-collapse") as HTMLButtonElement;
const newButton = document.getElementById("new") as HTMLButtonElement;
const demosButton = document.getElementById("demos") as HTMLButtonElement;
const trimButton = document.getElementById("trim") as HTMLButtonElement;
const systemInfoDiv = document.getElementById("system-info") as HTMLDivElement;
const displayDiv = document.getElementById("display") as HTMLDivElement;
const loadButton = document.getElementById("load") as HTMLButtonElement;
const appendButton = document.getElementById("append") as HTMLButtonElement;
const saveButton = document.getElementById("save") as HTMLButtonElement;
const autoSaveButton = document.getElementById("auto-save") as HTMLButtonElement;
const undoButton = document.getElementById("undo") as HTMLButtonElement;
const redoButton = document.getElementById("redo") as HTMLButtonElement;
const fileButton = document.getElementById("file") as HTMLButtonElement;
const logoutButton = document.getElementById("logout") as HTMLButtonElement;
const saveAsStandaloneButton = document.getElementById("save-as-standalone") as HTMLButtonElement;

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

const elanInputOutput = new WebInputOutput();
let undoRedoFiles: string[] = [];
let previousFileIndex: number = -1;
let currentFileIndex: number = -1;
let nextFileIndex: number = -1;
let undoRedoing: boolean = false;
let currentFieldId: string = "";

let file: File;
let profile: Profile;
let userName: string | undefined;
let lastSavedHash = "";
let undoRedoHash = "";
let runWorker: Worker | undefined;
let testWorker: Worker | undefined;
let inactivityTimer: any | undefined = undefined;
let autoSaveFileHandle: FileSystemFileHandle | undefined = undefined;
let singleStepping = false;
let processingSingleStep = false;
let debugMode = false;
let lastDOMEvent: Event | undefined;
let lastEditorEvent: editorEvent | undefined;
let errorDOMEvent: Event | undefined;
let errorEditorEvent: editorEvent | undefined;
let errorStack: string | undefined;

autoSaveButton.hidden = !useChromeFileAPI();

// add all the listeners

undoButton.addEventListener("click", undo);

redoButton.addEventListener("click", redo);

displayDiv.addEventListener("click", () => {
  displayDiv.getElementsByTagName("input")?.[0]?.focus();
});

trimButton.addEventListener("click", async () => {
  file.removeAllSelectorsThatCanBe();
  await renderAsHtml(false);
});

logoutButton.addEventListener("click", async () => {
  window.location.reload();
});

addEventListener("beforeunload", (event) => {
  if (hasUnsavedChanges()) {
    event.preventDefault();
  }
});

function resumeProgram() {
  pendingBreakpoints = [];
  if (singleStepping) {
    runWorker!.postMessage({ type: "pause" } as WebWorkerMessage);
  }

  runWorker!.postMessage({ type: "resume" } as WebWorkerMessage);

  clearPaused();
  file.setRunStatus(RunStatus.running);
  updateDisplayValues();
}

function runProgram() {
  try {
    if (file.readRunStatus() === RunStatus.paused && runWorker && debugMode) {
      resumeProgram();
      return;
    }

    clearDisplays();
    file.setRunStatus(RunStatus.running);
    updateDisplayValues();
    const path = `${document.location.origin}${document.location.pathname}`.replace(
      "/index.html",
      "",
    );
    const jsCode = file.compileAsWorker(path, debugMode, false);
    const asUrl = "data:text/javascript;base64," + btoa(jsCode);

    runWorker = new Worker(asUrl, { type: "module" });

    runWorker.onmessage = async (e: MessageEvent<WebWorkerMessage>) => {
      const data = e.data;

      switch (data.type) {
        case "write":
          await handleWorkerIO(data);
          break;
        case "breakpoint":
          if (isPausedState()) {
            pendingBreakpoints.push(data);
          } else {
            pendingBreakpoints = [];
            await handleRunWorkerPaused(data);
          }
          break;
        case "singlestep":
          if (processingSingleStep) {
            pendingBreakpoints.push(data);
          } else {
            processingSingleStep = true;
            pendingBreakpoints = [];
            await handleRunWorkerSingleStep(data);
          }
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
}

runButton?.addEventListener("click", () => {
  debugMode = singleStepping = processingSingleStep = false;
  runProgram();
});

runDebugButton?.addEventListener("click", () => {
  debugMode = true;
  singleStepping = processingSingleStep = false;
  runProgram();
});

stepButton?.addEventListener("click", async () => {
  singleStepping = true;

  if (pendingBreakpoints.length > 0) {
    const next = pendingBreakpoints[0];
    pendingBreakpoints = pendingBreakpoints.slice(1);
    await handleRunWorkerPaused(next);
    return;
  }

  processingSingleStep = false;
  if (file.readRunStatus() === RunStatus.paused && runWorker) {
    resumeProgram();
    return;
  }
});

pauseButton?.addEventListener("click", () => {
  singleStepping = true;
  runWorker!.postMessage({ type: "pause" } as WebWorkerMessage);
});

stopButton?.addEventListener("click", () => {
  debugMode = singleStepping = false;
  if (runWorker) {
    handleRunWorkerFinished();
  }
  if (testWorker) {
    endTests();
    file.setTestStatus(TestStatus.default);
    updateDisplayValues();
  }
});

clearSystemInfoButton?.addEventListener("click", () => {
  systemInfoDiv.innerHTML = "";
});

clearGraphicsButton?.addEventListener("click", () => {
  elanInputOutput.clearAllGraphics();
});

expandCollapseButton?.addEventListener("click", async () => {
  file.expandCollapseAll();
  await renderAsHtml(false);
});

newButton?.addEventListener("click", async () => {
  if (checkForUnsavedChanges()) {
    clearDisplays();
    clearUndoRedoAndAutoSave();
    file = new FileImpl(hash, profile, userName, transforms());
    await initialDisplay(false);
  }
});

loadButton.addEventListener("click", chooser(getUploader()));

appendButton.addEventListener("click", chooser(getAppender()));

saveButton.addEventListener("click", getDownloader());

autoSaveButton.addEventListener("click", handleChromeAutoSave);

saveAsStandaloneButton.addEventListener("click", async () => {
  let jsCode = file.compileAsWorker("", false, true);

  const api = await (await fetch("elan-api.js", { mode: "same-origin" })).text();
  let script = await (await fetch("standalone.js", { mode: "same-origin" })).text();
  let html = await (await fetch("standalone.html", { mode: "same-origin" })).text();
  const cssColour = await (await fetch("colourScheme.css", { mode: "same-origin" })).text();
  const cssStyle = await (await fetch("elanStyle.css", { mode: "same-origin" })).text();
  const cssIde = await (await fetch("ide.css", { mode: "same-origin" })).text();

  jsCode = api + jsCode;

  const asUrl = "data:text/javascript;base64," + btoa(jsCode);

  script = script.replace("injected_code", asUrl);
  html = html.replace("injected_code", script);
  html = html.replace("injected_colour_css", cssColour);
  html = html.replace("injected_style_css", cssStyle);
  html = html.replace("injected_ide_css", cssIde);

  await chromeSave(html, "standalone.html");
});

for (const elem of demoFiles) {
  elem.addEventListener("click", async () => {
    if (checkForUnsavedChanges()) {
      const fileName = `${elem.id}`;
      const f = await fetch(fileName, { mode: "same-origin" });
      const rawCode = await f.text();
      file = new FileImpl(hash, profile, userName, transforms());
      file.fileName = fileName;
      clearUndoRedoAndAutoSave();
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

function changeCss(stylesheet: string) {
  const links = document.getElementsByTagName("link");
  for (const link of links) {
    if (link.rel === "stylesheet" && link.href.includes("colourScheme")) {
      const tokens = link.href.split("/");
      tokens[tokens.length - 1] = `${stylesheet}.css`;
      const newHref = tokens.join("/");
      link.href = newHref;
    }
  }
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

const isChrome = checkIsChrome();
const okToContinue = isChrome || confirmContinueOnNonChromeBrowser();

if (okToContinue) {
  // fetch userConfig triggers page display
  fetchUserConfig().then(async (userConfig) => {
    const defaultProfile = await fetchDefaultProfile();
    let profile = defaultProfile;

    if (defaultProfile.require_log_on) {
      while (!userName) {
        userName = prompt("You must login with a valid user id")?.trim();
      }

      const ucUserName = userName.toUpperCase();

      let userOrGroup: Individual | Group | undefined = userConfig.students.find(
        (u) => u.userName.toUpperCase() === ucUserName,
      );
      if (!userOrGroup) {
        userOrGroup = userConfig.groups.find((g) =>
          g.members.map((m) => m.toUpperCase()).includes(ucUserName),
        );
      } else {
        const colourScheme = userOrGroup?.colourScheme;
        if (colourScheme) {
          changeCss(colourScheme);
        }
      }

      const profileName = userOrGroup?.profileName;

      profile = profileName ? await fetchProfile(profileName) : defaultProfile;
    }

    await setup(profile);
  });
} else {
  const msg = "Require Chrome";
  disable(
    [
      runButton,
      runDebugButton,
      stopButton,
      pauseButton,
      stepButton,
      loadButton,
      appendButton,
      saveButton,
      autoSaveButton,
      newButton,
      demosButton,
      trimButton,
      expandCollapseButton,
      undoButton,
      redoButton,
      clearSystemInfoButton,
      clearGraphicsButton,
      saveAsStandaloneButton,
    ],
    msg,
  );
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

  file = new FileImpl(hash, profile, userName, transforms());
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
  systemInfoDiv.innerHTML = "";
  elanInputOutput.clearAllGraphics();
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
  file = new FileImpl(hash, profile, userName, transforms());
  await renderAsHtml(false);
}

function domEventType(evt: Event | undefined) {
  return evt
    ? `DOMEvent: {
type: ${evt.type},
}`
    : "no DOM event recorded";
}

async function gatherDebugInfo() {
  const elanVersion = file.getVersionString();
  const now = new Date().toLocaleString();
  const body = document.getElementsByTagName("body")[0].innerHTML;
  const id = undoRedoFiles[undoRedoFiles.length - 1];
  const code = localStorage.getItem(id);
  const lde = domEventType(errorDOMEvent);
  const lee = toDebugString(errorEditorEvent);
  const es = errorStack ?? "no stack recorded";

  const all = `${elanVersion}\n${now}\n${body}\n${code}\n${lde}\n${lee}\n${es}`;

  await navigator.clipboard.writeText(all);
}

const internalErrorMsg = `<p>Sorry - an internal error has occurred within Elan. Please help us by reporting the bug, following these steps:</p>
<ol>
<li>Click on this button:  <button id="bug-report">Copy bug report to your clipboard</button></li>
<li>In your own email system create an email to bugs@elan-lang.org, with anything in the Subject line.</li>
<li>Paste the copied bug report (it is plain text) from your clipboard into the body of the email.</li>
<li><b>Above</b> the pasted-in report, add any further details that might help us - such as your action immediately prior to the error message appearing</li>
</ol>
<p>Please note that the report includes your Elan code. We promise not to use this for any purpose other than to try to reproduce and fix the bug.</p>`;

async function showError(err: Error, fileName: string, reset: boolean) {
  // because otherwise we will pick up any clicks or edits done after error
  errorDOMEvent = lastDOMEvent;
  errorEditorEvent = lastEditorEvent;

  clearDisplays();
  if (reset) {
    await resetFile();
  }

  file.fileName = fileName;

  if (err.message?.startsWith(fileErrorPrefix)) {
    systemInfoPrintLine(err.message);
  } else if (err.stack) {
    let msg = "";
    let stack = "";
    if (err instanceof ElanRuntimeError) {
      msg = "A Runtime error occurred in the Elan code";
      stack = err.elanStack;
      systemInfoPrintLine(msg);
      systemInfoPrintLine(stack);
    } else {
      systemInfoPrintLine(internalErrorMsg, false);
      errorStack = err.stack;
      document.getElementById("bug-report")?.addEventListener("click", gatherDebugInfo);
    }
  } else {
    systemInfoPrintLine(err.message ?? "Unknown error parsing file");
  }
  updateDisplayValues();
}

function systemInfoPrintLine(text: string, scroll = true) {
  systemInfoDiv.innerHTML = systemInfoDiv.innerHTML + text + "\n";
  if (scroll) {
    systemInfoDiv.scrollTop = systemInfoDiv.scrollHeight;
  }
  systemInfoDiv.focus();
}

async function refreshAndDisplay(compileIfParsed: boolean, editingField: boolean) {
  try {
    file.refreshParseAndCompileStatuses(compileIfParsed);
    if (file.readCompileStatus() === CompileStatus.ok && file.hasTests) {
      runTests();
    }
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

function setStatus(html: HTMLDivElement, colour: string, label: string, showTooltip = true): void {
  html.setAttribute("class", colour);
  const tooltip =
    showTooltip && (colour === "error" || colour === "warning")
      ? "Click to navigate to first issue in (expanded) code"
      : "";
  html.setAttribute("title", tooltip);
  html.innerText = label;
}

function isRunningState() {
  return file.readRunStatus() === RunStatus.running || file.readRunStatus() === RunStatus.paused;
}

function isPausedState() {
  return file.readRunStatus() === RunStatus.paused;
}

function setPauseButtonState(waitingForUserInput?: boolean) {
  if (isRunningState() && debugMode && !isPausedState() && !waitingForUserInput) {
    enable(pauseButton, "Pause the program");
  } else {
    disable([pauseButton], "Can only pause a program running in Debug mode");
  }
}

function updateDisplayValues() {
  updateNameAndSavedStatus();
  setStatus(parseStatus, file.getParseStatusColour(), file.getParseStatusLabel());
  setStatus(compileStatus, file.getCompileStatusColour(), file.getCompileStatusLabel());
  setStatus(testStatus, file.getTestStatusColour(), file.getTestStatusLabel());
  setStatus(runStatus, file.getRunStatusColour(), file.getRunStatusLabel(), false);
  // Button control
  const isEmpty = file.readParseStatus() === ParseStatus.default;
  const isParsing = file.readParseStatus() === ParseStatus.valid;
  const isCompiling = file.readCompileStatus() === CompileStatus.ok;
  const isRunning = isRunningState();
  const isPaused = isPausedState();
  const isTestRunning = file.readTestStatus() === TestStatus.running;

  saveButton.hidden = !!autoSaveFileHandle;

  if (isRunning || isTestRunning) {
    codeContainer?.classList.add("running");

    if (isPaused) {
      enable(runDebugButton, "Resume the program");
      enable(stepButton, "Single step the program");
    } else {
      disable(
        [runButton, runDebugButton, stepButton],
        isRunning ? "Program is already running" : "Tests are running",
      );
    }

    enable(stopButton, isRunning ? "Stop the program" : "Stop the Tests");

    setPauseButtonState();

    const msg = isRunning ? "Program is running" : "Tests are running";
    disable(
      [
        runButton,
        loadButton,
        appendButton,
        saveButton,
        autoSaveButton,
        newButton,
        demosButton,
        trimButton,
        expandCollapseButton,
        undoButton,
        redoButton,
        clearGraphicsButton,
        clearSystemInfoButton,
        fileButton,
        loadButton,
        saveAsStandaloneButton,
      ],
      msg,
    );
    for (const elem of demoFiles) {
      elem.setAttribute("hidden", "");
    }
  } else {
    codeContainer?.classList.remove("running");

    disable([stopButton, pauseButton, stepButton], "Program is not running");

    enable(fileButton, "File actions");
    enable(loadButton, "Load code from a file");
    enable(appendButton, "Append code from a file onto the end of the existing code");
    enable(newButton, "Clear the current code and start afresh");
    enable(demosButton, "Load a demonstration program");
    enable(trimButton, "Remove all 'newCode' selectors that can be removed (shortcut: Alt-t)");
    enable(expandCollapseButton, "Expand / Collapse all code regions");

    enable(clearGraphicsButton, "Clear display");
    enable(clearSystemInfoButton, "Clear display");

    for (const elem of demoFiles) {
      elem.removeAttribute("hidden");
    }

    if (isEmpty) {
      disable([saveButton], "Some code must be added in order to save");
    } else if (!isParsing) {
      disable([saveButton], "Code must be parsing in order to save");
    } else {
      enable(saveButton, "Save the code into a file");
    }

    if (!file.containsMain()) {
      disable(
        [runButton, runDebugButton, saveAsStandaloneButton],
        "Code must have a 'main' routine to be run",
      );
    } else if (!isCompiling) {
      disable(
        [runButton, runDebugButton, saveAsStandaloneButton],
        "Program is not yet compiled. If you have just edited a field, press Enter or Tab to complete.",
      );
    } else {
      enable(runButton, "Run the program");
      enable(runDebugButton, "Debug the program");
      enable(saveAsStandaloneButton, "Save the program as a standalone webpage");
    }

    if (canUndo()) {
      enable(undoButton, "Undo last change (Ctrl + z)");
    } else {
      disable([undoButton], "Nothing to undo");
    }

    if (nextFileIndex === -1) {
      disable([redoButton], "Nothing to redo");
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
          disable([autoSaveButton], "Code must be parsing in order to save");
        }
      }
    }

    if (userName) {
      logoutButton.removeAttribute("hidden");
      enable(logoutButton, "Log out");
    } else {
      logoutButton.setAttribute("hidden", "hidden");
    }
  }
}

function disable(buttons: HTMLButtonElement[], msg = "") {
  for (const button of buttons) {
    button.setAttribute("disabled", "");
    button.setAttribute("title", msg);
  }
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
        optionalData: autocomplete,
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
        optionalData: autocomplete,
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

function handleEscape(e: editorEvent) {
  if (e.key === "Escape") {
    demosButton.focus();
    return true;
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
    case "Escape":
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
  if (isRunningState()) {
    event?.preventDefault();
    event.stopPropagation();
    return;
  }

  // save last dom event for debug
  lastDOMEvent = event;

  const msg = getEditorMsg(type, target, id, key, modKey, selection, autocomplete);

  // save last editor event for debug
  lastEditorEvent = msg;

  if (!isSupportedKey(msg)) {
    // discard
    return;
  }

  if (handleEscape(msg)) {
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

  function getInput() {
    return document.querySelector(".focused input") as HTMLInputElement;
  }

  const input = getInput();
  const focused = getFocused();

  codeContainer?.addEventListener("click", (event) => {
    if (isRunningState()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const focused = getFocused();
    if (focused) {
      focused.focus();
    } else {
      file.getFirstChild().select();
      getFocused()?.focus();
    }
  });

  codeContainer.addEventListener("mousedown", (event) => {
    // to prevent codeContainer taking focus on a click
    if (isRunningState()) {
      event.preventDefault();
      event.stopPropagation();
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

  const items = document.querySelectorAll(".error-link");

  for (const item of items) {
    item.addEventListener("click", (event) => {
      const ke = event as PointerEvent;
      const tgt = ke.target as HTMLDivElement;
      const href = tgt.dataset.href;
      if (href) {
        window.open(`documentation/${href}`, "_blank")?.focus();
      }
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
    codeContainer.focus();
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

  if (!isElanProduction) {
    const dbgFocused = document.querySelectorAll(".focused");
    //debug check
    if (dbgFocused.length > 1) {
      let msg = "multiple focused ";
      dbgFocused.forEach((n) => (msg = `${msg}, Node: ${(n.nodeName, n.id)} `));
      await showError(new Error(msg), file.fileName, false);
    }
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
    disable([undoButton, redoButton], msg);
    cursorWait();
    undoRedoing = true;
    const fn = file.fileName;
    file = new FileImpl(hash, profile, userName, transforms());
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
      systemInfoPrintLine(e.message);
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
      setPauseButtonState(true);
      const line = await elanInputOutput.readLine();
      setPauseButtonState(false);
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
      try {
        await (elanInputOutput as any)[data.function](...data.parameters);
        runWorker?.postMessage(readMsg(""));
      } catch (e) {
        runWorker?.postMessage(errorMsg(e));
      }
      break;
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

let pendingBreakpoints: WebWorkerBreakpointMessage[] = [];

async function handleRunWorkerPaused(data: WebWorkerBreakpointMessage): Promise<void> {
  file.setRunStatus(RunStatus.paused);
  console.info("elan program paused");
  const variables = data.value;
  systemInfoDiv.innerHTML = "";

  for (const v of variables) {
    systemInfoPrintLine(`${v[0]} : ${v[1]}`);
  }

  const pausedAt = document.getElementById(data.pausedAt);
  pausedAt?.classList.add("paused-at");
  pausedAt?.scrollIntoView();
  systemInfoDiv.focus();
  updateDisplayValues();
}

async function handleRunWorkerSingleStep(data: WebWorkerBreakpointMessage): Promise<void> {
  if (singleStepping) {
    handleRunWorkerPaused(data);
  }
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
      file = new FileImpl(hash, profile, userName, transforms());
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
        file = new FileImpl(hash, profile, userName, transforms());
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

async function chromeSave(code: string, newName?: string) {
  const fh = await showSaveFilePicker({
    suggestedName: newName ?? file.fileName,
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
  systemInfoPrintLine("Tests timed out and were aborted");
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

/* eslint-disable @typescript-eslint/no-explicit-any */

import { DebugSymbol } from "../../compiler/compiler-interfaces/debug-symbol";
import { ElanRuntimeError } from "../../compiler/standard-library/elan-runtime-error";
import { StdLib } from "../../compiler/standard-library/std-lib";
import { TestStatus } from "../../compiler/test-status";
import { isElanProduction } from "../../environment";
import {
  cannotLoadFile,
  CodeSourceFromString,
  fileErrorPrefix,
  FileImpl,
  parseErrorPrefix,
} from "../frames/file-impl";
import { editorEvent, toDebugString } from "../frames/frame-interfaces/editor-event";
import { File, ParseMode } from "../frames/frame-interfaces/file";
import { Profile } from "../frames/frame-interfaces/profile";
import { Group, Individual } from "../frames/frame-interfaces/user-config";
import { CompileStatus, ParseStatus, RunStatus } from "../frames/status-enums";
import { StubInputOutput } from "../stub-input-output";
import { handleClick, handleDblClick, handleKey } from "./editorHandlers";
import { checkIsChrome, confirmContinueOnNonChromeBrowser } from "./ui-helpers";
import {
  encodeCode,
  fetchDefaultProfile,
  fetchProfile,
  fetchUserConfig,
  hash,
  sanitiseHtml,
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
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const expandCollapseButton = document.getElementById("expand-collapse") as HTMLButtonElement;
const newButton = document.getElementById("new") as HTMLButtonElement;
const demosButton = document.getElementById("demos") as HTMLButtonElement;
const demosMenu = document.getElementById("demos-menu") as HTMLDivElement;
const fileMenu = document.getElementById("file-menu") as HTMLDivElement;
const worksheetMenu = document.getElementById("worksheet-menu") as HTMLDivElement;

const trimButton = document.getElementById("trim") as HTMLButtonElement;
const loadButton = document.getElementById("load") as HTMLButtonElement;
const appendButton = document.getElementById("append") as HTMLButtonElement;
const importButton = document.getElementById("import") as HTMLButtonElement;
const saveButton = document.getElementById("save") as HTMLButtonElement;
const autoSaveButton = document.getElementById("auto-save") as HTMLButtonElement;
const undoButton = document.getElementById("undo") as HTMLButtonElement;
const redoButton = document.getElementById("redo") as HTMLButtonElement;
const fileButton = document.getElementById("file") as HTMLButtonElement;
const logoutButton = document.getElementById("logout") as HTMLButtonElement;
const saveAsStandaloneButton = document.getElementById("save-as-standalone") as HTMLButtonElement;
const preferencesButton = document.getElementById("preferences") as HTMLButtonElement;

const codeTitle = document.getElementById("code-title") as HTMLDivElement;
const parseStatus = document.getElementById("parse") as HTMLDivElement;
const compileStatus = document.getElementById("compile") as HTMLDivElement;
const testStatus = document.getElementById("test") as HTMLDivElement;
const runStatus = document.getElementById("run-status") as HTMLDivElement;
const codeControls = document.getElementById("code-controls") as HTMLDivElement;
const demoFiles = document.getElementsByClassName("demo-file");

// Display
const clearDisplayButton = document.getElementById("clear-display") as HTMLButtonElement;
const displayTabLabel = document.getElementById("display-tab-label") as HTMLDivElement;
const displayDiv = document.getElementById("display") as HTMLDivElement;

// Info
const clearInfoButton = document.getElementById("clear-info") as HTMLButtonElement;
const infoTabLabel = document.getElementById("info-tab-label") as HTMLDivElement;
const runDebugButton = document.getElementById("run-debug-button") as HTMLButtonElement;
const pauseButton = document.getElementById("pause") as HTMLButtonElement;
const stepButton = document.getElementById("step") as HTMLButtonElement;
const systemInfoDiv = document.getElementById("system-info") as HTMLDivElement;

// Help (documentation)
const helpTabLabel = document.getElementById("help-tab-label") as HTMLDivElement;
const helpHomeButton = document.getElementById("help-home") as HTMLButtonElement;
const helpBackButton = document.getElementById("help-back") as HTMLButtonElement;
const helpForwardButton = document.getElementById("help-forward") as HTMLButtonElement;
const helpIFrame = document.getElementById("help-iframe") as HTMLIFrameElement;

// Worksheet
const worksheetTabLabel = document.getElementById("worksheet-tab-label") as HTMLDivElement;
const standardWorksheetButton = document.getElementById("standard-worksheets") as HTMLButtonElement;
const loadExternalWorksheetButton = document.getElementById("load-worksheet") as HTMLButtonElement;
const worksheetIFrame = document.getElementById("worksheet-iframe") as HTMLIFrameElement;

const infoTab = document.getElementById("info-tab");
const displayTab = document.getElementById("display-tab");
const helpTab = document.getElementById("help-tab");
const worksheetTab = document.getElementById("worksheet-tab");

const inactivityTimeout = 2000;
const stdlib = new StdLib(new StubInputOutput());
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
  event.preventDefault();
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

async function runProgram() {
  try {
    if (file.readRunStatus() === RunStatus.paused && runWorker && debugMode) {
      resumeProgram();
      return;
    }

    await clearDisplays();
    file.setRunStatus(RunStatus.running);
    updateDisplayValues();
    const path = `${document.location.origin}${document.location.pathname}`.replace(
      "/index.html",
      "",
    );
    const jsCode = file.compileAsWorker(path, debugMode, false);
    const asUrl = encodeCode(jsCode);

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

runButton?.addEventListener("click", async () => {
  runButton.focus();
  showDisplayTab();
  debugMode = singleStepping = processingSingleStep = false;
  await runProgram();
});

runDebugButton?.addEventListener("click", async () => {
  runDebugButton.focus();
  setTimeout(showDisplayTab);
  debugMode = true;
  singleStepping = processingSingleStep = false;
  await runProgram();
});

stepButton?.addEventListener("click", async () => {
  singleStepping = true;

  if (pendingBreakpoints.length > 0) {
    const next = pendingBreakpoints[0];
    pendingBreakpoints = pendingBreakpoints.slice(1);
    await handleRunWorkerPaused(next);
    systemInfoDiv.focus();
    systemInfoDiv.classList.add("focussed");
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
  disable([stopButton, pauseButton, stepButton], "Program is not running");
  // do rest on next event loop for responsivenesss
  setTimeout(() => {
    debugMode = singleStepping = false;
    if (runWorker) {
      handleRunWorkerFinished();
    }
    if (testWorker) {
      endTests();
      file.setTestStatus(TestStatus.default);
      updateDisplayValues();
    }
  }, 1);
});

clearDisplayButton?.addEventListener("click", async () => {
  await elanInputOutput.clearDisplay();
});

clearInfoButton?.addEventListener("click", async () => {
  await elanInputOutput.clearSystemInfo();
});

loadExternalWorksheetButton?.addEventListener("click", async () => {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      startIn: "documents",
      types: [{ accept: { "text/html": ".html" } }],
      id: lastDirId,
    });
    const codeFile = await fileHandle.getFile();

    const url = URL.createObjectURL(codeFile);
    window.open(url, "worksheet-iframe")?.focus();
  } catch (_e) {
    // user cancelled
    return;
  }
});

expandCollapseButton?.addEventListener("click", async () => {
  file.expandCollapseAll();
  await renderAsHtml(false);
});

newButton?.addEventListener("click", async () => {
  if (checkForUnsavedChanges(cancelMsg)) {
    await clearDisplays();
    clearUndoRedoAndAutoSave();
    file = new FileImpl(hash, profile, userName, transforms(), stdlib);
    await initialDisplay(false);
  }
});

loadButton.addEventListener("click", chooser(getUploader(), false));

appendButton.addEventListener("click", chooser(getAppender(), true));

importButton.addEventListener("click", chooser(getImporter(), true));

saveButton.addEventListener("click", getDownloader());

autoSaveButton.addEventListener("click", handleChromeAutoSave);

async function loadDemoFile(fileName: string) {
  const f = await fetch(fileName, { mode: "same-origin" });
  const rawCode = await f.text();
  file = new FileImpl(hash, profile, userName, transforms(), stdlib);
  file.fileName = fileName;
  clearUndoRedoAndAutoSave();
  await readAndParse(rawCode, fileName, ParseMode.loadNew);
}

saveAsStandaloneButton.addEventListener("click", async () => {
  let jsCode = file.compileAsWorker("", false, true);

  const api = await (await fetch("elan-api.js", { mode: "same-origin" })).text();
  let script = await (await fetch("standalone.js", { mode: "same-origin" })).text();
  let html = await (await fetch("standalone.html", { mode: "same-origin" })).text();
  const cssColour = await (await fetch("colourScheme.css", { mode: "same-origin" })).text();
  const cssStyle = await (await fetch("elanStyle.css", { mode: "same-origin" })).text();
  const cssIde = await (await fetch("ide.css", { mode: "same-origin" })).text();

  jsCode = api + jsCode;

  const asUrl = encodeCode(jsCode);

  script = script.replace("injected_code", asUrl);
  html = html.replace("injected_code", script);
  html = html.replace("injected_colour_css", cssColour);
  html = html.replace("injected_style_css", cssStyle);
  html = html.replace("injected_ide_css", cssIde);

  await chromeSave(html, false, "standalone.html");
});

for (const elem of demoFiles) {
  elem.addEventListener("click", async () => {
    if (checkForUnsavedChanges(cancelMsg)) {
      const fileName = `${elem.id}`;
      await loadDemoFile(fileName);
    }
  });
}

preferencesButton.addEventListener("click", () => {
  const dialog = document.getElementById("preferences-dialog") as HTMLDialogElement;
  const closeButton = document.getElementById("confirmBtn");

  const cvd = document.getElementById("use-cvd") as HTMLInputElement;

  closeButton?.addEventListener("click", () => {
    if (cvd.checked) {
      changeCss("cvd-colourScheme");
    } else {
      changeCss("colourScheme");
    }

    dialog.close();
  });

  // otherwise it can pick up click and close immediately
  setTimeout(() => dialog.showModal(), 1);
});

function showDisplayTab() {
  const tabName = "display-tab";
  setTabToFocussedAndSelected(tabName);
  (document.querySelector("#printed-text input") as HTMLInputElement | undefined)?.focus();
}

function showInfoTab() {
  const tabName = "info-tab";
  setTabToFocussedAndSelected(tabName);
}

function showHelpTab() {
  const tabName = "help-tab";
  setTabToFocussedAndSelected(tabName);
  helpIFrame.focus();
  helpIFrame.contentWindow?.addEventListener("keydown", globalHandler);
}

function showWorksheetTab() {
  const tabName = "worksheet-tab";
  setTabToFocussedAndSelected(tabName);
  if (worksheetLoaded) {
    worksheetIFrame.focus();
    worksheetIFrame.contentWindow?.postMessage("hasFocus", "*");
  } else {
    standardWorksheetButton.focus();
  }
}

function setTabToFocussedAndSelected(tabName: string) {
  collapseAllMenus();
  // Remove selected and focussed from other three tabs
  const allTabElements = document.getElementsByClassName("tab-element");
  for (const e of allTabElements) {
    e.classList.remove("selected");
    e.classList.remove("focussed");
  }
  // Add selected and focussed to the specified tab
  const newTabElements = document.getElementsByClassName(tabName);
  for (const e of newTabElements as HTMLCollectionOf<HTMLElement>) {
    e.classList.add("selected");
    e.classList.add("focussed");
    e.focus();
  }
}

function removeFocussedClassFromAllTabs() {
  const allTabElements = document.getElementsByClassName("tab-element");
  for (const e of allTabElements) {
    e.classList.remove("focussed");
  }
  const allTabContent = document.getElementsByClassName("tab-content");
  for (const e of allTabContent) {
    e.classList.remove("focussed");
  }
}

helpTabLabel.addEventListener("click", showHelpTab);

helpHomeButton.addEventListener("click", () => {
  window.open("documentation/index.html", "help-iframe")?.focus();
});

helpBackButton.addEventListener("click", () => {
  helpIFrame.contentWindow?.history.back();
});

helpForwardButton.addEventListener("click", () => {
  helpIFrame.contentWindow?.history.forward();
});

displayTabLabel.addEventListener("click", showDisplayTab);
infoTabLabel.addEventListener("click", showInfoTab);
worksheetTabLabel.addEventListener("click", showWorksheetTab);

let worksheetLoaded = false;

worksheetIFrame.addEventListener("load", () => {
  worksheetLoaded = true;
  worksheetIFrame.contentWindow?.addEventListener("keydown", globalHandler);
  worksheetIFrame.contentWindow?.addEventListener("click", () => {
    const newTabElements = document.getElementsByClassName("worksheet-tab");
    for (const e of newTabElements as HTMLCollectionOf<HTMLElement>) {
      e.classList.add("selected");
      e.classList.add("focussed");
    }
  });
  worksheetTabLabel.click();
});

helpIFrame.addEventListener("load", () => {
  helpIFrame.contentWindow?.addEventListener("keydown", globalHandler);
  helpIFrame.contentWindow?.addEventListener("click", () => showHelpTab());
});

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
  console.log("css to: " + stylesheet);
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

parseStatus.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" || event.code === "Space") {
    await handleStatusClick(event, "el-field", false);
  }
});

compileStatus.addEventListener("click", async (event) => {
  await handleStatusClick(event, "el-msg", true);
});

compileStatus.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" || event.code === "Space") {
    await handleStatusClick(event, "el-msg", true);
  }
});

testStatus.addEventListener("click", async (event) => {
  await handleStatusClick(event, "el-msg", true);
});

testStatus.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" || event.code === "Space") {
    await handleStatusClick(event, "el-msg", true);
  }
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
  const msg = "Require Chrome or Edge";
  disable(
    [
      runButton,
      runDebugButton,
      stopButton,
      pauseButton,
      stepButton,
      loadButton,
      appendButton,
      importButton,
      saveButton,
      autoSaveButton,
      newButton,
      demosButton,
      trimButton,
      expandCollapseButton,
      undoButton,
      redoButton,
      clearDisplayButton,
      saveAsStandaloneButton,
      preferencesButton,
    ],
    msg,
  );
  for (const elem of demoFiles) {
    elem.setAttribute("hidden", "");
  }
}

const cancelMsg = "You have unsaved changes - they will be lost unless you cancel";

function checkForUnsavedChanges(msg: string): boolean {
  return hasUnsavedChanges() ? confirm(msg) : true;
}

async function setup(p: Profile) {
  clearUndoRedoAndAutoSave();
  profile = p;

  file = new FileImpl(hash, profile, userName, transforms(), stdlib);
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

function clearSystemDisplay() {
  systemInfoDiv.innerHTML = "";
}

async function clearDisplays() {
  clearSystemDisplay();
  await elanInputOutput.clearDisplay();
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
  file = new FileImpl(hash, profile, userName, transforms(), stdlib);
  await initialDisplay(false);
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

const internalErrorMsg = `Sorry, an internal error has occurred. Please help us by reporting the bug, following these steps:
<ol>
<li>Click on this button:  <button id="bug-report">Copy bug report to your clipboard</button></li>
<li>In your own email system create an email to bugs@elan-lang.org, with anything in the Subject line.</li>
<li>Paste the copied bug report (it is plain text) from your clipboard into the body of the email.</li>
<li><b>Above</b> the pasted-in report, please describe your action immediately prior to the error message appearing</li>
</ol>
Please note that the report includes your Elan code. We will use this <i<>only</i> to try to reproduce and fix the bug,
and <i>won't</i> make it public.`;

async function showError(err: Error, fileName: string, reset: boolean) {
  // because otherwise we will pick up any clicks or edits done after error
  errorDOMEvent = lastDOMEvent;
  errorEditorEvent = lastEditorEvent;

  clearSystemDisplay();
  if (reset) {
    await resetFile();
  }

  file.fileName = fileName;

  if (err.message?.startsWith(fileErrorPrefix)) {
    systemInfoPrintSafe(err.message);
  } else if (err.message?.startsWith(parseErrorPrefix)) {
    systemInfoPrintSafe(cannotLoadFile);
  } else if (err.stack) {
    let msg = "";
    let stack = "";
    if (err instanceof ElanRuntimeError) {
      msg = "A Runtime error occurred in the Elan code";
      stack = err.elanStack;
      systemInfoPrintSafe(msg);
      systemInfoPrintSafe(stack);
    } else {
      // our message
      systemInfoPrintUnsafe(internalErrorMsg, false);
      errorStack = err.stack;
      document.getElementById("bug-report")?.addEventListener("click", gatherDebugInfo);
    }
  } else {
    systemInfoPrintSafe(err.message ?? "Unknown error parsing file");
  }
  updateDisplayValues();
}

function systemInfoPrintSafe(text: string, scroll = true) {
  // sanitise the text
  text = sanitiseHtml(text);
  systemInfoPrintUnsafe(text, scroll);
}

function systemInfoPrintUnsafe(text: string, scroll = true) {
  systemInfoDiv.innerHTML = systemInfoDiv.innerHTML + text + "\n";
  if (scroll) {
    systemInfoDiv.scrollTop = systemInfoDiv.scrollHeight;
  }
  systemInfoDiv.focus();
  showInfoTab();
}

async function refreshAndDisplay(compileIfParsed: boolean, editingField: boolean) {
  try {
    file.refreshParseAndCompileStatuses(compileIfParsed);
    if (file.readCompileStatus() === CompileStatus.ok && file.hasTests) {
      await runTests();
    }
    await renderAsHtml(editingField);
  } catch (e) {
    await showError(e as Error, file.fileName, false);
  }
}

async function initialDisplay(reset: boolean) {
  await clearDisplays();

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
  code.mode = ParseMode.loadNew;
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
  return { control: e.ctrlKey || e.metaKey, shift: e.shiftKey, alt: e.altKey };
}

function hasUnsavedChanges() {
  return !(lastSavedHash === file.currentHash);
}

function updateNameAndSavedStatus() {
  const unsaved = hasUnsavedChanges() ? " UNSAVED" : "";
  codeTitle.innerText = `file: ${file.fileName}${unsaved}`;
}

function canUndo() {
  const isParsing = file.readParseStatus() === ParseStatus.valid;
  return (isParsing && previousFileIndex > -1) || (!isParsing && currentFileIndex > -1);
}

function setStatus(html: HTMLDivElement, colour: string, label: string, showTooltip = true): void {
  html.setAttribute("class", colour);
  if (showTooltip && (colour === "error" || colour === "warning")) {
    html.tabIndex = 0;
    html.setAttribute("title", "Click to navigate to first issue in (expanded) code");
  } else {
    html.tabIndex = -1;
    html.setAttribute("title", "");
  }

  html.innerText = label;
}

function isRunningState() {
  return (
    file.readRunStatus() === RunStatus.running ||
    file.readRunStatus() === RunStatus.paused ||
    file.readRunStatus() === RunStatus.input
  );
}

function isTestRunningState() {
  return file.readTestStatus() === TestStatus.running;
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

  // Button control
  const isEmpty = file.readParseStatus() === ParseStatus.default;
  const isParsing = file.readParseStatus() === ParseStatus.valid;
  const isCompiling = file.readCompileStatus() === CompileStatus.ok;
  const isRunning = isRunningState();
  const isPaused = isPausedState();
  let isTestRunning = isTestRunningState();

  if (isTestRunning && !(isParsing || isCompiling)) {
    endTests();
    file.setTestStatus(TestStatus.default);
    isTestRunning = false;
    console.info("tests cancelled in updateDisplayValues");
  }

  setStatus(parseStatus, file.getParseStatusColour(), file.getParseStatusLabel());
  setStatus(compileStatus, file.getCompileStatusColour(), file.getCompileStatusLabel());
  setStatus(testStatus, file.getTestStatusColour(), file.getTestStatusLabel());
  setStatus(runStatus, file.getRunStatusColour(), file.getRunStatusLabel(), false);

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
        importButton,
        saveButton,
        autoSaveButton,
        newButton,
        demosButton,
        trimButton,
        expandCollapseButton,
        undoButton,
        redoButton,
        clearDisplayButton,
        fileButton,
        loadButton,
        saveAsStandaloneButton,
        preferencesButton,
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
    enable(importButton, "Import code from a file");
    enable(newButton, "Clear the current code and start afresh");
    enable(demosButton, "Load a demonstration program");
    enable(trimButton, "Remove all 'new code' prompts that can be removed (shortcut: Alt-t)");
    enable(expandCollapseButton, "Expand / Collapse all code regions");
    enable(preferencesButton, "Set preferences");
    enable(clearDisplayButton, "Clear display");

    for (const elem of demoFiles) {
      elem.removeAttribute("hidden");
    }

    if (isEmpty) {
      disable([saveButton], "Some code must be added in order to save");
    } else if (!isParsing) {
      disable([saveButton], "Code must be parsing in order to save");
    } else if (autoSaveFileHandle) {
      disable([saveButton], "Autosave is enabled- cancel to manual save");
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
      enable(undoButton, "Undo last change (Ctrl-z)");
    } else {
      disable([undoButton], "Nothing to undo");
    }

    if (nextFileIndex === -1) {
      disable([redoButton], "Nothing to redo");
    } else {
      enable(redoButton, "Redo last change (Ctrl-y)");
    }

    if (autoSaveFileHandle) {
      autoSaveButton.innerText = "cancel auto save";
      enable(autoSaveButton, "Click to turn auto-save off and resume manual saving.");
    } else {
      if (useChromeFileAPI()) {
        autoSaveButton.innerText = "auto save";
        if (isParsing) {
          enable(
            autoSaveButton,
            "Save to file now and then auto-save to same file whenever code is changed and parses",
          );
        } else {
          disable([autoSaveButton], "Code must be parsing in order to save");
        }
      } else {
        disable([autoSaveButton], "Only available on Chrome");
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
  optionalData: string | undefined,
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
        optionalData: optionalData,
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
        optionalData: optionalData,
      };
  }
}

function handleSelectorPaste(event: Event, target: HTMLElement, msg: editorEvent): boolean {
  target.addEventListener("paste", async (event: ClipboardEvent) => {
    const mk = { control: true, shift: false, alt: false };
    const txt = await navigator.clipboard.readText();
    await handleEditorEvent(event, "paste", "frame", mk, msg.id, "V", undefined, `${txt.trim()}\n`);
  });

  event.stopPropagation();
  return true;
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
  if (msg.modKey.control && msg.modKey.shift && msg.key === "V") {
    return handleSelectorPaste(event, event.target as HTMLElement, msg);
  }

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
  optionalData?: string | undefined,
) {
  if (isRunningState()) {
    event?.preventDefault();
    event.stopPropagation();
    return;
  }

  if (isGlobalKeyboardEvent(event)) {
    return;
  }

  // save last dom event for debug
  lastDOMEvent = event;

  const msg = getEditorMsg(type, target, id, key, modKey, selection, optionalData);

  // save last editor event for debug
  lastEditorEvent = msg;

  if (!isSupportedKey(msg)) {
    // discard
    return;
  }

  if (isTestRunningState()) {
    endTests();
    file.setTestStatus(TestStatus.default);
    console.info("tests cancelled in handleEditorEvent");
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
  collapseAllMenus();

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

    showCode();
  });

  codeContainer.addEventListener("mousedown", (event) => {
    // to prevent codeContainer taking focus on a click
    if (isRunningState()) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  let firstContextItem: HTMLDivElement | undefined;

  if (document.querySelector(".context-menu")) {
    const items = document.querySelectorAll(".context-menu-item") as NodeListOf<HTMLDivElement>;

    firstContextItem = items[0];

    for (const item of items) {
      item.addEventListener("click", (event) => {
        const ke = event as PointerEvent | KeyboardEvent;
        const tgt = ke.target as HTMLDivElement;
        const id = tgt.dataset.id;
        const func = tgt.dataset.func;

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
      });

      item.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
          handleMenuArrowUp();
          event.preventDefault();
          event.stopPropagation();
        } else if (event.key === "ArrowDown") {
          handleMenuArrowDown();
          event.preventDefault();
          event.stopPropagation();
        } else if (event.key === "Enter" || event.key === "Space") {
          const focusedItem = document.activeElement as HTMLElement;
          focusedItem?.click();
          event.preventDefault();
          event.stopPropagation();
        }
      });
    }
  }

  const helpLinks = document.querySelectorAll("el-help a");

  for (const item of helpLinks) {
    item.addEventListener("click", (event) => {
      if ((event.target as any).target === "help-iframe") {
        // can't use the load event as if the page is already loaded with url it doesn#t fore agaon so
        // no focus
        helpTabLabel.click();
      }

      event.stopPropagation();
    });
  }

  if (firstContextItem) {
    firstContextItem.focus();
  } else if (input) {
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

  const activeHelp = document.querySelector("a.active") as HTMLLinkElement | undefined;

  if (activeHelp) {
    activeHelp.click();
  }

  const activeCopy = document.querySelectorAll(".to-be-copied") as NodeListOf<HTMLElement>;

  if (activeCopy.length > 0) {
    let allCode = "";

    for (const ac of activeCopy) {
      const id = ac.id;
      const frame = file.getById(id);
      const code = frame.renderAsSource().trim();

      if (allCode) {
        allCode = allCode + "\n" + code;
      } else {
        allCode = code;
      }
    }

    await navigator.clipboard.writeText(allCode);
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

  if (file.readParseStatus() === ParseStatus.valid) {
    // autosave if setup
    code = code || (await file.renderAsSource());
    await autoSave(code);
  }
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
    file = new FileImpl(hash, profile, userName, transforms(), stdlib);
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

const delayMessage =
  "Overly complex expressions - for example involving a sequence of open brackets - can result in very slow parsing. We strongly recommend that you simplify the contents of this field, for example by breaking out parts of it into separate 'let' statements. Otherwise it might become impossible to add more text.";

let purgingKeys = false;

async function handleKeyAndRender(e: editorEvent) {
  if (file.readRunStatus() === RunStatus.running) {
    // no change while running
    return;
  }

  clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(inactivityRefresh, inactivityTimeout);

  try {
    let codeChanged = false;
    let isBeingEdited = false;
    collapseAllMenus();
    removeFocussedClassFromAllTabs();
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
        if (purgingKeys) {
          return;
        }
        const before = Date.now();
        codeChanged = handleKey(e, file);
        const after = Date.now();
        const delay = after - before;
        if (codeChanged === true) {
          if (delay >= 1000) {
            alert(delayMessage);
            e.key = "Backspace";
            handleKey(e, file);
            setTimeout(() => (purgingKeys = false), 500);
            purgingKeys = true;
          }
          const singleKeyEdit = !(e.modKey.control || e.modKey.shift || e.modKey.alt);
          await refreshAndDisplay(false, singleKeyEdit);
        } else if (codeChanged === false) {
          await renderAsHtml(false);
        }
        // undefined just return
        return;
      case "contextmenu":
        codeChanged = handleKey(e, file);
        if (codeChanged) {
          await refreshAndDisplay(true, false);
        } else {
          await renderAsHtml(false);
        }
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

function togggleInputStatus(rs: RunStatus) {
  file.setRunStatus(rs);
  setStatus(runStatus, file.getRunStatusColour(), file.getRunStatusLabel(), false);
}

async function handleWorkerIO(data: WebWorkerWriteMessage) {
  switch (data.function) {
    case "readLine":
      setPauseButtonState(true);
      togggleInputStatus(RunStatus.input);
      const line = await elanInputOutput.readLine();
      // program may have been stopped so check state
      const rs = file.readRunStatus();
      if (rs === RunStatus.input) {
        togggleInputStatus(RunStatus.running);
      }
      setPauseButtonState(false);
      runWorker?.postMessage(readMsg(line));
      break;
    case "waitForAnyKey":
      await elanInputOutput.waitForAnyKey();
      runWorker?.postMessage(readMsg(""));
      break;
    case "waitForKey":
      const wkey = await elanInputOutput.waitForKey();
      runWorker?.postMessage(readMsg(wkey));
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

function showCode() {
  collapseAllMenus();
  removeFocussedClassFromAllTabs();
  const focused = getFocused();
  if (focused) {
    focused.focus();
  } else {
    file.getFirstChild().select();
    getFocused()?.focus();
  }
}

function handleRunWorkerFinished() {
  runWorker?.terminate();
  runWorker = undefined;
  elanInputOutput.finished();
  console.info("elan program completed OK");
  file.setRunStatus(RunStatus.default);
  clearPaused();
  updateDisplayValues();
  showCode();
}

let pendingBreakpoints: WebWorkerBreakpointMessage[] = [];

function getSummaryHtml(content: string) {
  return `<div class="summary" tabindex="0">${content}</div>`;
}

function getDebugHtml(content1: string, content2: string) {
  return `<div class="expandable">${getSummaryHtml(content1)}<div class="detail">${content2}</div></div>`;
}

function lengthHtml(l: number) {
  return ` <el-comment># length ${l}</el-comment>`;
}

function getSummary(type: string, lenOrAsString: number | string, formattedId: string): string {
  const suffix = typeof lenOrAsString === "number" ? lengthHtml(lenOrAsString) : lenOrAsString;
  return `${formattedId} ${formatType(type)}${suffix}`;
}

function formatFloat(value: number | string) {
  const asString = `${value}`;
  return asString.includes(".") ? asString : `${value}.0`;
}

function simpleId(id: string | string[], asIndex: boolean, type: string): string {
  if (Array.isArray(id)) {
    // 2d array int index
    const secondIndex = id[1] === "_" ? id[1] : `<el-lit>${id[1]}</el-lit>`;

    return `[<el-lit>${id[0]}</el-lit>, ${secondIndex}]`;
  }
  const quot = asIndex && type === "String" ? `"` : "";
  id = asIndex && type === "Float" ? formatFloat(id) : id;
  return asIndex ? `[${quot}<el-lit>${id}</el-lit>${quot}]` : `<el-id>${id}</el-id>`;
}

function simpleValue(value: number | string, type: string): string {
  if (type === "String") {
    value = `${value}`.replaceAll(">", "&gt;").replaceAll("<", "&lt;");
    return `"<el-lit>${value}</el-lit>"`;
  } else if (type === "Float") {
    const fl = formatFloat(value);
    return `<el-lit>${fl}</el-lit>`;
  }

  return `<el-lit>${value}</el-lit>`;
}

function formatType(type: string) {
  type = type
    .replaceAll(">", "&gt;")
    .replaceAll("<", "&lt;")
    .replaceAll("&lt;of ", "&lt;<el-kw>of</el-kw> ")
    .replaceAll(/([A-Za-z0-9_]{3,})/g, `<el-type>$1</el-type>`);
  return type;
}

function getDebugSymbolList(
  name: string | string[],
  nameType: string,
  value: [],
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
) {
  const type = typeMap["Type"];
  const summary = getSummary(type, value.length, simpleId(name, asIndex, nameType));
  const items = value.map((item, i) =>
    getDebugSymbolHtml(`${i}`, "Int", item, typeMap["OfTypes"], true),
  );
  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function getDebugSymbolTuple(
  name: string | string[],
  nameType: string,
  value: [],
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
) {
  const type = typeMap["Type"];
  const summary = getSummary(type, "", simpleId(name, asIndex, nameType));
  const items = value.map((item, i) => {
    const itemId = `item${i}`;
    return getDebugSymbolHtml(itemId, "", item, typeMap["OfTypes"][i], false);
  });
  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function getDebugItemHtml2D(index: number, value: [], typeMap: { [index: string]: any }): string {
  const list = value;
  const summary = getSummary("", "", simpleId([`${index}`, "_"], true, "Int"));
  const items = list.map((item, subindex) =>
    getDebugSymbolHtml([`${index}`, `${subindex}`], "Int", item, typeMap["OfTypes"]),
  );
  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function getDebugSymbolArray2D(
  name: string | string[],
  nameType: string,
  value: [[]],
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
) {
  const type = typeMap["Type"];
  const cols = value.length;
  const rows = value[0].length;
  const size = ` <el-comment># size ${cols} x ${rows}</el-comment>`;
  const summary = getSummary(type, size, simpleId(name, asIndex, nameType));
  const items = value.map((item, index) => getDebugItemHtml2D(index, item, typeMap));
  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function getDebugSymbolDictionary(
  name: string | string[],
  nameType: string,
  value: { [index: string]: any },
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
) {
  const type = typeMap["Type"];
  const keyType = typeMap["KeyType"]["Type"];
  const valueType = typeMap["ValueType"];
  const keys = Object.keys(value);
  const summary = getSummary(type, keys.length, simpleId(name, asIndex, nameType));

  const items = keys.map((k) =>
    getDebugSymbolHtml(k, keyType, safeIndex(k, value), valueType, true),
  );

  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function safeIndex(key: string, toIndex: { [index: string]: any }) {
  if (Object.keys(toIndex).includes(key)) {
    return toIndex[key];
  }
  return "";
}

function getDebugSymbolClass(
  name: string | string[],
  nameType: string,
  value: { [index: string]: any },
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
) {
  const type = typeMap["Type"];
  const properties = typeMap["Properties"];
  const summary = getSummary(type, "", simpleId(name, asIndex, nameType));
  let items: string[];

  if (properties) {
    const keys = Object.keys(properties);

    items =
      keys.length > 0
        ? keys.map((k) =>
            getDebugSymbolHtml(k, "", safeIndex(k, value), safeIndex(k, properties), false),
          )
        : [getSummaryHtml("<el-comment># no public properties</el-comment>")];
  } else {
    items = [
      getSummaryHtml("<el-comment># details of this instance are not available</el-comment>"),
    ];
  }

  return getDebugHtml(`${summary}`, `${items.join("")}`);
}

function getDebugSymbolString(
  name: string | string[],
  nameType: string,
  fullString: string,
  asIndex: boolean = false,
) {
  const toTruncate = 10;
  const len = fullString.length;
  const suffix = lengthHtml(len);
  const prefix = simpleId(name, asIndex, nameType);

  if (len <= toTruncate) {
    return getSummaryHtml(`${prefix} ${simpleValue(fullString, "String")}`);
  }

  const shortString = `${simpleValue(fullString.slice(0, toTruncate), "String")}...`;
  return getDebugHtml(`${prefix} ${shortString}${suffix}`, `${simpleValue(fullString, "String")}`);
}

function getDebugSymbolSimple(
  name: string | string[],
  nameType: string,
  value: string,
  type: string,
  asIndex: boolean = false,
) {
  return getSummaryHtml(`${simpleId(name, asIndex, nameType)} ${simpleValue(value, type)}`);
}

function getDebugSymbolEnum(
  name: string | string[],
  nameType: string,
  type: string,
  value: string,
  asIndex: boolean = false,
) {
  return getSummaryHtml(
    `${simpleId(name, asIndex, nameType)} <el-type>${type}</el-type>.<el-id>${value}</el-id>`,
  );
}

function getDebugSymbolHtml(
  name: string | string[],
  nameType: string,
  value: any,
  typeMap: { [index: string]: any },
  asIndex: boolean = false,
): string {
  let rootType = typeMap["Type"] as string;
  const indexOfLt = rootType.indexOf("<");
  if (indexOfLt > 0) {
    rootType = rootType.slice(0, indexOfLt);
  }
  const indexOfBracket = rootType.indexOf("(");
  if (indexOfBracket > 0) {
    rootType = rootType.slice(0, indexOfBracket);
  }

  switch (rootType) {
    case "Boolean":
    case "RegExp":
    case "Int":
    case "Float":
      return getDebugSymbolSimple(name, nameType, value, rootType, asIndex);
    case "Enum":
      return getDebugSymbolEnum(name, nameType, typeMap["OfTypes"]["Type"], value, asIndex);
    case "String":
      return getDebugSymbolString(name, nameType, value, asIndex);
    case "List":
    case "ListImmutable":
    case "Array":
      return getDebugSymbolList(name, nameType, value, typeMap, asIndex);
    case "Dictionary":
    case "DictionaryImmutable":
      return getDebugSymbolDictionary(name, nameType, value, typeMap, asIndex);
    case "Array2D":
      return getDebugSymbolArray2D(name, nameType, value, typeMap, asIndex);
    case "tuple":
      return getDebugSymbolTuple(name, nameType, value, typeMap, asIndex);
    case "Deconstructed":
      return getDebugSymbolHtml(name, nameType, value, typeMap["Ids"][name as string], asIndex);
    default:
      return getDebugSymbolClass(name, nameType, value, typeMap, asIndex);
  }
}

function getDebugSymbol(s: DebugSymbol) {
  const typeMap = JSON.parse(s.typeMap);
  return getDebugSymbolHtml(s.name, "", s.value, typeMap);
}

function printDebugSymbol(s: DebugSymbol) {
  const display = getDebugSymbol(s);
  systemInfoPrintUnsafe(display);
}

function addDebugListeners() {
  const expandable = systemInfoDiv.querySelectorAll(".expandable") as NodeListOf<HTMLDivElement>;

  for (const d of expandable) {
    d.addEventListener("click", (e) => {
      d.classList.toggle("expanded");
      e.preventDefault();
      e.stopPropagation();
    });

    d.addEventListener("keydown", (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "o" || e.key === "O")) {
        d.classList.toggle("expanded");
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  const summaries = systemInfoDiv.querySelectorAll(".summary") as NodeListOf<HTMLDivElement>;
  for (const s of summaries) {
    s.addEventListener("keydown", (event) => {
      if (s.parentElement && event.key === "Enter") {
        s.parentElement!.classList.toggle("expanded");
      }
    });
  }
}

async function handleRunWorkerPaused(data: WebWorkerBreakpointMessage): Promise<void> {
  showInfoTab();
  systemInfoDiv.focus();
  systemInfoDiv.classList.add("focussed");
  file.setRunStatus(RunStatus.paused);
  console.info("elan program paused");
  const variables = data.value;
  systemInfoDiv.innerHTML = "";

  if (variables.length > 0) {
    for (const v of variables) {
      printDebugSymbol(v);
    }
    addDebugListeners();
  } else {
    systemInfoPrintUnsafe(
      getSummaryHtml(`No values defined at this point - proceed to the next instruction`),
    );
  }

  const pausedAt = document.getElementById(data.pausedAt);
  pausedAt?.classList.add("paused-at");
  pausedAt?.scrollIntoView();
  updateDisplayValues();
}

async function handleRunWorkerSingleStep(data: WebWorkerBreakpointMessage): Promise<void> {
  if (singleStepping) {
    handleRunWorkerPaused(data);
  }
}

async function handleRunWorkerError(data: WebWorkerStatusMessage) {
  infoTabLabel.click();
  runWorker?.terminate();
  runWorker = undefined;
  elanInputOutput.finished();
  const e = data.error;
  const err = e instanceof ElanRuntimeError ? e : new ElanRuntimeError(e as any);
  await showError(err, file.fileName, false);
  file.setRunStatus(RunStatus.error);
  clearPaused();
  updateDisplayValues();
}

function chooser(uploader: (event: Event) => void, noCheck: boolean) {
  return () => {
    if (noCheck || checkForUnsavedChanges(cancelMsg)) {
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

function getImporter() {
  // The `showOpenFilePicker()` method of the File System Access API is supported.
  return useChromeFileAPI() ? handleChromeImport : handleImport;
}

async function readAndParse(rawCode: string, fileName: string, mode: ParseMode) {
  const reset = mode === ParseMode.loadNew;
  const code = new CodeSourceFromString(rawCode);
  code.mode = mode;
  file.fileName = fileName;
  try {
    await file.parseFrom(code);
    if (file.parseError) {
      throw new Error(file.parseError);
    }
    await initialDisplay(reset);
  } catch (e) {
    await showError(e as Error, fileName, reset);
  }
}

async function handleChromeUploadOrAppend(mode: ParseMode) {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      startIn: "documents",
      types: [{ accept: { "text/elan": ".elan" } }],
      id: lastDirId,
    });
    const codeFile = await fileHandle.getFile();
    const fileName = mode === ParseMode.loadNew ? codeFile.name : file.fileName;
    const rawCode = await codeFile.text();
    if (mode === ParseMode.loadNew) {
      file = new FileImpl(hash, profile, userName, transforms(), stdlib);
      clearUndoRedoAndAutoSave();
    }
    await readAndParse(rawCode, fileName, mode);
  } catch (_e) {
    // user cancelled
    return;
  }
}

async function handleChromeUpload() {
  await handleChromeUploadOrAppend(ParseMode.loadNew);
}

async function handleChromeAppend() {
  await handleChromeUploadOrAppend(ParseMode.append);
}

async function handleChromeImport() {
  await handleChromeUploadOrAppend(ParseMode.import);
}

function cursorWait() {
  document.body.style.cursor = "wait";
}

function cursorDefault() {
  document.body.style.cursor = "default";
}

async function handleUploadOrAppend(event: Event, mode: ParseMode) {
  const elanFile = (event.target as any).files?.[0] as any;

  if (elanFile) {
    const fileName = mode === ParseMode.loadNew ? elanFile.name : file.fileName;
    cursorWait();
    await clearDisplays();
    const reader = new FileReader();
    reader.addEventListener("load", async (event: any) => {
      const rawCode = event.target.result;
      if ((mode = ParseMode.loadNew)) {
        file = new FileImpl(hash, profile, userName, transforms(), stdlib);
        clearUndoRedoAndAutoSave();
      }
      await readAndParse(rawCode, fileName, mode);
    });
    reader.readAsText(elanFile);
  }

  event.preventDefault();
}

async function handleUpload(event: Event) {
  await handleUploadOrAppend(event, ParseMode.loadNew);
}

async function handleAppend(event: Event) {
  await handleUploadOrAppend(event, ParseMode.append);
}

async function handleImport(event: Event) {
  await handleUploadOrAppend(event, ParseMode.import);
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

async function chromeSave(code: string, updateName: boolean, newName?: string) {
  const name = newName ?? file.fileName;
  const html = name.endsWith(".html");

  const fh = await showSaveFilePicker({
    suggestedName: name,
    startIn: "documents",
    types: html ? [{ accept: { "text/html": ".html" } }] : [{ accept: { "text/elan": ".elan" } }],
    id: lastDirId,
  });

  if (updateName) {
    file.fileName = fh.name;
  }

  const writeable = await fh.createWritable();
  await writeable.write(code);
  await writeable.close();
  return fh;
}

async function handleChromeDownload(event: Event) {
  const code = await file.renderAsSource();

  try {
    await chromeSave(code, true);

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
    autoSaveFileHandle = await chromeSave(code, true);
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
      if (code.trim() === "") {
        // should never write empty file - always at least header
        throw new Error("Error with empty code file");
      }

      const writeable = await autoSaveFileHandle.createWritable();
      await writeable.write(code);
      await writeable.close();
      lastSavedHash = file.currentHash;
      updateNameAndSavedStatus();
    } catch (e) {
      const reason = (e as Error).message ?? "Unknown";
      const msg = `Auto-save failed. Auto-save mode has been cancelled - please save the file manually to ensure your changes are not lost! Reason: ${reason}`;
      alert(msg);
      autoSaveFileHandle = undefined;
      console.debug(`Autosave failed: error: ${e} code: ${code}`);
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
  systemInfoPrintSafe("Tests timed out and were aborted");
  updateDisplayValues();
}

let testTimer: any = undefined;

function cancelTestTimeout() {
  clearInterval(testTimer);
  testTimer = undefined;
}

async function runTests() {
  // if already running cancel and restart
  endTests();
  await runTestsInner();

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

async function runTestsInner() {
  try {
    await clearDisplays();
    file.setTestStatus(TestStatus.running);

    updateDisplayValues();
    const path = `${document.location.origin}${document.location.pathname}`.replace(
      "/index.html",
      "",
    );
    const jsCode = file.compileAsTestWorker(path);
    const asUrl = encodeCode(jsCode);

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

if (!isElanProduction) {
  const testLink = document.createElement("a");
  testLink.classList.add("menu-item", "help-file");
  testLink.href = "documentation/worksheets/worksheet-test-only.html";
  testLink.target = "worksheet-iframe";
  testLink.innerText = "Test Worksheet";

  document.querySelector("#worksheet-tab .dropdown-content")?.append(testLink);
}

const globalKeys = [
  "b",
  "B",
  "d",
  "D",
  "e",
  "E",
  "g",
  "G",
  "h",
  "H",
  "i",
  "I",
  "k",
  "K",
  "r",
  "R",
  "s",
  "S",
  "u",
  "U",
  "+",
  "-",
  "=",
];

function isGlobalKeyboardEvent(kp: Event) {
  return kp instanceof KeyboardEvent && (kp.ctrlKey || kp.metaKey) && globalKeys.includes(kp.key);
}

function globalHandler(kp: KeyboardEvent) {
  // don't check kp instanceof keyboardEvent here or control keys on the help iframe are not picked up
  if (kp.ctrlKey || kp.metaKey) {
    switch (kp.key) {
      case "b":
      case "B":
        removeFocussedClassFromAllTabs();
        if (isRunningState()) {
          clearDisplayButton.focus();
        } else {
          demosButton.focus();
        }
        kp.preventDefault();
        break;
      case "d":
      case "D":
        displayTabLabel.click();
        kp.preventDefault();
        break;
      case "e":
      case "E":
        codeContainer.click();
        kp.preventDefault();
        break;
      case "g":
      case "G":
        runDebugButton.click();
        kp.preventDefault();
        break;
      case "h":
      case "H":
        helpTabLabel.click();
        kp.preventDefault();
        break;
      case "i":
      case "I":
        infoTabLabel.click();
        kp.preventDefault();
        break;
      case "k":
      case "K":
        worksheetTabLabel.click();
        kp.preventDefault();
        break;
      case "p":
      case "P":
        stepButton.click();
        kp.preventDefault();
        break;
      case "r":
      case "R":
        runButton.click();
        kp.preventDefault();
        break;
      case "s":
      case "S":
        stopButton.click();
        kp.preventDefault();
        break;
      case "u":
      case "U":
        pauseButton.click();
        kp.preventDefault();
        break;
    }
  }
}

window.addEventListener("keydown", globalHandler);

function collapseMenu(button: HTMLElement, andFocus: boolean) {
  if (andFocus) {
    button.focus();
  }
  const menuId = button.getAttribute("aria-controls")!;
  document.getElementById(menuId)!.hidden = true;
  button.setAttribute("aria-expanded", "false");
}

function collapseAllMenus() {
  const allDropDowns = document.querySelectorAll(
    "button[aria-haspopup='true']",
  ) as NodeListOf<HTMLElement>;

  for (const e of allDropDowns) {
    collapseMenu(e, false);
  }
}

function handleClickDropDownButton(event: Event) {
  removeFocussedClassFromAllTabs();
  const button = event.target as HTMLButtonElement;
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  const menuId = button.getAttribute("aria-controls")!;
  const menu = document.getElementById(menuId)!;
  button.setAttribute("aria-expanded", `${!isExpanded}`);
  menu.hidden = isExpanded;

  const allDropDowns = document.querySelectorAll(
    "button[aria-haspopup='true']",
  ) as NodeListOf<HTMLElement>;

  for (const e of allDropDowns) {
    if (e.id !== button.id) {
      collapseMenu(e, false);
    }
  }

  const firstitem = menu.querySelector(".menu-item") as HTMLElement;
  firstitem.focus();

  event.stopPropagation();
}

demosButton.addEventListener("click", handleClickDropDownButton);
fileButton.addEventListener("click", handleClickDropDownButton);
standardWorksheetButton.addEventListener("click", handleClickDropDownButton);

function handleKeyDropDownButton(event: KeyboardEvent) {
  removeFocussedClassFromAllTabs();
  const button = event.target as HTMLButtonElement;
  const menuId = button.getAttribute("aria-controls")!;
  const menu = document.getElementById(menuId)!;
  if (event.key === "ArrowDown") {
    const firstitem = menu.querySelector(".menu-item") as HTMLElement;
    firstitem.focus();
  } else if (event.key === "Escape") {
    collapseMenu(button, true);
  }
}

demosButton.addEventListener("keydown", handleKeyDropDownButton);
fileButton.addEventListener("keydown", handleKeyDropDownButton);
standardWorksheetButton.addEventListener("keydown", handleKeyDropDownButton);

function handleMenuArrowUp() {
  const focusedItem = document.activeElement as HTMLElement;

  let previousItem = focusedItem;

  do {
    previousItem = previousItem?.previousElementSibling as HTMLElement;
    if (previousItem) {
      previousItem.focus();
    }
  } while (previousItem && (previousItem as any).disabled);
}

function handleMenuArrowDown() {
  const focusedItem = document.activeElement as HTMLElement;

  let nextItem: HTMLElement = focusedItem;

  do {
    nextItem = nextItem?.nextElementSibling as HTMLElement;
    if (nextItem) {
      nextItem.focus();
    }
  } while (nextItem && (nextItem as any).disabled);
}

function handleMenuKey(event: KeyboardEvent) {
  removeFocussedClassFromAllTabs();
  const menuItem = event.target as HTMLElement;
  const menu = menuItem.parentElement as HTMLDivElement;
  const button = menu.previousElementSibling as HTMLButtonElement;
  if (event.key === "ArrowUp") {
    handleMenuArrowUp();
  } else if (event.key === "ArrowDown") {
    handleMenuArrowDown();
  } else if (event.key === "Escape") {
    collapseMenu(button, true);
  } else if (event.key === "Enter" || event.key === "Space") {
    const focusedItem = document.activeElement as HTMLElement;
    focusedItem?.click();
    setTimeout(() => {
      collapseMenu(button, false);
    }, 1);
  }
}

demosMenu.addEventListener("keydown", handleMenuKey);
fileMenu.addEventListener("keydown", handleMenuKey);
worksheetMenu.addEventListener("keydown", handleMenuKey);

demosMenu.addEventListener("click", () => collapseMenu(demosButton, false));
fileMenu.addEventListener("click", () => collapseMenu(fileButton, false));
worksheetMenu.addEventListener("click", () => collapseMenu(standardWorksheetButton, false));

displayTab?.addEventListener("click", () => showDisplayTab());
infoTab?.addEventListener("click", () => showInfoTab());
helpTab?.addEventListener("click", () => showHelpTab());
worksheetTab?.addEventListener("click", () => showWorksheetTab());
worksheetIFrame?.contentWindow?.addEventListener("click", () => showWorksheetTab());
helpIFrame?.contentWindow?.addEventListener("click", () => showHelpTab());

window.addEventListener("click", () => collapseAllMenus());

window.addEventListener("message", async (m) => {
  if (m.data && typeof m.data === "string" && m.data.endsWith(".elan")) {
    await loadDemoFile(m.data);
  }
});

/* eslint-disable @typescript-eslint/no-explicit-any */

import { DebugSymbol } from "../../compiler/compiler-interfaces/debug-symbol";
import { ElanRuntimeError } from "../../compiler/standard-library/elan-runtime-error";
import { StdLib } from "../../compiler/standard-library/std-lib";
import { TestStatus } from "../../compiler/test-status";
import { isElanProduction } from "../../environment";
import {
  cannotLoadUnparseableFile,
  CodeSourceFromString,
  fileErrorPrefix,
  FileImpl,
  parseErrorPrefix,
} from "../frames/file-impl";
import { CodeSource } from "../frames/frame-interfaces/code-source";
import { editorEvent, toDebugString } from "../frames/frame-interfaces/editor-event";
import { File, ParseMode } from "../frames/frame-interfaces/file";
import { Profile } from "../frames/frame-interfaces/profile";
import { Group, Individual } from "../frames/frame-interfaces/user-config";
import { CompileStatus, ParseStatus, RunStatus } from "../frames/status-enums";
import { StubInputOutput } from "../stub-input-output";
import { handleClick, handleDblClick, handleKey } from "./editorHandlers";
import { FileManager } from "./file-manager";
import { getDebugSymbol, getSummaryHtml, ProgramRunner } from "./program-runner";
import { TestRunner } from "./test-runner";
import {
  cancelMsg,
  checkIsChrome,
  confirmContinueOnNonChromeBrowser,
  delayMessage,
  globalKeys,
  IIDEViewModel,
  internalErrorMsg,
  parentId,
  warningOrError,
} from "./ui-helpers";
import {
  fetchDefaultProfile,
  fetchProfile,
  fetchUserConfig,
  hash,
  sanitiseHtml,
  transforms,
} from "./web-helpers";
import { WebInputOutput } from "./web-input-output";

// static html elements
const codeContainer = document.querySelector(".elan-code") as HTMLDivElement;
const runButton = document.getElementById("run-button") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const expandCollapseButton = document.getElementById("expand-collapse") as HTMLButtonElement;
const newButton = document.getElementById("new") as HTMLDivElement;
const demosButton = document.getElementById("demos") as HTMLButtonElement;
const demosMenu = document.getElementById("demos-menu") as HTMLDivElement;
const fileMenu = document.getElementById("file-menu") as HTMLDivElement;
const worksheetMenu = document.getElementById("worksheet-menu") as HTMLDivElement;

const trimButton = document.getElementById("trim") as HTMLButtonElement;
const loadButton = document.getElementById("load") as HTMLDivElement;
const appendButton = document.getElementById("append") as HTMLDivElement;
const importButton = document.getElementById("import") as HTMLDivElement;
const saveButton = document.getElementById("save") as HTMLDivElement;
const autoSaveButton = document.getElementById("auto-save") as HTMLDivElement;
const undoButton = document.getElementById("undo") as HTMLButtonElement;
const redoButton = document.getElementById("redo") as HTMLButtonElement;
const fileButton = document.getElementById("file") as HTMLButtonElement;
const logoutButton = document.getElementById("logout") as HTMLButtonElement;
const saveAsStandaloneButton = document.getElementById("save-as-standalone") as HTMLDivElement;
const preferencesButton = document.getElementById("preferences") as HTMLDivElement;

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

let profile: Profile;
let userName: string | undefined;

let inactivityTimer: any | undefined = undefined;

let lastDOMEvent: Event | undefined;
let lastEditorEvent: editorEvent | undefined;
let errorDOMEvent: Event | undefined;
let errorEditorEvent: editorEvent | undefined;
let errorStack: string | undefined;

class EditorViewModel {
  file?: File = undefined;

  get fileName() {
    return this.file!.fileName;
  }

  set fileName(fn: string) {
    this.file!.fileName = fn;
  }

  setRunStatus(s: RunStatus) {
    this.file?.setRunStatus(s);
  }

  getRunStatusLabel() {
    return this.file!.getRunStatusLabel();
  }
  getRunStatusColour() {
    return this.file!.getRunStatusColour();
  }
  readParseStatus() {
    return this.file!.readParseStatus();
  }
  readCompileStatus() {
    return this.file!.readCompileStatus();
  }
  readRunStatus() {
    return this.file!.readRunStatus();
  }
  readTestStatus() {
    return this.file!.readTestStatus();
  }

  setTestStatus(ts: TestStatus) {
    this.file!.setTestStatus(ts);
  }

  getParseStatusColour() {
    return this.file!.getParseStatusColour();
  }
  getParseStatusLabel() {
    return this.file!.getParseStatusLabel();
  }
  getCompileStatusColour() {
    return this.file!.getCompileStatusColour();
  }
  getCompileStatusLabel() {
    return this.file!.getCompileStatusLabel();
  }
  getTestStatusColour() {
    return this.file!.getTestStatusColour();
  }
  getTestStatusLabel() {
    return this.file!.getTestStatusLabel();
  }

  containsMain() {
    return this.file!.containsMain();
  }

  renderAsHtml() {
    return this.file!.renderAsHtml();
  }

  removeAllSelectorsThatCanBe() {
    this.file!.removeAllSelectorsThatCanBe();
  }

  expandCollapseAll() {
    this.file!.expandCollapseAll();
  }

  getVersionString() {
    return this.file!.getVersionString();
  }

  refreshParseAndCompileStatuses(compileIfParsed: boolean) {
    return this.file!.refreshParseAndCompileStatuses(compileIfParsed);
  }

  get hasTests() {
    return this.file!.hasTests;
  }

  renderAsSource() {
    return this.file!.renderAsSource();
  }

  parseFrom(source: CodeSource) {
    return this.file!.parseFrom(source);
  }

  get parseError() {
    return this.file!.parseError;
  }

  get defaultFileName() {
    return this.file!.defaultFileName;
  }

  getCopiedSource() {
    return this.file!.getCopiedSource();
  }

  getFieldBeingEdited() {
    return this.file!.getFieldBeingEdited();
  }

  getFirstChild() {
    return this.file!.getFirstChild();
  }

  recreateFile() {
    this.file = new FileImpl(hash, profile, userName, transforms(), stdlib);
  }
}

const file = new EditorViewModel();

class IDEViewModel implements IIDEViewModel {
  focusInfoTab() {
    showInfoTab();
    systemInfoDiv.focus();
    systemInfoDiv.classList.add("focussed");
    file.setRunStatus(RunStatus.paused);
    systemInfoDiv.innerHTML = "";
  }

  updateDisplayValues() {
    updateNameAndSavedStatus(fileManager, this);

    // Button control
    const isEmpty = file.readParseStatus() === ParseStatus.default;
    const isParsing = file.readParseStatus() === ParseStatus.valid;
    const isIncomplete = file.readParseStatus() === ParseStatus.incomplete;
    const cs = file.readCompileStatus();
    const isCompiling = cs === CompileStatus.ok || cs === CompileStatus.advisory;
    const isRunning = isRunningState();
    const isPaused = isPausedState();
    let isTestRunning = isTestRunningState();

    if (isTestRunning && !(isParsing || isCompiling)) {
      testRunner.end();
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

      this.setPauseButtonState();

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
      enable(trimButton, "Remove all 'new code' prompts that can be removed (shortcut: Alt+t)");
      enable(expandCollapseButton, "Expand / Collapse all code regions");
      enable(preferencesButton, "Set preferences");
      enable(clearDisplayButton, "Clear display");

      for (const elem of demoFiles) {
        elem.removeAttribute("hidden");
      }

      if (isEmpty) {
        disable([saveButton], "Some code must be added in order to save");
      } else if (!(isParsing || isIncomplete)) {
        disable([saveButton], "Invalid code cannot be saved");
      } else if (fileManager.isAutosaving()) {
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

      if (fileManager.canUndo()) {
        enable(undoButton, "Undo last change (Ctrl+z)");
      } else {
        disable([undoButton], "Nothing to undo");
      }

      if (fileManager.canRedo()) {
        enable(redoButton, "Redo last change (Ctrl+y)");
      } else {
        disable([redoButton], "Nothing to redo");
      }

      if (fileManager.isAutosaving()) {
        autoSaveButton.innerText = "cancel auto save";
        enable(autoSaveButton, "Click to turn auto-save off and resume manual saving.");
      } else {
        if (useChromeFileAPI()) {
          autoSaveButton.innerText = "auto save";
          if (isParsing || isIncomplete) {
            enable(
              autoSaveButton,
              "Save to file now and then auto-save to same file whenever code is changed and is not invalid",
            );
          } else {
            disable([autoSaveButton], "Invalid code cannot be saved");
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

  setPauseButtonState(waitingForUserInput?: boolean) {
    if (
      isRunningState() &&
      programRunner.isDebugMode() &&
      !isPausedState() &&
      !waitingForUserInput
    ) {
      enable(pauseButton, "Pause the program");
    } else {
      disable([pauseButton], "Can only pause a program running in Debug mode");
    }
  }

  toggleInputStatus(rs: RunStatus) {
    file.setRunStatus(rs);
    setStatus(runStatus, file.getRunStatusColour(), file.getRunStatusLabel(), false);
  }

  async clearDisplays() {
    clearSystemDisplay();
    await elanInputOutput.clearDisplay();
  }

  async showError(err: Error, fileName: string, reset: boolean) {
    // because otherwise we will pick up any clicks or edits done after error
    errorDOMEvent = lastDOMEvent;
    errorEditorEvent = lastEditorEvent;

    clearSystemDisplay();
    if (reset) {
      await resetFile();
    }

    file.fileName = fileName;

    if (err.message?.startsWith(fileErrorPrefix)) {
      this.systemInfoPrintSafe(err.message);
    } else if (err.message?.startsWith(parseErrorPrefix)) {
      this.systemInfoPrintSafe(cannotLoadUnparseableFile);
    } else if (err.stack) {
      let msg = "";
      let stack = "";
      if (err instanceof ElanRuntimeError) {
        msg = "A Runtime error occurred in the Elan code";
        stack = err.elanStack;
        this.systemInfoPrintSafe(msg);
        this.systemInfoPrintSafe(stack);
      } else {
        // our message
        systemInfoPrintUnsafe(internalErrorMsg, false);
        errorStack = err.stack;
        document
          .getElementById("bug-report")
          ?.addEventListener("click", () => gatherDebugInfo(fileManager));
      }
    } else {
      this.systemInfoPrintSafe(err.message ?? "Unknown error parsing file");
    }
    this.updateDisplayValues();
  }

  printDebugInfo(info: DebugSymbol[] | string) {
    if (typeof info === "string") {
      systemInfoPrintUnsafe(
        getSummaryHtml(`No values defined at this point - proceed to the next instruction`),
      );
    } else {
      for (const v of info) {
        printDebugSymbol(v);
      }
      addDebugListeners();
    }
  }

  setPausedAtLocation(location: string) {
    const pausedAt = document.getElementById(location);
    pausedAt?.classList.add("paused-at");
    pausedAt?.scrollIntoView();
    this.updateDisplayValues();
  }

  clickInfoTab() {
    infoTabLabel.click();
  }

  async run(file: File) {
    file.removeAllSelectorsThatCanBe();
    await this.renderAsHtml(false);
    runButton.focus();
    showDisplayTab();
  }

  runDebug() {
    runDebugButton.focus();
    setTimeout(showDisplayTab);
  }

  async renderAsHtml(editingField: boolean) {
    const content = await file.renderAsHtml();
    try {
      await updateContent(content, editingField);
    } catch (e) {
      await this.showError(e as Error, file.fileName, false);
    }
  }

  systemInfoPrintSafe(text: string, scroll = true) {
    // sanitise the text
    text = sanitiseHtml(text);
    systemInfoPrintUnsafe(text, scroll);
  }

  updateFileName(unsaved: string) {
    codeTitle.innerText = `file: ${file.fileName}${unsaved}`;
  }

  async updateFileAndCode(code: string) {
    const fn = file.fileName;
    file.recreateFile();
    await displayCode(code, fn);
  }

  disableUndoRedoButtons(msg: string) {
    disable([undoButton, redoButton], msg);
    cursorWait();
  }
}

const ideViewModel = new IDEViewModel();

const programRunner = new ProgramRunner();

const testRunner = new TestRunner();

const fileManager = new FileManager();

// add all the listeners

undoButton.addEventListener("click", () => fileManager.undo(ideViewModel));

redoButton.addEventListener("click", () => fileManager.redo(ideViewModel));

displayDiv.addEventListener("click", () => {
  displayDiv.getElementsByTagName("input")?.[0]?.focus();
});

trimButton.addEventListener("click", async () => {
  file.removeAllSelectorsThatCanBe();
  await ideViewModel.renderAsHtml(false);
});

logoutButton.addEventListener("click", async () => {
  window.location.reload();
});

addEventListener("beforeunload", (event) => {
  event.preventDefault();
});

runButton?.addEventListener("click", async () => {
  await programRunner.run(file.file!, ideViewModel, elanInputOutput);
});

runDebugButton?.addEventListener("click", async () => {
  await programRunner.runDebug(file.file!, ideViewModel, elanInputOutput);
});

stepButton?.addEventListener("click", () => {
  programRunner.step(file.file!, ideViewModel);
});

pauseButton?.addEventListener("click", () => {
  programRunner.pause();
});

stopButton?.addEventListener("click", () => {
  disable([stopButton, pauseButton, stepButton], "Program is not running");
  // do rest on next event loop for responsivenesss
  setTimeout(() => {
    programRunner.stop(file.file!, ideViewModel, elanInputOutput);
    testRunner.stop(file.file!, ideViewModel);
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
  await ideViewModel.renderAsHtml(false);
});

newButton?.addEventListener("click", async (event: Event) => {
  if (!isDisabled(event)) {
    if (checkForUnsavedChanges(fileManager, cancelMsg)) {
      await ideViewModel.clearDisplays();
      fileManager.reset();
      file.recreateFile();
      await initialDisplay(false);
    }
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
  file.recreateFile();
  file.fileName = fileName;
  fileManager.reset();
  await readAndParse(rawCode, fileName, ParseMode.loadNew);
}

saveAsStandaloneButton.addEventListener("click", async (event: Event) => {
  if (!isDisabled(event)) {
    await fileManager.saveAsStandAlone(file.file!);
  }
});

for (const elem of demoFiles) {
  elem.addEventListener("click", async () => {
    if (checkForUnsavedChanges(fileManager, cancelMsg)) {
      const fileName = `${elem.id}`;
      await loadDemoFile(fileName);
    }
  });
}

preferencesButton.addEventListener("click", (event: Event) => {
  if (isDisabled(event)) {
    return;
  }

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

function checkForUnsavedChanges(fm: FileManager, msg: string): boolean {
  return fm.hasUnsavedChanges(file.file!) ? confirm(msg) : true;
}

async function setup(p: Profile) {
  fileManager.reset();
  profile = p;

  file.recreateFile();
  await displayFile();
}

function clearSystemDisplay() {
  systemInfoDiv.innerHTML = "";
}

async function resetFile() {
  file.recreateFile();
  await initialDisplay(false);
}

function domEventType(evt: Event | undefined) {
  return evt
    ? `DOMEvent: {
type: ${evt.type},
}`
    : "no DOM event recorded";
}

async function gatherDebugInfo(fm: FileManager) {
  const elanVersion = file.getVersionString();
  const now = new Date().toLocaleString();
  const body = document.getElementsByTagName("body")[0].innerHTML;
  const code = fm.getLastCodeVersion();
  const lde = domEventType(errorDOMEvent);
  const lee = toDebugString(errorEditorEvent);
  const es = errorStack ?? "no stack recorded";

  const all = `${elanVersion}\n${now}\n${body}\n${code}\n${lde}\n${lee}\n${es}`;

  await navigator.clipboard.writeText(all);
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
    const cs = file.readCompileStatus();
    if ((cs === CompileStatus.ok || cs === CompileStatus.advisory) && file.hasTests) {
      await testRunner.run(file.file!, ideViewModel);
    }
    await ideViewModel.renderAsHtml(editingField);
  } catch (e) {
    await ideViewModel.showError(e as Error, file.fileName, false);
  }
}

async function initialDisplay(reset: boolean) {
  await ideViewModel.clearDisplays();

  const ps = file.readParseStatus();
  if (ps === ParseStatus.valid || ps === ParseStatus.default || ps === ParseStatus.incomplete) {
    await refreshAndDisplay(false, false);
    fileManager.updateHash(file.file!);
    updateNameAndSavedStatus(fileManager, ideViewModel);
    if (reset) {
      const code = await file.renderAsSource();
      worksheetIFrame.contentWindow?.postMessage(`code:reset:${code}`, "*");
    }
  } else {
    const msg = file.parseError || "Failed load code";
    await ideViewModel.showError(new Error(msg), file.fileName, reset);
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
    await ideViewModel.showError(e as Error, fileName || file.defaultFileName, true);
  }
}

async function displayFile() {
  await initialDisplay(true);
}

function getModKey(e: KeyboardEvent | MouseEvent) {
  return { control: e.ctrlKey || e.metaKey, shift: e.shiftKey, alt: e.altKey };
}

function updateNameAndSavedStatus(fm: FileManager, vm: IIDEViewModel) {
  const unsaved = fm.hasUnsavedChanges(file.file!) ? " UNSAVED" : "";
  vm.updateFileName(unsaved);
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

function disable(buttons: HTMLElement[], msg = "") {
  for (const button of buttons) {
    button.setAttribute("disabled", "");
    button.setAttribute("title", msg);
    if (button instanceof HTMLDivElement) {
      button.classList.add("disabled");
    }
  }
}

function enable(button: HTMLElement, msg = "") {
  button.removeAttribute("disabled");
  button.setAttribute("title", msg);
  if (button instanceof HTMLDivElement) {
    button.classList.remove("disabled");
  }
}

function getEditorMsg(
  type: "key" | "click" | "dblclick" | "paste" | "contextmenu",
  target: "frame",
  id: string | undefined,
  key: string | undefined,
  modKey: { control: boolean; shift: boolean; alt: boolean },
  selection: [number, number] | undefined,
  command: string | undefined,
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
        command: command,
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
        command: command,
        optionalData: optionalData,
      };
  }
}

function handlePaste(event: Event, target: HTMLElement, msg: editorEvent): boolean {
  // outside of handler or selection is gone
  const start = target instanceof HTMLInputElement ? (target.selectionStart ?? 0) : 0;
  const end = target instanceof HTMLInputElement ? (target.selectionEnd ?? 0) : 0;
  target.addEventListener("paste", async (event: ClipboardEvent) => {
    const txt = await navigator.clipboard.readText();
    if (start !== end) {
      await handleEditorEvent(
        event,
        "key",
        "frame",
        { control: false, shift: false, alt: false },
        msg.id,
        "Delete",
        [start, end],
      );
    }
    await handleEditorEvent(
      event,
      "paste",
      "frame",
      { control: true, shift: false, alt: false },
      msg.id,
      "v",
      undefined,
      undefined,
      `${txt.trim()}`,
    );
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

function handleCopy(event: Event, target: HTMLInputElement) {
  target.addEventListener("copy", async (_event: ClipboardEvent) => {
    const txt = document.getSelection()?.toString() ?? "";
    await navigator.clipboard.writeText(txt);
  });
  event.stopPropagation();
  return true;
}

function handleCutAndPaste(event: Event, msg: editorEvent) {
  if (msg.type === "paste") {
    return false;
  }

  if (msg.modKey.control && msg.key === "v") {
    return handlePaste(event, event.target as HTMLElement, msg);
  }

  if (event.target instanceof HTMLInputElement && msg.modKey.control) {
    switch (msg.key) {
      case "x":
        return handleCut(event, event.target, msg);
      case "c":
        return handleCopy(event, event.target);
    }
  }

  return false;
}

async function collapseContextMenu() {
  const items = document.querySelectorAll(".context-menu-item") as NodeListOf<HTMLDivElement>;

  if (items.length > 0) {
    const id = items[0].dataset.id;
    const mk = { control: false, shift: false, alt: false };
    const msg = getEditorMsg("key", "frame", id, "Escape", mk, undefined, undefined, undefined);
    await handleKeyAndRender(msg);
  }
}

async function handleEscape(e: editorEvent) {
  if (e.key === "Escape") {
    await collapseContextMenu();
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
        await fileManager.undo(ideViewModel);
        return true;
      case "y":
        event.stopPropagation();
        await fileManager.redo(ideViewModel);
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
  command?: string | undefined,
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

  const msg = getEditorMsg(type, target, id, key, modKey, selection, command, optionalData);

  // save last editor event for debug
  lastEditorEvent = msg;

  if (!isSupportedKey(msg)) {
    // discard
    return;
  }

  if (isTestRunningState()) {
    testRunner.end();
    file.setTestStatus(TestStatus.default);
    console.info("tests cancelled in handleEditorEvent");
  }

  if (await handleEscape(msg)) {
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
      item.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const ke = event as PointerEvent | KeyboardEvent;
        const tgt = ke.target as HTMLDivElement;
        const id = tgt.dataset.id;
        const func = tgt.dataset.func;
        const txt = await navigator.clipboard.readText();
        handleEditorEvent(
          event,
          "contextmenu",
          "frame",
          getModKey(ke),
          id,
          "ContextMenu",
          undefined,
          func,
          `${txt.trim()}`,
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

  const copiedSource = file.getCopiedSource();

  if (copiedSource.length > 0) {
    let allCode = "";

    for (const code of copiedSource) {
      if (allCode) {
        allCode = allCode + "\n" + code;
      } else {
        allCode = code;
      }
    }

    await navigator.clipboard.writeText(allCode);
  }

  await fileManager.save(file.file!, focused, editingField, ideViewModel);
  ideViewModel.updateDisplayValues();

  if (!isElanProduction) {
    const dbgFocused = document.querySelectorAll(".focused");
    //debug check
    if (dbgFocused.length > 1) {
      let msg = "multiple focused ";
      dbgFocused.forEach((n) => (msg = `${msg}, Node: ${(n.nodeName, n.id)} `));
      await ideViewModel.showError(new Error(msg), file.fileName, false);
    }
  }

  cursorDefault();
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
        if (handleClick(e, file.file!) && isBeingEdited) {
          await refreshAndDisplay(false, false);
        } else {
          await ideViewModel.renderAsHtml(false);
        }
        return;
      case "dblclick":
        isBeingEdited = file.getFieldBeingEdited(); //peek at value as may be changed
        if (handleDblClick(e, file.file!) && isBeingEdited) {
          await refreshAndDisplay(false, false);
        } else {
          await ideViewModel.renderAsHtml(false);
        }
        return;
      case "paste":
      case "key":
        if (purgingKeys) {
          return;
        }
        const before = Date.now();
        codeChanged = handleKey(e, file.file!);
        const after = Date.now();
        const delay = after - before;
        if (codeChanged === true) {
          if (delay >= 1000) {
            alert(delayMessage);
            e.key = "Backspace";
            handleKey(e, file.file!);
            setTimeout(() => (purgingKeys = false), 500);
            purgingKeys = true;
          }
          const singleKeyEdit = !(e.modKey.control || e.modKey.shift || e.modKey.alt);
          await refreshAndDisplay(false, singleKeyEdit);
        } else if (codeChanged === false) {
          await ideViewModel.renderAsHtml(false);
        }
        // undefined just return
        return;
      case "contextmenu":
        codeChanged = handleKey(e, file.file!);
        if (codeChanged) {
          await refreshAndDisplay(true, false);
        } else {
          await ideViewModel.renderAsHtml(false);
        }
        return;
    }
  } catch (e) {
    await ideViewModel.showError(e as Error, file.fileName, false);
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

function chooser(uploader: (event: Event) => void, noCheck: boolean) {
  return () => {
    if (noCheck || checkForUnsavedChanges(fileManager, cancelMsg)) {
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
    await ideViewModel.showError(e as Error, fileName, reset);
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
      file.recreateFile();
      fileManager.reset();
    }
    await readAndParse(rawCode, fileName, mode);
  } catch (_e) {
    // user cancelled
    return;
  }
}

async function handleChromeUpload(event: Event) {
  if (!isDisabled(event)) {
    await handleChromeUploadOrAppend(ParseMode.loadNew);
  }
}

async function handleChromeAppend(event: Event) {
  if (!isDisabled(event)) {
    await handleChromeUploadOrAppend(ParseMode.append);
  }
}

async function handleChromeImport(event: Event) {
  if (!isDisabled(event)) {
    await handleChromeUploadOrAppend(ParseMode.import);
  }
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
    await ideViewModel.clearDisplays();
    const reader = new FileReader();
    reader.addEventListener("load", async (event: any) => {
      const rawCode = event.target.result;
      if ((mode = ParseMode.loadNew)) {
        file.recreateFile();
        fileManager.reset();
      }
      await readAndParse(rawCode, fileName, mode);
    });
    reader.readAsText(elanFile);
  }

  event.preventDefault();
}

async function handleUpload(event: Event) {
  if (!isDisabled(event)) {
    await handleUploadOrAppend(event, ParseMode.loadNew);
  }
}

async function handleAppend(event: Event) {
  if (!isDisabled(event)) {
    await handleUploadOrAppend(event, ParseMode.append);
  }
}

async function handleImport(event: Event) {
  if (!isDisabled(event)) {
    await handleUploadOrAppend(event, ParseMode.import);
  }
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
  if (!isDisabled(event)) {
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
    fileManager.resetHash(file.file!);
    event.preventDefault();
    await ideViewModel.renderAsHtml(false);
  }
}

function isDisabled(evt: Event) {
  if (evt.target instanceof HTMLDivElement && evt.target.classList.contains("disabled")) {
    evt.preventDefault();
    evt.stopPropagation();
    return true;
  }
  return false;
}

async function handleChromeDownload(event: Event) {
  if (!isDisabled(event)) {
    try {
      await fileManager.doDownLoad(file.file!, ideViewModel);
    } catch (_e) {
      // user cancelled
      return;
    } finally {
      event.preventDefault();
    }
  }
}

async function handleChromeAutoSave(event: Event) {
  if (!isDisabled(event)) {
    try {
      await fileManager.doAutoSave(file.file!, ideViewModel);
    } catch (_e) {
      // user cancelled
      return;
    } finally {
      event.preventDefault();
    }
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

async function handleMenuKey(event: KeyboardEvent) {
  removeFocussedClassFromAllTabs();
  const menuItem = event.target as HTMLElement;
  const menu = menuItem.parentElement as HTMLDivElement;
  const button = menu.previousElementSibling as HTMLButtonElement;
  if (event.key === "ArrowUp") {
    handleMenuArrowUp();
  } else if (event.key === "ArrowDown") {
    handleMenuArrowDown();
  } else if (event.key === "Escape") {
    await collapseContextMenu();
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

window.addEventListener("click", () => {
  collapseContextMenu();
  collapseAllMenus();
});

window.addEventListener("message", async (m) => {
  if (m.data && typeof m.data === "string") {
    if (m.data.startsWith("code:")) {
      const code = m.data.slice(5);
      file.recreateFile();
      fileManager.reset();
      await readAndParse(code, file.fileName, ParseMode.loadNew);
    }

    if (m.data.startsWith("help:")) {
      const link = m.data.slice(5);
      const helpLink = document.createElement("a");
      helpLink.href = `documentation/${link}`;
      helpLink.target = "help-iframe";
      helpLink.click();
      helpTab?.click();
    }

    if (m.data.startsWith("snapshot:")) {
      const id = m.data.slice(9);
      const code = await file.renderAsSource();
      worksheetIFrame.contentWindow?.postMessage(`code:${id}:${code}`, "*");
    }

    if (m.data.startsWith("filename:")) {
      const name = m.data.slice(9);
      file.fileName = name;
      updateNameAndSavedStatus(fileManager, ideViewModel);
    }
  }
});

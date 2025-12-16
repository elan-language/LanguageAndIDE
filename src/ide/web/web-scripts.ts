/* eslint-disable @typescript-eslint/no-explicit-any */

import { DebugSymbol } from "../../compiler/compiler-interfaces/debug-symbol";
import { ElanRuntimeError } from "../../compiler/standard-library/elan-runtime-error";
import { TestStatus } from "../../compiler/test-status";
import { isElanProduction } from "../../environment";
import { cannotLoadUnparseableFile, fileErrorPrefix, parseErrorPrefix } from "../frames/file-impl";
import { editorEvent, toDebugString } from "../frames/frame-interfaces/editor-event";
import { ParseMode } from "../frames/frame-interfaces/file";
import { Profile } from "../frames/frame-interfaces/profile";
import { Group, Individual } from "../frames/frame-interfaces/user-config";
import { CompileStatus, ParseStatus, RunStatus } from "../frames/status-enums";
import { CodeEditorViewModel } from "./code-editor-view-model";
import { FileManager } from "./file-manager";
import { getDebugSymbol, getSummaryHtml, ProgramRunner } from "./program-runner";
import { TestRunner } from "./test-runner";
import {
  cancelMsg,
  checkIsChrome,
  collapseAllMenus,
  collapseMenu,
  confirmContinueOnNonChromeBrowser,
  getFocused,
  handleClickDropDownButton,
  handleKeyDropDownButton,
  handleMenuArrowDown,
  handleMenuArrowUp,
  handleMenuKey,
  ICodeEditorViewModel,
  IIDEViewModel,
  internalErrorMsg,
  isDisabled,
  ITabViewModel,
  lastDirId,
  parentId,
  removeFocussedClassFromAllTabs,
  setTabToFocussedAndSelected,
  warningOrError,
} from "./ui-helpers";
import { fetchDefaultProfile, fetchProfile, fetchUserConfig, sanitiseHtml } from "./web-helpers";
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

const elanInputOutput = new WebInputOutput();

let profile: Profile;
let userName: string | undefined;

let errorDOMEvent: Event | undefined;
let errorEditorEvent: editorEvent | undefined;
let errorStack: string | undefined;

class TabViewModel implements ITabViewModel {
  showDisplayTab() {
    const tabName = "display-tab";
    setTabToFocussedAndSelected(tabName);
    (document.querySelector("#printed-text input") as HTMLInputElement | undefined)?.focus();
  }

  showInfoTab() {
    const tabName = "info-tab";
    setTabToFocussedAndSelected(tabName);
  }

  showHelpTab() {
    const tabName = "help-tab";
    setTabToFocussedAndSelected(tabName);
    helpIFrame.focus();
    helpIFrame.contentWindow?.addEventListener("keydown", ideViewModel.globalHandler);
  }

  showWorksheetTab() {
    const tabName = "worksheet-tab";
    setTabToFocussedAndSelected(tabName);
    if (worksheetLoaded) {
      worksheetIFrame.focus();
      worksheetIFrame.contentWindow?.postMessage("hasFocus", "*");
    } else {
      standardWorksheetButton.focus();
    }
  }

  focusInfoTab(cvm: ICodeEditorViewModel) {
    this.showInfoTab();
    systemInfoDiv.focus();
    systemInfoDiv.classList.add("focussed");
    cvm.setRunStatus(RunStatus.paused);
    systemInfoDiv.innerHTML = "";
  }
}

class IDEViewModel implements IIDEViewModel {
  constructor(public readonly tvm: ITabViewModel) {}

  updateNameAndSavedStatus(cvm: ICodeEditorViewModel, fm: FileManager) {
    const unsaved = fm.hasUnsavedChanges(cvm) ? " UNSAVED" : "";
    this.updateFileName(unsaved);
  }

  updateDisplayValues(cvm: ICodeEditorViewModel) {
    this.updateNameAndSavedStatus(cvm, fileManager);

    // Button control
    const isEmpty = cvm.readParseStatus() === ParseStatus.default;
    const isParsing = cvm.readParseStatus() === ParseStatus.valid;
    const isIncomplete = cvm.readParseStatus() === ParseStatus.incomplete;
    const cs = cvm.readCompileStatus();
    const isCompiling = cs === CompileStatus.ok || cs === CompileStatus.advisory;
    const isRunning = cvm.isRunningState();
    const isPaused = cvm.isPausedState();
    let isTestRunning = cvm.isTestRunningState();

    if (isTestRunning && !(isParsing || isCompiling)) {
      testRunner.end();
      cvm.setTestStatus(TestStatus.default);
      isTestRunning = false;
      console.info("tests cancelled in updateDisplayValues");
    }

    setStatus(parseStatus, cvm.getParseStatusColour(), cvm.getParseStatusLabel());
    setStatus(compileStatus, cvm.getCompileStatusColour(), cvm.getCompileStatusLabel());
    setStatus(testStatus, cvm.getTestStatusColour(), cvm.getTestStatusLabel());
    setStatus(runStatus, cvm.getRunStatusColour(), cvm.getRunStatusLabel(), false);

    if (isRunning || isTestRunning) {
      codeContainer?.classList.add("running");

      if (isPaused) {
        this.enable(runDebugButton, "Resume the program");
        this.enable(stepButton, "Single step the program");
      } else {
        this.disable(
          [runButton, runDebugButton, stepButton],
          isRunning ? "Program is already running" : "Tests are running",
        );
      }

      this.enable(stopButton, isRunning ? "Stop the program" : "Stop the Tests");

      this.setPauseButtonState();

      const msg = isRunning ? "Program is running" : "Tests are running";
      this.disable(
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

      this.disable([stopButton, pauseButton, stepButton], "Program is not running");

      this.enable(fileButton, "File actions");
      this.enable(loadButton, "Load code from a file");
      this.enable(appendButton, "Append code from a file onto the end of the existing code");
      this.enable(importButton, "Import code from a file");
      this.enable(newButton, "Clear the current code and start afresh");
      this.enable(demosButton, "Load a demonstration program");
      this.enable(
        trimButton,
        "Remove all 'new code' prompts that can be removed (shortcut: Alt+t)",
      );
      this.enable(expandCollapseButton, "Expand / Collapse all code regions");
      this.enable(preferencesButton, "Set preferences");
      this.enable(clearDisplayButton, "Clear display");

      for (const elem of demoFiles) {
        elem.removeAttribute("hidden");
      }

      if (isEmpty) {
        this.disable([saveButton], "Some code must be added in order to save");
      } else if (!(isParsing || isIncomplete)) {
        this.disable([saveButton], "Invalid code cannot be saved");
      } else if (fileManager.isAutosaving()) {
        this.disable([saveButton], "Autosave is enabled- cancel to manual save");
      } else {
        this.enable(saveButton, "Save the code into a file");
      }

      if (!cvm.containsMain()) {
        this.disable(
          [runButton, runDebugButton, saveAsStandaloneButton],
          "Code must have a 'main' routine to be run",
        );
      } else if (!isCompiling) {
        this.disable(
          [runButton, runDebugButton, saveAsStandaloneButton],
          "Program is not yet compiled. If you have just edited a field, press Enter or Tab to complete.",
        );
      } else {
        this.enable(runButton, "Run the program");
        this.enable(runDebugButton, "Debug the program");
        this.enable(saveAsStandaloneButton, "Save the program as a standalone webpage");
      }

      if (fileManager.canUndo()) {
        this.enable(undoButton, "Undo last change (Ctrl+z)");
      } else {
        this.disable([undoButton], "Nothing to undo");
      }

      if (fileManager.canRedo()) {
        this.enable(redoButton, "Redo last change (Ctrl+y)");
      } else {
        this.disable([redoButton], "Nothing to redo");
      }

      if (fileManager.isAutosaving()) {
        autoSaveButton.innerText = "cancel auto save";
        this.enable(autoSaveButton, "Click to turn auto-save off and resume manual saving.");
      } else {
        if (useChromeFileAPI()) {
          autoSaveButton.innerText = "auto save";
          if (isParsing || isIncomplete) {
            this.enable(
              autoSaveButton,
              "Save to file now and then auto-save to same file whenever code is changed and is not invalid",
            );
          } else {
            this.disable([autoSaveButton], "Invalid code cannot be saved");
          }
        } else {
          this.disable([autoSaveButton], "Only available on Chrome");
        }
      }

      if (userName) {
        logoutButton.removeAttribute("hidden");
        this.enable(logoutButton, "Log out");
      } else {
        logoutButton.setAttribute("hidden", "hidden");
      }
    }
  }

  setPauseButtonState(waitingForUserInput?: boolean) {
    if (
      codeViewModel.isRunningState() &&
      programRunner.isDebugMode() &&
      !codeViewModel.isPausedState() &&
      !waitingForUserInput
    ) {
      ideViewModel.enable(pauseButton, "Pause the program");
    } else {
      ideViewModel.disable([pauseButton], "Can only pause a program running in Debug mode");
    }
  }

  toggleInputStatus(rs: RunStatus) {
    codeViewModel.setRunStatus(rs);
    setStatus(
      runStatus,
      codeViewModel.getRunStatusColour(),
      codeViewModel.getRunStatusLabel(),
      false,
    );
  }

  async clearDisplays() {
    clearSystemDisplay();
    await elanInputOutput.clearDisplay();
  }

  async showError(err: Error, fileName: string, reset: boolean) {
    // because otherwise we will pick up any clicks or edits done after error
    errorDOMEvent = codeViewModel.lastDOMEvent;
    errorEditorEvent = codeViewModel.lastEditorEvent;

    clearSystemDisplay();
    if (reset) {
      await codeViewModel.resetFile(fileManager, this, testRunner, profile, userName);
    }

    codeViewModel.fileName = fileName;

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
    this.updateDisplayValues(codeViewModel);
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
    this.updateDisplayValues(codeViewModel);
  }

  clickInfoTab() {
    infoTabLabel.click();
  }

  async run(cvm: ICodeEditorViewModel) {
    cvm.removeAllSelectorsThatCanBe();
    await this.renderAsHtml(false);
    runButton.focus();
    this.tvm.showDisplayTab();
  }

  runDebug() {
    runDebugButton.focus();
    setTimeout(this.tvm.showDisplayTab);
  }

  async renderAsHtml(editingField: boolean) {
    const content = await codeViewModel.renderAsHtml();
    try {
      await updateContent(content, editingField);
    } catch (e) {
      await this.showError(e as Error, codeViewModel.fileName, false);
    }
  }

  systemInfoPrintSafe(text: string, scroll = true) {
    // sanitise the text
    text = sanitiseHtml(text);
    systemInfoPrintUnsafe(text, scroll);
  }

  updateFileName(unsaved: string) {
    codeTitle.innerText = `file: ${codeViewModel.fileName}${unsaved}`;
  }

  async updateFileAndCode(code: string) {
    const fn = codeViewModel.fileName;
    codeViewModel.recreateFile(profile, userName);
    await codeViewModel.displayCode(this, testRunner, code, fn);
  }

  disableUndoRedoButtons(msg: string) {
    this.disable([undoButton, redoButton], msg);
    cursorWait();
  }

  postCodeResetToWorksheet(code: string) {
    worksheetIFrame.contentWindow?.postMessage(`code:reset:${code}`, "*");
  }

  disable(buttons: HTMLElement[], msg = "") {
    for (const button of buttons) {
      button.setAttribute("disabled", "");
      button.setAttribute("title", msg);
      if (button instanceof HTMLDivElement) {
        button.classList.add("disabled");
      }
    }
  }

  enable(button: HTMLElement, msg = "") {
    button.removeAttribute("disabled");
    button.setAttribute("title", msg);
    if (button instanceof HTMLDivElement) {
      button.classList.remove("disabled");
    }
  }

  globalHandler(kp: KeyboardEvent) {
    // don't check kp instanceof keyboardEvent here or control keys on the help iframe are not picked up
    if (kp.ctrlKey || kp.metaKey) {
      switch (kp.key) {
        case "b":
        case "B":
          removeFocussedClassFromAllTabs();
          if (codeViewModel.isRunningState()) {
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

  async handleEscape(e: editorEvent, cvm: CodeEditorViewModel, tr: TestRunner) {
    if (e.key === "Escape") {
      await cvm.collapseContextMenu(this, tr);
      demosButton.focus();
      return true;
    }

    return false;
  }
  async handleStatusClick(event: Event, tag: string, useParent: boolean) {
    const pe = event as PointerEvent;
    const [goto, cls] = warningOrError(pe.target as HTMLDivElement);
    if (goto) {
      const elements = document.getElementsByTagName(tag);
      for (const element of elements) {
        // if we're using the parent id we expect text in el-msg
        if (element.classList.contains(cls) && (!useParent || element.textContent)) {
          const mk = { control: false, shift: false, alt: false };
          const id = useParent ? parentId(element) : element.id;
          await codeViewModel.handleEditorEvent(
            this,
            testRunner,
            fileManager,
            event,
            "click",
            "frame",
            mk,
            id,
          );
          return;
        }
      }
    }
    event.preventDefault();
    event.stopPropagation();
  }
}

const codeViewModel = new CodeEditorViewModel();

const tabViewModel = new TabViewModel();

const ideViewModel = new IDEViewModel(tabViewModel);

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
  codeViewModel.removeAllSelectorsThatCanBe();
  await ideViewModel.renderAsHtml(false);
});

logoutButton.addEventListener("click", async () => {
  window.location.reload();
});

addEventListener("beforeunload", (event) => {
  event.preventDefault();
});

runButton?.addEventListener("click", async () => {
  await programRunner.run(codeViewModel, ideViewModel, elanInputOutput);
});

runDebugButton?.addEventListener("click", async () => {
  await programRunner.runDebug(codeViewModel, ideViewModel, elanInputOutput);
});

stepButton?.addEventListener("click", () => {
  programRunner.step(codeViewModel, ideViewModel);
});

pauseButton?.addEventListener("click", () => {
  programRunner.pause();
});

stopButton?.addEventListener("click", () => {
  ideViewModel.disable([stopButton, pauseButton, stepButton], "Program is not running");
  // do rest on next event loop for responsivenesss
  setTimeout(() => {
    programRunner.stop(codeViewModel, ideViewModel, elanInputOutput);
    testRunner.stop(codeViewModel, ideViewModel);
  }, 1);
});

clearDisplayButton?.addEventListener("click", async () => {
  await elanInputOutput.clearDisplay();
});

clearInfoButton?.addEventListener("click", async () => {
  await elanInputOutput.clearSystemInfo();
});

loadExternalWorksheetButton?.addEventListener("click", async () => {
  await fileManager.openWorksheet();
});

expandCollapseButton?.addEventListener("click", async () => {
  codeViewModel.expandCollapseAll();
  await ideViewModel.renderAsHtml(false);
});

newButton?.addEventListener("click", async (event: Event) => {
  if (!isDisabled(event)) {
    if (checkForUnsavedChanges(fileManager, cancelMsg)) {
      await ideViewModel.clearDisplays();
      fileManager.reset();
      codeViewModel.recreateFile(profile, userName);
      await codeViewModel.initialDisplay(fileManager, ideViewModel, testRunner, false);
    }
  }
});

loadButton.addEventListener("click", chooser(getUploader(), false));

appendButton.addEventListener("click", chooser(getAppender(), true));

importButton.addEventListener("click", chooser(getImporter(), true));

saveButton.addEventListener("click", getDownloader());

autoSaveButton.addEventListener("click", handleChromeAutoSave);

saveAsStandaloneButton.addEventListener("click", async (event: Event) => {
  if (!isDisabled(event)) {
    await fileManager.saveAsStandAlone(codeViewModel);
  }
});

for (const elem of demoFiles) {
  elem.addEventListener("click", async () => {
    if (checkForUnsavedChanges(fileManager, cancelMsg)) {
      const fileName = `${elem.id}`;
      await codeViewModel.loadDemoFile(
        fileName,
        profile,
        userName,
        ideViewModel,
        fileManager,
        testRunner,
      );
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

helpTabLabel.addEventListener("click", tabViewModel.showHelpTab);

helpHomeButton.addEventListener("click", () => {
  window.open("documentation/index.html", "help-iframe")?.focus();
});

helpBackButton.addEventListener("click", () => {
  helpIFrame.contentWindow?.history.back();
});

helpForwardButton.addEventListener("click", () => {
  helpIFrame.contentWindow?.history.forward();
});

displayTabLabel.addEventListener("click", tabViewModel.showDisplayTab);
infoTabLabel.addEventListener("click", tabViewModel.showInfoTab);
worksheetTabLabel.addEventListener("click", tabViewModel.showWorksheetTab);

let worksheetLoaded = false;

worksheetIFrame.addEventListener("load", () => {
  worksheetLoaded = true;
  worksheetIFrame.contentWindow?.addEventListener("keydown", ideViewModel.globalHandler);
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
  helpIFrame.contentWindow?.addEventListener("keydown", ideViewModel.globalHandler);
  helpIFrame.contentWindow?.addEventListener("click", () => tabViewModel.showHelpTab());
});

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
  await ideViewModel.handleStatusClick(event, "el-field", false);
});

parseStatus.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" || event.code === "Space") {
    await ideViewModel.handleStatusClick(event, "el-field", false);
  }
});

compileStatus.addEventListener("click", async (event) => {
  await ideViewModel.handleStatusClick(event, "el-msg", true);
});

compileStatus.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" || event.code === "Space") {
    await ideViewModel.handleStatusClick(event, "el-msg", true);
  }
});

testStatus.addEventListener("click", async (event) => {
  await ideViewModel.handleStatusClick(event, "el-msg", true);
});

testStatus.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" || event.code === "Space") {
    await ideViewModel.handleStatusClick(event, "el-msg", true);
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
  ideViewModel.disable(
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
  return fm.hasUnsavedChanges(codeViewModel) ? confirm(msg) : true;
}

async function setup(p: Profile) {
  fileManager.reset();
  profile = p;

  codeViewModel.recreateFile(profile, userName);
  await codeViewModel.displayFile(fileManager, ideViewModel, testRunner);
}

function clearSystemDisplay() {
  systemInfoDiv.innerHTML = "";
}

function domEventType(evt: Event | undefined) {
  return evt
    ? `DOMEvent: {
type: ${evt.type},
}`
    : "no DOM event recorded";
}

async function gatherDebugInfo(fm: FileManager) {
  const elanVersion = codeViewModel.getVersionString();
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
  tabViewModel.showInfoTab();
}

function getModKey(e: KeyboardEvent | MouseEvent) {
  return { control: e.ctrlKey || e.metaKey, shift: e.shiftKey, alt: e.altKey };
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

/**
 * Render the document
 */
async function updateContent(text: string, editingField: boolean) {
  codeViewModel.setRunStatus(RunStatus.default);
  collapseAllMenus();

  codeContainer!.innerHTML = text;

  const frames = document.querySelectorAll(".elan-code [id]");

  for (const frame of frames) {
    const id = frame.id;

    frame.addEventListener("keydown", (event: Event) => {
      const ke = event as KeyboardEvent;
      codeViewModel.handleEditorEvent(
        ideViewModel,
        testRunner,
        fileManager,
        event,
        "key",
        "frame",
        getModKey(ke),
        id,
        ke.key,
      );
    });

    frame.addEventListener("click", (event) => {
      const pe = event as PointerEvent;
      const selectionStart = (event.target as HTMLInputElement).selectionStart ?? undefined;
      const selectionEnd = (event.target as HTMLInputElement).selectionEnd ?? undefined;

      const selection: [number, number] | undefined =
        selectionStart === undefined ? undefined : [selectionStart, selectionEnd ?? selectionStart];

      codeViewModel.handleEditorEvent(
        ideViewModel,
        testRunner,
        fileManager,
        event,
        "click",
        "frame",
        getModKey(pe),
        id,
        undefined,
        selection,
      );
    });

    frame.addEventListener("mousedown", (event) => {
      // mousedown rather than click as click does not seem to pick up shift/ctrl click
      const me = event as MouseEvent;
      if (me.button === 0 && me.shiftKey) {
        // left button only
        codeViewModel.handleEditorEvent(
          ideViewModel,
          testRunner,
          fileManager,
          event,
          "click",
          "frame",
          getModKey(me),
          id,
        );
      }
    });

    frame.addEventListener("mousemove", (event) => {
      event.preventDefault();
    });

    frame.addEventListener("dblclick", (event) => {
      const ke = event as KeyboardEvent;
      codeViewModel.handleEditorEvent(
        ideViewModel,
        testRunner,
        fileManager,
        event,
        "dblclick",
        "frame",
        getModKey(ke),
        id,
      );
    });

    frame.addEventListener("contextmenu", (event) => {
      const mk = { control: false, shift: false, alt: false };
      codeViewModel.handleEditorEvent(
        ideViewModel,
        testRunner,
        fileManager,
        event,
        "contextmenu",
        "frame",
        mk,
        id,
      );
      event.preventDefault();
    });
  }

  function getInput() {
    return document.querySelector(".focused input") as HTMLInputElement;
  }

  const input = getInput();
  const focused = getFocused();

  codeContainer?.addEventListener("click", (event) => {
    if (codeViewModel.isRunningState()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    codeViewModel.showCode();
  });

  codeContainer.addEventListener("mousedown", (event) => {
    // to prevent codeContainer taking focus on a click
    if (codeViewModel.isRunningState()) {
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
        codeViewModel.handleEditorEvent(
          ideViewModel,
          testRunner,
          fileManager,

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

        codeViewModel.handleEditorEvent(
          ideViewModel,
          testRunner,
          fileManager,
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

        codeViewModel.handleEditorEvent(
          ideViewModel,
          testRunner,
          fileManager,
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

  const copiedSource = codeViewModel.getCopiedSource();

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

  await fileManager.save(codeViewModel, focused, editingField, ideViewModel);
  ideViewModel.updateDisplayValues(codeViewModel);

  if (!isElanProduction) {
    const dbgFocused = document.querySelectorAll(".focused");
    //debug check
    if (dbgFocused.length > 1) {
      let msg = "multiple focused ";
      dbgFocused.forEach((n) => (msg = `${msg}, Node: ${(n.nodeName, n.id)} `));
      await ideViewModel.showError(new Error(msg), codeViewModel.fileName, false);
    }
  }

  cursorDefault();
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

async function handleChromeUploadOrAppend(mode: ParseMode) {
  try {
    const [fileHandle] = await window.showOpenFilePicker({
      startIn: "documents",
      types: [{ accept: { "text/elan": ".elan" } }],
      id: lastDirId,
    });
    const codeFile = await fileHandle.getFile();
    const fileName = mode === ParseMode.loadNew ? codeFile.name : codeViewModel.fileName;
    const rawCode = await codeFile.text();
    if (mode === ParseMode.loadNew) {
      codeViewModel.recreateFile(profile, userName);
      fileManager.reset();
    }
    await codeViewModel.readAndParse(
      ideViewModel,
      fileManager,
      testRunner,
      rawCode,
      fileName,
      mode,
    );
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
    const fileName = mode === ParseMode.loadNew ? elanFile.name : codeViewModel.fileName;
    cursorWait();
    await ideViewModel.clearDisplays();
    const reader = new FileReader();
    reader.addEventListener("load", async (event: any) => {
      const rawCode = event.target.result;
      if ((mode = ParseMode.loadNew)) {
        codeViewModel.recreateFile(profile, userName);
        fileManager.reset();
      }
      await codeViewModel.readAndParse(
        ideViewModel,
        fileManager,
        testRunner,
        rawCode,
        fileName,
        mode,
      );
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
  let fileName = prompt("Please enter your file name", codeViewModel.fileName);

  if (fileName === null) {
    // cancelled
    return;
  }

  if (!fileName) {
    fileName = codeViewModel.defaultFileName;
  }

  if (!fileName.endsWith(".elan")) {
    fileName = fileName + ".elan";
  }

  codeViewModel.fileName = fileName;
}

async function handleDownload(event: Event) {
  if (!isDisabled(event)) {
    updateFileName();

    const code = await codeViewModel.renderAsSource();

    const blob = new Blob([code], { type: "plain/text" });

    const aElement = document.createElement("a");
    aElement.setAttribute("download", codeViewModel.fileName!);
    const href = URL.createObjectURL(blob);
    aElement.href = href;
    aElement.setAttribute("target", "_blank");
    aElement.click();
    URL.revokeObjectURL(href);
    saveButton.classList.remove("unsaved");
    fileManager.resetHash(codeViewModel);
    event.preventDefault();
    await ideViewModel.renderAsHtml(false);
  }
}

async function handleChromeDownload(event: Event) {
  if (!isDisabled(event)) {
    try {
      await fileManager.doDownLoad(codeViewModel, ideViewModel);
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
      await fileManager.doAutoSave(codeViewModel, ideViewModel);
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

window.addEventListener("keydown", ideViewModel.globalHandler);

demosButton.addEventListener("click", handleClickDropDownButton);
fileButton.addEventListener("click", handleClickDropDownButton);
standardWorksheetButton.addEventListener("click", handleClickDropDownButton);

demosButton.addEventListener("keydown", handleKeyDropDownButton);
fileButton.addEventListener("keydown", handleKeyDropDownButton);
standardWorksheetButton.addEventListener("keydown", handleKeyDropDownButton);

demosMenu.addEventListener("keydown", (e) =>
  handleMenuKey(e, codeViewModel, ideViewModel, testRunner),
);
fileMenu.addEventListener("keydown", (e) =>
  handleMenuKey(e, codeViewModel, ideViewModel, testRunner),
);
worksheetMenu.addEventListener("keydown", (e) =>
  handleMenuKey(e, codeViewModel, ideViewModel, testRunner),
);

demosMenu.addEventListener("click", () => collapseMenu(demosButton, false));
fileMenu.addEventListener("click", () => collapseMenu(fileButton, false));
worksheetMenu.addEventListener("click", () => collapseMenu(standardWorksheetButton, false));

displayTab?.addEventListener("click", () => tabViewModel.showDisplayTab());
infoTab?.addEventListener("click", () => tabViewModel.showInfoTab());
helpTab?.addEventListener("click", () => tabViewModel.showHelpTab());
worksheetTab?.addEventListener("click", () => tabViewModel.showWorksheetTab());
worksheetIFrame?.contentWindow?.addEventListener("click", () => tabViewModel.showWorksheetTab());
helpIFrame?.contentWindow?.addEventListener("click", () => tabViewModel.showHelpTab());

window.addEventListener("click", () => {
  codeViewModel.collapseContextMenu(ideViewModel, testRunner);
  collapseAllMenus();
});

window.addEventListener("message", async (m) => {
  if (m.data && typeof m.data === "string") {
    if (m.data.startsWith("code:")) {
      const code = m.data.slice(5);
      codeViewModel.recreateFile(profile, userName);
      fileManager.reset();
      await codeViewModel.readAndParse(
        ideViewModel,
        fileManager,
        testRunner,
        code,
        codeViewModel.fileName,
        ParseMode.loadNew,
      );
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
      const code = await codeViewModel.renderAsSource();
      worksheetIFrame.contentWindow?.postMessage(`code:${id}:${code}`, "*");
    }

    if (m.data.startsWith("filename:")) {
      const name = m.data.slice(9);
      codeViewModel.fileName = name;
      ideViewModel.updateNameAndSavedStatus(codeViewModel, fileManager);
    }
  }
});

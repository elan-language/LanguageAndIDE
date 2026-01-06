/* eslint-disable @typescript-eslint/no-explicit-any */

import { AssertOutcome } from "../../compiler/assert-outcome";
import { DebugSymbol } from "../../compiler/compiler-interfaces/debug-symbol";
import { TestStatus } from "../../compiler/test-status";
import { CodeSource } from "../frames/frame-interfaces/code-source";
import { editorEvent } from "../frames/frame-interfaces/editor-event";
import { Frame } from "../frames/frame-interfaces/frame";
import { Profile } from "../frames/frame-interfaces/profile";
import { Selectable } from "../frames/frame-interfaces/selectable";
import { CompileStatus, ParseStatus, RunStatus } from "../frames/status-enums";
import { FileManager } from "./file-manager";
import { TestRunner } from "./test-runner";
import { WebWorkerReadMessage, WebWorkerStatusMessage } from "./web-worker-messages";

// well known ids
export const lastDirId = "elan-files";

// from https://stackoverflow.com/questions/4565112/how-to-find-out-if-the-user-browser-is-chrome
export function checkIsChrome() {
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

  const isChrome =
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false &&
    isGoogleChrome;

  if (isIOSChrome) {
    // is Google Chrome on IOS
    return true;
  } else if (isChrome || isIEedge) {
    // is Google Chrome or edge
    return true;
  } else {
    // not Google Chrome
    return false;
  }
}

export function isDisabled(evt: Event) {
  if (evt.target instanceof HTMLDivElement && evt.target.classList.contains("disabled")) {
    evt.preventDefault();
    evt.stopPropagation();
    return true;
  }
  return false;
}

export function confirmContinueOnNonChromeBrowser() {
  return confirm(
    `Elan is compatible with the Chrome or Edge browser. It does not work correctly in Firefox or Safari.`,
  );
}

export function readMsg(value: string | [string, string]) {
  return { type: "read", value: value } as WebWorkerReadMessage;
}

export function errorMsg(value: unknown) {
  return { type: "status", status: "error", error: value } as WebWorkerStatusMessage;
}

export function warningOrError(tgt: HTMLDivElement): [boolean, string] {
  if (tgt.classList.contains("warning")) {
    return [true, "warning"];
  }
  if (tgt.classList.contains("error")) {
    return [true, "error"];
  }
  if (tgt.classList.contains("advisory")) {
    return [true, "advisory"];
  }
  return [false, ""];
}

export function parentId(e: Element): string {
  if (e.parentElement) {
    if (e.parentElement.id) {
      return e.parentElement.id;
    }
    return parentId(e.parentElement);
  }

  return "";
}

export interface ICodeEditorViewModel {
  fileName: string;

  setRunStatus(s: RunStatus): void;

  getRunStatusLabel(): string;

  getRunStatusColour(): string;
  readParseStatus(): ParseStatus;

  readCompileStatus(): CompileStatus;

  readRunStatus(): RunStatus;
  readTestStatus(): TestStatus;

  setTestStatus(ts: TestStatus): void;

  getParseStatusColour(): string;
  getParseStatusLabel(): string;
  getCompileStatusColour(): string;
  getCompileStatusLabel(): string;
  getTestStatusColour(): string;
  getTestStatusLabel(): string;

  containsMain(): boolean;

  renderAsHtml(): Promise<string>;

  removeAllSelectorsThatCanBe(): void;

  expandCollapseAll(): void;

  getVersionString(): string;

  refreshParseAndCompileStatuses(compileIfParsed: boolean): void;

  hasTests: boolean;

  renderAsElanSource(): Promise<string>;

  parseFrom(source: CodeSource): Promise<void>;

  parseError: string | undefined;

  defaultFileName: string;

  getCopiedSource(): string[];

  getFieldBeingEdited(): boolean;

  getFirstChild(): Frame;

  recreateFile(profile: Profile, userName: string | undefined): void;

  currentHash: string;

  compileAsWorker(base: string, debugMode: boolean, standalone: boolean): string;

  compileAsTestWorker(base: string): string;

  refreshTestStatuses(outcomes: [string, AssertOutcome[]][]): void;

  getTestError(): Error | undefined;

  getById(id: string): Selectable;

  getMap(): Map<string, Selectable>;
  processKey(e: editorEvent): boolean;

  isRunningState(): boolean;

  handleKey(e: editorEvent): boolean;

  handleDblClick(e: editorEvent): boolean;

  handleClick(e: editorEvent): boolean;

  refreshAndDisplay(
    vm: IIDEViewModel,
    tr: TestRunner,
    compileIfParsed: boolean,
    editingField: boolean,
  ): Promise<void>;

  initialDisplay(fm: FileManager, vm: IIDEViewModel, tr: TestRunner, reset: boolean): Promise<void>;

  isPausedState(): boolean;
  isTestRunningState(): boolean;
  collapseContextMenu(vm: IIDEViewModel, tr: TestRunner): Promise<void>;
}

export interface ITabViewModel {
  showDisplayTab(): void;

  showInfoTab(): void;

  showHelpTab(): void;

  showWorksheetTab(): void;

  focusInfoTab(cvm: ICodeEditorViewModel): void;
}

export interface IIDEViewModel {
  tvm: ITabViewModel;
  updateDisplayValues(cvm: ICodeEditorViewModel): void;
  setPauseButtonState(waitingForUserInput?: boolean): void;
  toggleInputStatus(rs: RunStatus): void;
  clearDisplays(): Promise<void>;
  showError(err: Error, fileName: string, reset: boolean): Promise<void>;
  printDebugInfo(info: DebugSymbol[] | string): void;
  setPausedAtLocation(location: string): void;
  clickInfoTab(): void;
  run(cvm: ICodeEditorViewModel): Promise<void>;
  runDebug(): void;
  renderAsHtml(editingField: boolean): Promise<void>;
  systemInfoPrintSafe(text: string, scroll?: boolean): void;
  updateFileName(unsaved: string): void;
  updateFileAndCode(code: string): Promise<void>;
  disableUndoRedoButtons(msg: string): void;
  postCodeResetToWorksheet(code: string): void;
  updateNameAndSavedStatus(cvm: ICodeEditorViewModel, fm: FileManager): void;
  handleEscape(e: editorEvent, cvm: ICodeEditorViewModel, tr: TestRunner): Promise<boolean>;
}

export const delayMessage =
  "Overly complex expressions - for example involving a sequence of open brackets - can result in very slow parsing. We strongly recommend that you simplify the contents of this field, for example by breaking out parts of it into separate 'let' statements. Otherwise it might become impossible to add more text.";

export const cancelMsg = "You have unsaved changes - they will be lost unless you cancel";

export const internalErrorMsg = `Sorry, an internal error has occurred. Please help us by reporting the bug, following these steps:
<ol>
<li>Click on this button:  <button id="bug-report">Copy bug report to your clipboard</button></li>
<li>In your own email system create an email to bugs@elan-lang.org, with anything in the Subject line.</li>
<li>Paste the copied bug report (it is plain text) from your clipboard into the body of the email.</li>
<li><b>Above</b> the pasted-in report, please describe your action immediately prior to the error message appearing</li>
</ol>
Please note that the report includes your Elan code. We will use this <i<>only</i> to try to reproduce and fix the bug,
and <i>won't</i> make it public.`;

export const globalKeys = [
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

export function isGlobalKeyboardEvent(kp: Event) {
  return kp instanceof KeyboardEvent && (kp.ctrlKey || kp.metaKey) && globalKeys.includes(kp.key);
}

export function collapseMenu(button: HTMLElement, andFocus: boolean) {
  if (andFocus) {
    button.focus();
  }
  const menuId = button.getAttribute("aria-controls")!;
  document.getElementById(menuId)!.hidden = true;
  button.setAttribute("aria-expanded", "false");
}

export function collapseAllMenus() {
  const allDropDowns = document.querySelectorAll(
    "button[aria-haspopup='true']",
  ) as NodeListOf<HTMLElement>;

  for (const e of allDropDowns) {
    collapseMenu(e, false);
  }
}

export function setTabToFocussedAndSelected(tabName: string) {
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

export function removeFocussedClassFromAllTabs() {
  const allTabElements = document.getElementsByClassName("tab-element");
  for (const e of allTabElements) {
    e.classList.remove("focussed");
  }
  const allTabContent = document.getElementsByClassName("tab-content");
  for (const e of allTabContent) {
    e.classList.remove("focussed");
  }
}

export function handleClickDropDownButton(event: Event) {
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

export function handleKeyDropDownButton(event: KeyboardEvent) {
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

export function handleMenuArrowUp() {
  const focusedItem = document.activeElement as HTMLElement;

  let previousItem = focusedItem;

  do {
    previousItem = previousItem?.previousElementSibling as HTMLElement;
    if (previousItem) {
      previousItem.focus();
    }
  } while (previousItem && (previousItem as any).disabled);
}

export function handleMenuArrowDown() {
  const focusedItem = document.activeElement as HTMLElement;

  let nextItem: HTMLElement = focusedItem;

  do {
    nextItem = nextItem?.nextElementSibling as HTMLElement;
    if (nextItem) {
      nextItem.focus();
    }
  } while (nextItem && (nextItem as any).disabled);
}

export function getFocused() {
  return document.querySelector(".focused") as HTMLUnknownElement | undefined;
}

export function getEditorMsg(
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

export function isSupportedKey(evt: editorEvent) {
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

export async function handleMenuKey(
  event: KeyboardEvent,
  cvm: ICodeEditorViewModel,
  vm: IIDEViewModel,
  tr: TestRunner,
) {
  removeFocussedClassFromAllTabs();
  const menuItem = event.target as HTMLElement;
  const menu = menuItem.parentElement as HTMLDivElement;
  const button = menu.previousElementSibling as HTMLButtonElement;
  if (event.key === "ArrowUp") {
    handleMenuArrowUp();
  } else if (event.key === "ArrowDown") {
    handleMenuArrowDown();
  } else if (event.key === "Escape") {
    await cvm.collapseContextMenu(vm, tr);
    collapseMenu(button, true);
  } else if (event.key === "Enter" || event.key === "Space") {
    const focusedItem = document.activeElement as HTMLElement;
    focusedItem?.click();
    setTimeout(() => {
      collapseMenu(button, false);
    }, 1);
  }
}

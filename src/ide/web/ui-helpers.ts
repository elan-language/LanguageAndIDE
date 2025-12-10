/* eslint-disable @typescript-eslint/no-explicit-any */

import { DebugSymbol } from "../../compiler/compiler-interfaces/debug-symbol";
import { RunStatus } from "../frames/status-enums";
import { WebWorkerReadMessage, WebWorkerStatusMessage } from "./web-worker-messages";
import { File } from "../frames/frame-interfaces/file";

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

export interface IIDEViewModel {
  focusInfoTab(): void;
  updateDisplayValues(file: File): void;
  setPauseButtonState(waitingForUserInput?: boolean): void;
  toggleInputStatus(rs: RunStatus): void;
  clearDisplays(): Promise<void>;
  showError(err: Error, fileName: string, reset: boolean): Promise<void>;
  printDebugInfo(info: DebugSymbol[] | string): void;
  setPausedAtLocation(location: string): void;
  clickInfoTab(): void;
  run(file: File): Promise<void>;
  runDebug(): void;
  renderAsHtml(editingField: boolean): Promise<void>;
  systemInfoPrintSafe(text: string, scroll?: boolean): void;
  updateFileName(unsaved: string): void;
  updateFileAndCode(code: string): Promise<void>;
  disableUndoRedoButtons(msg: string): void;
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

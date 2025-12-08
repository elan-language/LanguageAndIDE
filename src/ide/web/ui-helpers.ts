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

export interface IIDEViewModel {
  focusInfoTab(): void;
  updateDisplayValues(): void;
  setPauseButtonState(waitingForUserInput?: boolean): void;
  togggleInputStatus(rs: RunStatus): void;
  clearDisplays(): Promise<void>;
  showError(err: Error, fileName: string, reset: boolean): Promise<void>;
  printDebugInfo(info: DebugSymbol[] | string): void;
  setPausedAtLocation(location: string): void;
  clickInfoTab(): void;
  run(file: File): Promise<void>;
  runDebug(): void;
}

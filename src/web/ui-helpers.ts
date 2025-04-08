/* eslint-disable @typescript-eslint/no-explicit-any */

import { WebWorkerReadMessage, WebWorkerStatusMessage } from "./web-worker-messages";

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

export function confirmContinueOnNonChromeBrowser() {
  return confirm(`We recommend that you access Elan via Chrome,
which runs on all platforms.
If you click OK you may continue to use Elan but, currently,
it is not guaranteed to run correctly on this browser.`);
}

export function readMsg(value: string | [string, string]) {
  return { type: "read", value: value } as WebWorkerReadMessage;
}

export function errorMsg(value: unknown) {
  return { type: "status", status: "error", error: value } as WebWorkerStatusMessage;
}

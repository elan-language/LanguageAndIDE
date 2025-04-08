/* eslint-disable @typescript-eslint/no-explicit-any */

import { WebInputOutput } from "./web-input-output";

// static html elements
const displayDiv = document.getElementById("display") as HTMLDivElement;

const elanInputOutput = new WebInputOutput();

let runWorker: Worker | undefined;

const jsCode = `injected_code`;

// add all the listeners

displayDiv.addEventListener("click", () => {
  displayDiv.getElementsByTagName("input")?.[0]?.focus();
});

function runProgram() {
  try {
    runWorker = new Worker(jsCode, { type: "module" });

    runWorker.onmessage = async (e: MessageEvent<any>) => {
      const data = e.data;

      switch (data.type) {
        case "write":
          await handleWorkerIO(data);
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

    runWorker.onerror = async (_ev: ErrorEvent) => {};

    runWorker.postMessage({ type: "start" } as any);
  } catch (e) {
    console.warn(e);
  }
}

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
  runProgram();
}

function readMsg(value: string | [string, string]) {
  return { type: "read", value: value } as any;
}

function errorMsg(value: unknown) {
  return { type: "status", status: "error", error: value } as any;
}

async function handleWorkerIO(data: any) {
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
      try {
        await (elanInputOutput as any)[data.function](...data.parameters);
        runWorker?.postMessage(readMsg(""));
      } catch (e) {
        runWorker?.postMessage(errorMsg(e));
      }
      break;
  }
}

function handleRunWorkerFinished() {
  runWorker?.terminate();
  runWorker = undefined;
  console.info("elan program completed OK");
}

async function handleRunWorkerError(_data: any) {
  runWorker?.terminate();
  runWorker = undefined;
}

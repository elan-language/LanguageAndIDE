/* eslint-disable @typescript-eslint/no-explicit-any */

import { checkIsChrome, confirmContinueOnNonChromeBrowser, readMsg, errorMsg } from "./ui-helpers";
import { WebInputOutput } from "./web-input-output";
import { WebWorkerStatusMessage, WebWorkerWriteMessage } from "./web-worker-messages";

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

    runWorker.onerror = async (ev: ErrorEvent) => {
      console.warn(ev.message);
    };

    runWorker.postMessage({ type: "start" } as any);
  } catch (e) {
    console.warn(e);
  }
}

const isChrome = checkIsChrome();
const okToContinue = isChrome || confirmContinueOnNonChromeBrowser();

if (okToContinue) {
  runProgram();
}

async function handleWorkerIO(data: WebWorkerWriteMessage) {
  switch (data.function) {
    case "readLine":
      const line = await elanInputOutput.readLine();
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

function handleRunWorkerFinished() {
  runWorker?.terminate();
  runWorker = undefined;
  console.info("elan program completed OK");
}

async function handleRunWorkerError(data: WebWorkerStatusMessage) {
  runWorker?.terminate();
  runWorker = undefined;
  console.warn(data.error);
}

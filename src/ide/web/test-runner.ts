/* eslint-disable @typescript-eslint/no-explicit-any */

import { ElanRuntimeError } from "../../compiler/standard-library/elan-runtime-error";
import { TestStatus } from "../../compiler/test-status";
import { IIDEViewModel } from "./ui-helpers";
import {
  WebWorkerMessage,
  WebWorkerStatusMessage,
  WebWorkerTestMessage,
} from "./web-worker-messages";
import { File } from "../frames/frame-interfaces/file";
import { encodeCode } from "./web-helpers";

export class TestRunner {
  testWorker: Worker | undefined;
  testTimer: any = undefined;
}

export function cancelTestTimeout(testRunner: TestRunner) {
  clearInterval(testRunner.testTimer);
  testRunner.testTimer = undefined;
}

export function endTests(testRunner: TestRunner) {
  cancelTestTimeout(testRunner);
  testRunner.testWorker?.terminate();
  testRunner.testWorker = undefined;
}

export async function handleTestWorkerError(
  data: WebWorkerStatusMessage,
  file: File,
  testRunner: TestRunner,
  vm: IIDEViewModel,
) {
  endTests(testRunner);
  const e = data.error;
  const err = e instanceof ElanRuntimeError ? e : new ElanRuntimeError(e as any);
  await vm.showError(err, file.fileName, false);
  file.setTestStatus(TestStatus.error);
  vm.updateDisplayValues();
}

export async function handleTestWorkerFinished(
  data: WebWorkerTestMessage,
  file: File,
  testRunner: TestRunner,
  vm: IIDEViewModel,
) {
  endTests(testRunner);
  file.refreshTestStatuses(data.value);
  console.info("elan tests completed");

  const testErr = file.getTestError();
  if (testErr) {
    const err = testErr instanceof ElanRuntimeError ? testErr : new ElanRuntimeError(testErr);
    await vm.showError(err, file.fileName, false);
  }

  await vm.renderAsHtml(false);
  vm.updateDisplayValues();
}

export async function runTestsInner(file: File, vm: IIDEViewModel, testRunner: TestRunner) {
  try {
    await vm.clearDisplays();
    file.setTestStatus(TestStatus.running);

    vm.updateDisplayValues();
    const path = `${document.location.origin}${document.location.pathname}`.replace(
      "/index.html",
      "",
    );
    const jsCode = file.compileAsTestWorker(path);
    const asUrl = encodeCode(jsCode);

    testRunner.testWorker = new Worker(asUrl, { type: "module" });

    testRunner.testWorker.onmessage = async (e: MessageEvent<WebWorkerMessage>) => {
      const data = e.data;

      switch (data.type) {
        case "status":
          switch (data.status) {
            case "finished":
              await handleTestWorkerError(data, file, testRunner, vm);
              break;
          }
          break;
        case "test":
          await handleTestWorkerFinished(data, file, testRunner, vm);
      }
    };

    testRunner.testWorker.onerror = async (ev: ErrorEvent) => {
      endTests(testRunner);
      const err = new ElanRuntimeError(ev.message);
      await vm.showError(err, file.fileName, false);
      file.setTestStatus(TestStatus.error);
      vm.updateDisplayValues();
    };

    testRunner.testWorker.postMessage({ type: "start" } as WebWorkerMessage);
  } catch (e) {
    endTests(testRunner);
    console.warn(e);
    file.setTestStatus(TestStatus.error);
    vm.updateDisplayValues();
  }
}

export async function runTests(file: File, vm: IIDEViewModel, testRunner: TestRunner) {
  // if already running cancel and restart
  endTests(testRunner);
  await runTestsInner(file, vm, testRunner);

  let timeoutCount = 0;
  const testTimeout = 2; // seconds

  testRunner.testTimer = setInterval(async () => {
    timeoutCount++;

    if (!testRunner.testWorker) {
      cancelTestTimeout(testRunner);
    }

    if (timeoutCount === testTimeout && testRunner.testWorker) {
      cancelTestTimeout(testRunner);
      handleTestAbort(file, vm, testRunner);
    }
  }, 1000);
}

function handleTestAbort(file: File, vm: IIDEViewModel, testRunner: TestRunner) {
  endTests(testRunner);
  file.setTestStatus(TestStatus.error);
  vm.systemInfoPrintSafe("Tests timed out and were aborted");
  vm.updateDisplayValues();
}

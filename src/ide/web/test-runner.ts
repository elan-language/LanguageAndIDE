import { ElanRuntimeError } from "../../compiler/standard-library/elan-runtime-error";
import { TestStatus } from "../../compiler/test-status";
import { ICodeEditorViewModel, IIDEViewModel } from "./ui-helpers";
import { encodeCode } from "./web-helpers";
import {
  WebWorkerMessage,
  WebWorkerStatusMessage,
  WebWorkerTestMessage,
} from "./web-worker-messages";

export class TestRunner {
  private testWorker: Worker | undefined;
  private testTimer: number | undefined = undefined;

  end() {
    this.cancelTestTimeout();
    this.testWorker?.terminate();
    this.testWorker = undefined;
  }

  stop(file: ICodeEditorViewModel, vm: IIDEViewModel) {
    if (this.testWorker) {
      this.end();
      file.setTestStatus(TestStatus.default);
      vm.updateDisplayValues(file);
    }
  }

  async run(file: ICodeEditorViewModel, vm: IIDEViewModel) {
    // if already running cancel and restart
    this.end();
    await this.runTests(file, vm);

    let timeoutCount = 0;
    const testTimeout = 2; // seconds

    this.testTimer = setInterval(async () => {
      timeoutCount++;

      if (!this.testWorker) {
        this.cancelTestTimeout();
      }

      if (timeoutCount === testTimeout && this.testWorker) {
        this.cancelTestTimeout();
        this.handleAbort(file, vm);
      }
    }, 1000) as unknown as number | undefined;
  }

  private cancelTestTimeout() {
    clearInterval(this.testTimer);
    this.testTimer = undefined;
  }

  private async runTests(file: ICodeEditorViewModel, vm: IIDEViewModel) {
    try {
      await vm.clearDisplays();
      file.setTestStatus(TestStatus.running);

      vm.updateDisplayValues(file);
      const path = `${document.location.origin}${document.location.pathname}`.replace(
        "/index.html",
        "",
      );
      const jsCode = file.compileAsTestWorker(path);
      const asUrl = encodeCode(jsCode);

      this.testWorker = new Worker(asUrl, { type: "module" });

      this.testWorker.onmessage = async (e: MessageEvent<WebWorkerMessage>) => {
        const data = e.data;

        switch (data.type) {
          case "status":
            switch (data.status) {
              case "finished":
                await this.handleError(data, file, vm);
                break;
            }
            break;
          case "test":
            await this.handleFinished(data, file, vm);
        }
      };

      this.testWorker.onerror = async (ev: ErrorEvent) => {
        this.end();
        const err = new ElanRuntimeError(ev.message);
        await vm.showError(err, file.fileName, false);
        file.setTestStatus(TestStatus.error);
        vm.updateDisplayValues(file);
      };

      this.testWorker.postMessage({ type: "start" } as WebWorkerMessage);
    } catch (e) {
      this.end();
      console.warn(e);
      file.setTestStatus(TestStatus.error);
      vm.updateDisplayValues(file);
    }
  }

  private async handleError(
    data: WebWorkerStatusMessage,
    file: ICodeEditorViewModel,
    vm: IIDEViewModel,
  ) {
    this.end();
    const e = data.error;
    const err =
      e instanceof ElanRuntimeError ? e : new ElanRuntimeError(typeof e === "string" ? e : "");
    await vm.showError(err, file.fileName, false);
    file.setTestStatus(TestStatus.error);
    vm.updateDisplayValues(file);
  }

  private async handleFinished(
    data: WebWorkerTestMessage,
    file: ICodeEditorViewModel,
    vm: IIDEViewModel,
  ) {
    this.end();
    file.refreshTestStatuses(data.value);
    console.info("elan tests completed");

    const testErr = file.getTestError();
    if (testErr) {
      const err = testErr instanceof ElanRuntimeError ? testErr : new ElanRuntimeError(testErr);
      await vm.showError(err, file.fileName, false);
    }

    await vm.renderAsHtml(false);
    vm.updateDisplayValues(file);
  }

  private handleAbort(file: ICodeEditorViewModel, vm: IIDEViewModel) {
    this.end();
    file.setTestStatus(TestStatus.error);
    vm.systemInfoPrintSafe("Tests timed out and were aborted");
    vm.updateDisplayValues(file);
  }
}

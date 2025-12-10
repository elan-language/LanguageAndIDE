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

  stop(cvm: ICodeEditorViewModel, vm: IIDEViewModel) {
    if (this.testWorker) {
      this.end();
      cvm.setTestStatus(TestStatus.default);
      vm.updateDisplayValues(cvm);
    }
  }

  async run(cvm: ICodeEditorViewModel, vm: IIDEViewModel) {
    // if already running cancel and restart
    this.end();
    await this.runTests(cvm, vm);

    let timeoutCount = 0;
    const testTimeout = 2; // seconds

    this.testTimer = setInterval(async () => {
      timeoutCount++;

      if (!this.testWorker) {
        this.cancelTestTimeout();
      }

      if (timeoutCount === testTimeout && this.testWorker) {
        this.cancelTestTimeout();
        this.handleAbort(cvm, vm);
      }
    }, 1000) as unknown as number | undefined;
  }

  private cancelTestTimeout() {
    clearInterval(this.testTimer);
    this.testTimer = undefined;
  }

  private async runTests(cvm: ICodeEditorViewModel, vm: IIDEViewModel) {
    try {
      await vm.clearDisplays();
      cvm.setTestStatus(TestStatus.running);

      vm.updateDisplayValues(cvm);
      const path = `${document.location.origin}${document.location.pathname}`.replace(
        "/index.html",
        "",
      );
      const jsCode = cvm.compileAsTestWorker(path);
      const asUrl = encodeCode(jsCode);

      this.testWorker = new Worker(asUrl, { type: "module" });

      this.testWorker.onmessage = async (e: MessageEvent<WebWorkerMessage>) => {
        const data = e.data;

        switch (data.type) {
          case "status":
            switch (data.status) {
              case "finished":
                await this.handleError(data, cvm, vm);
                break;
            }
            break;
          case "test":
            await this.handleFinished(data, cvm, vm);
        }
      };

      this.testWorker.onerror = async (ev: ErrorEvent) => {
        this.end();
        const err = new ElanRuntimeError(ev.message);
        await vm.showError(err, cvm.fileName, false);
        cvm.setTestStatus(TestStatus.error);
        vm.updateDisplayValues(cvm);
      };

      this.testWorker.postMessage({ type: "start" } as WebWorkerMessage);
    } catch (e) {
      this.end();
      console.warn(e);
      cvm.setTestStatus(TestStatus.error);
      vm.updateDisplayValues(cvm);
    }
  }

  private async handleError(
    data: WebWorkerStatusMessage,
    cvm: ICodeEditorViewModel,
    vm: IIDEViewModel,
  ) {
    this.end();
    const e = data.error;
    const err =
      e instanceof ElanRuntimeError ? e : new ElanRuntimeError(typeof e === "string" ? e : "");
    await vm.showError(err, cvm.fileName, false);
    cvm.setTestStatus(TestStatus.error);
    vm.updateDisplayValues(cvm);
  }

  private async handleFinished(
    data: WebWorkerTestMessage,
    cvm: ICodeEditorViewModel,
    vm: IIDEViewModel,
  ) {
    this.end();
    cvm.refreshTestStatuses(data.value);
    console.info("elan tests completed");

    const testErr = cvm.getTestError();
    if (testErr) {
      const err = testErr instanceof ElanRuntimeError ? testErr : new ElanRuntimeError(testErr);
      await vm.showError(err, cvm.fileName, false);
    }

    await vm.renderAsHtml(false);
    vm.updateDisplayValues(cvm);
  }

  private handleAbort(cvm: ICodeEditorViewModel, vm: IIDEViewModel) {
    this.end();
    cvm.setTestStatus(TestStatus.error);
    vm.systemInfoPrintSafe("Tests timed out and were aborted");
    vm.updateDisplayValues(cvm);
  }
}

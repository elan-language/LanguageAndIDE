import { ElanInputOutput } from "./elan-input-output";
import { hasHiddenType } from "./has-hidden-type";
import { WebWorkerMessage, WebWorkerWriteMessage } from "./web/web-worker-messages";

export class StubInputOutput implements ElanInputOutput {
  constructor() {}

  readFile(): Promise<string> {
    return new Promise<string>((rs, rj) => {
      onmessage = (e) => {
        const data = e.data as WebWorkerMessage;

        if (data.type === "read") {
          rs(data.value as string);
        }

        if (data.type === "status" && data.status === "error") {
          rj(data.error as string);
        }
      };
      postMessage(this.writeMsg("readFile"));
    });
  }

  writeFile(fileName: string, data: string): Promise<void> {
    return new Promise<void>((rs, rj) => {
      onmessage = (e) => {
        const data = e.data as WebWorkerMessage;

        if (data.type === "read") {
          rs();
        }
        if (data.type === "status" && data.status === "error") {
          rj(data.error as string);
        }
      };
      postMessage(this.writeMsg("writeFile", [fileName, data]));
    });
  }

  writeMsg(func: string, parameters?: (string | number)[]) {
    return { type: "write", function: func, parameters: parameters ?? [] } as WebWorkerWriteMessage;
  }

  drawGraphics(html: string): void {
    postMessage(this.writeMsg("drawGraphics", [html]));
  }

  printLine(text: string) {
    postMessage(this.writeMsg("printLine", [text]));
  }

  print(text: string) {
    postMessage(this.writeMsg("print", [text]));
  }

  printTab(position: number, text: string) {
    postMessage(this.writeMsg("printTab", [position, text]));
  }

  stopReading() {
    postMessage(this.writeMsg("stopReading"));
  }

  readLine() {
    return new Promise<string>((rs, rj) => {
      onmessage = (e) => {
        const data = e.data as WebWorkerMessage;

        if (data.type === "read") {
          rs(data.value as string);
        }
      };
      postMessage(this.writeMsg("readLine"));
    });
  }

  getKey() {
    return new Promise<string>((rs, rj) => {
      onmessage = (e) => {
        const data = e.data as WebWorkerMessage;

        if (data.type === "read") {
          rs(data.value as string);
        }
      };
      postMessage(this.writeMsg("getKey"));
    });
  }

  getModKey(e: KeyboardEvent) {
    return e.ctrlKey ? "Control" : e.shiftKey ? "Shift" : e.altKey ? "Alt" : "";
  }

  getKeyWithModifier(): Promise<[string, string]> {
    return new Promise<[string, string]>((rs, rj) => {
      onmessage = (e) => {
        const data = e.data as WebWorkerMessage;

        if (data.type === "read") {
          const t = data.value;
          (t as unknown as hasHiddenType)._type = "Tuple";
          rs(data.value as [string, string]);
        }
      };
      postMessage(this.writeMsg("getKeyWithModifier"));
    });
  }

  clearKeyBuffer() {
    postMessage(this.writeMsg("clearKeyBuffer"));
  }

  clearConsole() {
    postMessage(this.writeMsg("clearConsole"));
  }

  clearGraphics() {
    postMessage(this.writeMsg("clearGraphics"));
  }
}

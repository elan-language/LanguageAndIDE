import { ElanInputOutput } from "./elan-input-output";
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

  drawBlockGraphics(html: string): Promise<void> {
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
      postMessage(this.writeMsg("drawBlockGraphics", [html]));
    });
  }

  clearBlockGraphics(): Promise<void> {
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
      postMessage(this.writeMsg("clearBlockGraphics"));
    });
  }

  drawVectorGraphics(html: string): Promise<void> {
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
      postMessage(this.writeMsg("drawVectorGraphics", [html]));
    });
  }

  clearVectorGraphics(): Promise<void> {
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
      postMessage(this.writeMsg("clearVectorGraphics"));
    });
  }

  clearDisplay() {
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
      postMessage(this.writeMsg("clearAllGraphics"));
    });
  }

  printLine(text: string) {
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
      postMessage(this.writeMsg("printLine", [text]));
    });
  }

  print(text: string) {
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
      postMessage(this.writeMsg("print", [text]));
    });
  }

  printTab(position: number, text: string) {
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
      postMessage(this.writeMsg("printTab", [position, text]));
    });
  }

  stopReading() {
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
      postMessage(this.writeMsg("stopReading"));
    });
  }

  readLine() {
    return new Promise<string>((rs) => {
      onmessage = (e) => {
        const data = e.data as WebWorkerMessage;

        if (data.type === "read") {
          rs(data.value as string);
        }
      };
      postMessage(this.writeMsg("readLine"));
    });
  }

  waitForAnyKey(): Promise<void> {
    return new Promise<void>((rs) => {
      onmessage = (_e) => {
        rs();
      };
      postMessage(this.writeMsg("waitForAnyKey"));
    });
  }

  waitForKey(): Promise<string> {
    return new Promise<string>((rs) => {
      onmessage = (e) => {
        const data = e.data as WebWorkerMessage;

        if (data.type === "read") {
          rs(data.value as string);
        }
      };
      postMessage(this.writeMsg("waitForKey"));
    });
  }

  getKey() {
    return new Promise<string>((rs) => {
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
    return new Promise<[string, string]>((rs) => {
      onmessage = (e) => {
        const data = e.data as WebWorkerMessage;

        if (data.type === "read") {
          rs(data.value as [string, string]);
        }
      };
      postMessage(this.writeMsg("getKeyWithModifier"));
    });
  }

  clearKeyBuffer() {
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

      postMessage(this.writeMsg("clearKeyBuffer"));
    });
  }

  clearPrintedText() {
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
      postMessage(this.writeMsg("clearPrintedText"));
    });
  }
  clearSystemInfo() {
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
      postMessage(this.writeMsg("clearSystemInfo"));
    });
  }

  drawHtml(html: string): Promise<void> {
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
      postMessage(this.writeMsg("drawHtml", [html]));
    });
  }

  clearHtml() {
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
      postMessage(this.writeMsg("clearHtml"));
    });
  }
}

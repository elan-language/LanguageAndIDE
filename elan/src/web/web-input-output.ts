import { ElanInputOutput } from "../elan-input-output";

export class WebInputOutput implements ElanInputOutput {
  constructor(
    private readonly consoleWindow: { innerHTML: string },
    private readonly graphicsWindow: { innerHTML: string },
  ) {
    consoleWindow.innerHTML = this.render();
  }
  drawGraphics(html: string): void {
    this.graphicsWindow.innerHTML = html;
  }

  previousContent: string = "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentInterval?: any;

  printLine(line: string) {
    this.previousContent = `${this.previousContent}${line}<br>`;
    this.consoleWindow.innerHTML = this.render();
  }

  stopReading() {
    clearInterval(this.currentInterval);
    this.previousContent = `${this.previousContent.slice(0, -48)}`;
  }

  readLine() {
    this.previousContent = `${this.previousContent}<input id = "inp" type="text" autofocus></input>`;
    this.consoleWindow.innerHTML = this.render();
    const inp = document.getElementById("inp") as HTMLInputElement;
    inp.focus();

    return new Promise<string>((rs, rj) => {
      let entered = false;
      inp.addEventListener("keydown", (k: KeyboardEvent) => {
        entered = k.key === "Enter";
      });
      this.currentInterval = setInterval(() => {
        if (entered) {
          rs(inp.value);
          this.stopReading();
          this.printLine(inp.value);
        }
      }, 250);
    });
  }

  keyBuffer?: string[];

  readKey() {
    const inp = document.getElementById("inp") as HTMLInputElement;
    inp.focus();

    return new Promise<string>((rs, rj) => {
      if (this.keyBuffer && this.keyBuffer.length > 0) {
        rs(this.keyBuffer.pop()!);
      } else {
        if (!this.keyBuffer) {
          this.keyBuffer = [];
          inp.addEventListener("keydown", (k: KeyboardEvent) => {
            this.keyBuffer?.push(k.key);
          });

          this.currentInterval = setInterval(() => {
            if (this.keyBuffer && this.keyBuffer.length > 0) {
              rs(this.keyBuffer.pop()!);
              this.printLine(inp.value);
            }
          }, 250);
        }
      }
    });
  }

  render() {
    return `<div>${this.previousContent}</div>`;
  }

  clearConsole() {
    this.previousContent = "";
    this.consoleWindow.innerHTML = this.render();
  }

  clearGraphics() {
    this.graphicsWindow.innerHTML = `<div></div>`;
  }
}

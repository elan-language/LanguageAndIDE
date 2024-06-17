import { ElanInputOutput } from "../elan-input-output";

export class WebInputOutput implements ElanInputOutput {
  keyBuffer: KeyboardEvent[] = [];

  private graphics: HTMLElement;

  constructor(
    private readonly consoleWindow: { innerHTML: string },
    private readonly graphicsWindow: { innerHTML: string },
  ) {
    consoleWindow.innerHTML = this.renderConsole();

    this.graphics = document.getElementById("graphics") as HTMLElement;
    this.graphics.addEventListener("keydown", (k: KeyboardEvent) => {
      if (k.key === "Shift" || k.key === "Control" || k.key === "Alt") {
        return;
      }
      this.keyBuffer.push(k);
    });

    this.graphics.focus();
  }

  drawGraphics(html: string): void {
    this.clearKeyBuffer();
    this.graphicsWindow.innerHTML = html;
    this.graphics.focus();
  }

  previousContent: string = "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentInterval?: any;

  printLine(line: string) {
    this.previousContent = `${this.previousContent}${line}<br>`;
    this.consoleWindow.innerHTML = this.renderConsole();
  }

  stopReading() {
    clearInterval(this.currentInterval);
    this.previousContent = `${this.previousContent.slice(0, -48)}`;
    this.graphics.focus();
  }

  readLine() {
    this.previousContent = `${this.previousContent}<input id = "inp" type="text" autofocus></input>`;
    this.consoleWindow.innerHTML = this.renderConsole();
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

  getKeystroke() {
    const evt = this.keyBuffer.pop();
    return evt ? evt.key : "";
  }

  getModKey(e: KeyboardEvent) {
    return e.ctrlKey ? "Control" : e.shiftKey ? "Shift" : e.altKey ? "Alt" : "";
  }

  getKeystrokeWithModifier(): [string, string] {
    const evt = this.keyBuffer.pop();
    return evt ? [evt.key, this.getModKey(evt)] : ["", ""];
  }

  clearKeyBuffer() {
    this.keyBuffer = [];
  }

  renderConsole() {
    return `<div>${this.previousContent}</div>`;
  }

  clearConsole() {
    this.previousContent = "";
    this.consoleWindow.innerHTML = this.renderConsole();
  }

  clearGraphics() {
    this.clearKeyBuffer();
    this.graphicsWindow.innerHTML = `<div></div>`;
  }
}

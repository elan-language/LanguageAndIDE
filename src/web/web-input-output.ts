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
    this.graphicsWindow.innerHTML = html;
    this.graphics.focus();
  }

  previousContent: string = "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentInterval?: any;

  printLine(text: string) {
    this.print(`${text}<br>`);
    const element = document.getElementById("console")!;
    element.scrollTop = element.scrollHeight;
  }

  print(text: string) {
    this.previousContent = `${this.previousContent}${text}`;
    this.consoleWindow.innerHTML = this.renderConsole();
  }

  printTab(position: number, text: string) {
    const lastNl = this.previousContent.lastIndexOf("\n");
    const afterLastNl = lastNl === -1 ? 0 : lastNl + 1;
    const spaces =
      "                                                                                ";
    const charsSinceNl = this.previousContent.length - lastNl;
    const tab = spaces.substring(0, position - charsSinceNl + 1);
    this.previousContent = `${this.previousContent}${tab}${text}`;
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
    const ks = evt ? evt.key : "";

    return Promise.resolve(ks);
  }

  getModKey(e: KeyboardEvent) {
    return e.ctrlKey ? "Control" : e.shiftKey ? "Shift" : e.altKey ? "Alt" : "";
  }

  getKeystrokeWithModifier(): Promise<[string, string]> {
    const evt = this.keyBuffer.pop();
    const ks: [string, string] = evt ? [evt.key, this.getModKey(evt)] : ["", ""];

    return Promise.resolve(ks);
  }

  clearKeyBuffer() {
    this.keyBuffer = [];
  }

  private renderConsole() {
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

import { ElanInputOutput } from "../elan-input-output";

export class ElanInputOutputImpl implements ElanInputOutput {
  constructor(private readonly consoleWindow: { innerHTML: string }) {
    consoleWindow.innerHTML = this.render();
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

  render() {
    return `<div>${this.previousContent}</div>`;
  }

  clear() {
    this.previousContent = "";
    this.consoleWindow.innerHTML = this.render();
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElanInputOutput } from "../elan-input-output";

export class WebInputOutput implements ElanInputOutput {
  keyBuffer: KeyboardEvent[] = [];

  private graphics: HTMLElement;
  private lastDirId = "elan-data";

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

  useChromeFileAPI() {
    return "showOpenFilePicker" in self;
  }

  chooser() {
    const f = document.createElement("input");
    const g = document.getElementById("graphics") as HTMLElement;
    f.style.display = "none";
    f.type = "file";
    f.name = "file";
    g.appendChild(f);
    return f;
  }

  chromeChooser() {
    const f = document.createElement("input");
    const g = document.getElementById("graphics") as HTMLElement;
    f.style.display = "none";
    g.appendChild(f);
    return f;
  }

  readFileChrome(): Promise<string> {
    let fileHandle;

    const chooser = this.chromeChooser();

    return new Promise<string>((rs, rj) => {
      chooser.addEventListener("click", async () => {
        try {
          [fileHandle] = await window.showOpenFilePicker({
            startIn: "documents",
            id: this.lastDirId,
          });
          const file = await fileHandle.getFile();

          if (file.type !== "text/plain") {
            rj(`cannot load non text file ${file.name} of type ${file.type}`);
          } else {
            const contents = await file.text();
            rs(contents);
          }
        } catch (e) {
          rj("read cancelled");
        }
      });

      chooser.click();
      document.getElementById("graphics")?.removeChild(chooser);
    });
  }

  readFile(): Promise<string> {
    if (this.useChromeFileAPI()) {
      return this.readFileChrome();
    }

    const inp = this.chooser();

    return new Promise<string>((rs, rj) => {
      inp.addEventListener("change", (event: Event) => {
        const elanFile = (event.target as HTMLInputElement).files?.[0];

        if (elanFile) {
          if (elanFile.type !== "text/plain") {
            rj(`cannot load non text file ${elanFile.name} of type ${elanFile.type}`);
          } else {
            const reader = new FileReader();

            reader.addEventListener("load", (event: ProgressEvent) => {
              const content = (event.target as FileReader).result as string;
              rs(content);
            });

            reader.readAsText(elanFile);
          }
        }

        event.preventDefault();
      });

      inp.addEventListener("cancel", (event: Event) => {
        rj("read cancelled");
        event.preventDefault();
      });
      inp.click();
    });
  }

  async writeFileChrome(fileName: string, data: string): Promise<void> {
    try {
      const fh = await self.showSaveFilePicker({
        suggestedName: fileName,
        startIn: "documents",
        id: this.lastDirId,
      });
      const writeable = await fh.createWritable();
      await writeable.write(data);
      return await writeable.close();
    } catch (e) {
      throw new Error("write cancelled");
    }
  }

  writeFile(fileName: string, data: string): Promise<void> {
    if (!fileName) {
      fileName = "untitled.txt";
    }

    if (!fileName.endsWith(".txt")) {
      fileName = `${fileName}.txt`;
    }

    if (this.useChromeFileAPI()) {
      return this.writeFileChrome(fileName, data);
    }

    return new Promise<void>((rs, rj) => {
      try {
        const blob = new Blob([data], { type: "text/plain" });
        const aElement = document.createElement("a");
        aElement.setAttribute("download", fileName!);
        const href = URL.createObjectURL(blob);
        aElement.href = href;
        aElement.setAttribute("target", "_blank");
        aElement.click();
        URL.revokeObjectURL(href);

        rs();
      } catch (e) {
        rj("write cancelled");
      }
    });
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
    this.previousContent = `${this.previousContent}<input id = "inp" type="text" autofocus tabindex="2"></input>`;
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

  waitForAnyKey(): Promise<void> {
    return new Promise<void>((rs, rj) => {
      const timeOut = setInterval(async () => {
        if ((await this.getKey()) !== "") {
          clearInterval(timeOut);
          rs();
        }
      }, 250);
    });
  }

  getKey() {
    this.graphics.focus();
    const evt = this.keyBuffer[0];
    this.keyBuffer = this.keyBuffer.slice(1);
    const ks = evt ? evt.key : "";
    return Promise.resolve(ks);
  }

  private getModKey(e: KeyboardEvent) {
    return e.ctrlKey ? "Control" : e.shiftKey ? "Shift" : e.altKey ? "Alt" : "";
  }

  getKeyWithModifier(): Promise<[string, string]> {
    this.graphics.focus();
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

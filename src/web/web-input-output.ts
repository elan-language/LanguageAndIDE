/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElanInputOutput } from "../elan-input-output";

export class WebInputOutput implements ElanInputOutput {
  keyBuffer: KeyboardEvent[] = [];

  private display: HTMLElement;
  private lastDirId = "elan-data";

  constructor() {
    this.display = document.getElementById("display") as HTMLElement;
    this.display.addEventListener("keydown", (k: KeyboardEvent) => {
      if (k.key === "Shift" || k.key === "Control" || k.key === "Alt") {
        return;
      }
      this.keyBuffer.push(k);
    });

    this.display.focus();
  }

  useChromeFileAPI() {
    return "showOpenFilePicker" in self;
  }

  chooser() {
    const f = document.createElement("input");
    const g = this.display;
    f.style.display = "none";
    f.type = "file";
    f.name = "file";
    g.appendChild(f);
    return f;
  }

  chromeChooser() {
    const f = document.createElement("input");
    const g = this.display as HTMLElement;
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
        } catch (_e) {
          rj("read cancelled");
        }
      });

      chooser.click();
      this.display?.removeChild(chooser);
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
    } catch (_e) {
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
      } catch (_e) {
        rj("write cancelled");
      }
    });
  }
  clearRawHtml() {
    this.clearKeyBuffer();
    document.getElementById("printed-text")!.innerHTML = "";
  }
  drawBlockGraphics(html: string): void {
    document.getElementById("block-graphics")!.innerHTML = html;
    this.display.focus();
  }
  clearBlockGraphics() {
    this.clearKeyBuffer();
    this.drawBlockGraphics("");
  }

  drawVectorGraphics(html: string): void {
    document.getElementById("vector-graphics")!.innerHTML = html;
    this.display.focus();
  }
  clearVectorGraphics() {
    this.clearKeyBuffer();
    this.drawVectorGraphics("");
  }
  clearAllGraphics() {
    this.clearKeyBuffer();
    this.clearRawHtml();
    this.clearBlockGraphics();
    this.clearVectorGraphics();
  }

  printedText: string = "";
  currentInterval?: any;

  printLine(text: string) {
    this.print(`${text}<br>`);
    const element = document.getElementById("printed-text")!;
    element.scrollTop = element.scrollHeight;
  }

  print(text: string) {
    this.printedText = `${this.printedText}${text}`;
    this.renderPrintedText();
  }

  printTab(position: number, text: string) {
    const lastNl = this.printedText.lastIndexOf("<br>");
    const spaces =
      "                                                                                ";
    const charsSinceNl = this.printedText.length - lastNl;
    const tab = spaces.substring(0, position - charsSinceNl + 1);
    this.printedText = `${this.printedText}${tab}${text}`;
    this.renderPrintedText();
  }

  stopReading() {
    clearInterval(this.currentInterval);
    const inputOffset = this.printedText.indexOf("<input");
    this.printedText = `${this.printedText.slice(0, inputOffset)}`;
    this.display.focus();
  }

  readLine() {
    this.printedText = `${this.printedText}<input id = "inp" type="text" autofocus tabindex="2"></input>`;
    this.renderPrintedText();
    const inp = document.getElementById("inp") as HTMLInputElement;
    inp.focus();

    return new Promise<string>((rs) => {
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
    return new Promise<void>((rs) => {
      const timeOut = setInterval(async () => {
        if ((await this.getKey()) !== "") {
          clearInterval(timeOut);
          rs();
        }
      }, 250);
    });
  }

  getKey() {
    this.display.focus();
    const evt = this.keyBuffer[0];
    this.keyBuffer = this.keyBuffer.slice(1);
    const ks = evt ? evt.key : "";
    return Promise.resolve(ks);
  }

  private getModKey(e: KeyboardEvent) {
    return e.ctrlKey ? "Control" : e.shiftKey ? "Shift" : e.altKey ? "Alt" : "";
  }

  getKeyWithModifier(): Promise<[string, string]> {
    this.display.focus();
    const evt = this.keyBuffer.pop();
    const ks: [string, string] = evt ? [evt.key, this.getModKey(evt)] : ["", ""];
    return Promise.resolve(ks);
  }

  clearKeyBuffer() {
    this.keyBuffer = [];
  }

  clearSystemInfo() {
    document.getElementById("system-info")!.innerHTML = "";
  }

  renderPrintedText(): void {
    const div = document.getElementById("printed-text")!;
    div.innerHTML = this.printedText;
    this.display.focus();
  }

  clearPrintedText() {
    this.printedText = "";
    this.renderPrintedText();
  }
}

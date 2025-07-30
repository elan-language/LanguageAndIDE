/* eslint-disable @typescript-eslint/no-explicit-any */
import { DebugSymbol } from "../../compiler/compiler-interfaces/debug-symbol";
import { ElanInputOutput } from "../../compiler/compiler-interfaces/elan-input-output";
import { checkForUnclosedHtmlTag, sanitiseHtml } from "./web-helpers";

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
  breakPoint(
    _allScopedSymbols: DebugSymbol[],
    _id: string,
    _singlestep: boolean,
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
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

  drawBlockGraphics(html: string): Promise<void> {
    document.getElementById("block-graphics")!.innerHTML = html;
    this.display.focus();
    return Promise.resolve();
  }

  clearBlockGraphics(): Promise<void> {
    this.clearKeyBuffer();
    return this.drawBlockGraphics("");
  }

  drawVectorGraphics(html: string): Promise<void> {
    document.getElementById("vector-graphics")!.innerHTML = html;
    this.display.focus();
    return Promise.resolve();
  }

  clearVectorGraphics(): Promise<void> {
    this.clearKeyBuffer();
    return this.drawVectorGraphics("");
  }

  async clearDisplay(): Promise<void> {
    this.clearKeyBuffer();
    await this.clearPrintedText();
    await this.clearHtml();
    await this.clearBlockGraphics();
    return this.clearVectorGraphics();
  }

  finished() {
    this.cancelWaits = true;
  }

  cancelWaits: boolean = false;
  printedText: string = "";
  currentInterval?: any;

  async printLine(text: string): Promise<void> {
    await this.print(`${text}\n`);
    const element = document.getElementById("printed-text")!;
    element.scrollTop = element.scrollHeight;
    return Promise.resolve();
  }

  async print(text: string): Promise<void> {
    this.printedText = `${this.printedText}${sanitiseHtml(text)}`;
    await this.renderPrintedText();
    return Promise.resolve();
  }

  async printTab(position: number, text: string): Promise<void> {
    const lastNl = this.printedText.lastIndexOf("\n");
    const spaces =
      "                                                                                ";
    const charsSinceNl = this.printedText.length - lastNl;
    const tab = spaces.substring(0, position - charsSinceNl + 1);
    this.printedText = `${this.printedText}${tab}${sanitiseHtml(text)}`;
    await this.renderPrintedText();
    return Promise.resolve();
  }

  stopReading(): Promise<void> {
    clearInterval(this.currentInterval);
    this.display.focus();
    return Promise.resolve();
  }

  async readLine() {
    await this.renderPrintedText();

    const div = document.getElementById("printed-text")!;
    const inp = document.createElement("input");
    inp.id = "inp";
    inp.type = "text";
    inp.autofocus = true;
    inp.tabIndex = 2;

    div.appendChild(inp);

    inp.focus();

    this.cancelWaits = false;
    return new Promise<string>((rs) => {
      let entered = false;
      inp.addEventListener("keydown", (k: KeyboardEvent) => {
        entered = k.key === "Enter";
      });
      this.currentInterval = setInterval(async () => {
        if (this.cancelWaits) {
          clearInterval(this.currentInterval);
          rs("");
        } else if (entered) {
          rs(inp.value);
          this.stopReading();
          const v = inp.value.replace(/</g, "&lt;");

          div.removeChild(inp);
          await this.printLine(v);
        }
      }, 250);
    });
  }

  waitForAnyKey(): Promise<void> {
    this.cancelWaits = false;
    return new Promise<void>((rs) => {
      const timeOut = setInterval(async () => {
        if (this.cancelWaits || (await this.getKey()) !== "") {
          clearInterval(timeOut);
          rs();
        }
      }, 250);
    });
  }

  waitForKey(): Promise<string> {
    this.cancelWaits = false;
    return new Promise<string>((rs) => {
      const timeOut = setInterval(async () => {
        const key = await this.getKey();
        if (this.cancelWaits || key !== "") {
          clearInterval(timeOut);
          rs(key);
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

  clearKeyBuffer(): Promise<void> {
    this.keyBuffer = [];
    return Promise.resolve();
  }

  clearSystemInfo(): Promise<void> {
    document.getElementById("system-info")!.innerHTML = "";
    return Promise.resolve();
  }

  async renderPrintedText(): Promise<void> {
    const div = document.getElementById("printed-text")!;
    div.innerHTML = this.printedText;
    return Promise.resolve();
  }

  async clearPrintedText(): Promise<void> {
    this.printedText = "";
    await this.renderPrintedText();
    return Promise.resolve();
  }

  wrapHtmlInSrcdoc(s: string) {
    return `<head><link href='styles/ide.css' rel='stylesheet'/></head><body><div id='display-html'>${s}</div></body>`;
  }

  wrapHtmlInIframe(s: string) {
    return `<iframe id="display-html-sandbox" sandbox seamless srcdoc="${this.wrapHtmlInSrcdoc(s)}"</iframe>`;
  }

  drawHtml(html: string): Promise<void> {
    checkForUnclosedHtmlTag(html);
    const div = document.getElementById("display-html")!;

    const iframe = document.getElementById("display-html-sandbox") as HTMLIFrameElement | undefined;

    if (!iframe) {
      div.innerHTML = this.wrapHtmlInIframe(html);
    } else {
      iframe.srcdoc = this.wrapHtmlInSrcdoc(html);
    }

    return new Promise((rs) => setTimeout(() => rs(), 50));
  }

  clearHtml(): Promise<void> {
    document.getElementById("display-html")!.innerHTML = "";
    return Promise.resolve();
  }

  _audioCtx: AudioContext | undefined;

  get audioCtx() {
    if (!this._audioCtx) {
      this._audioCtx = new AudioContext();
    }
    return this._audioCtx;
  }

  tone(duration: number, frequency: number, volume: number): Promise<void> {
    return new Promise((rs) => {
      const ac = this.audioCtx;
      const oscillator = ac.createOscillator();
      const gainNode = ac.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ac.destination);

      gainNode.gain.value = volume;
      oscillator.frequency.value = frequency;
      oscillator.type = "sine";

      oscillator.onended = (_e) => rs();

      oscillator.start(ac.currentTime);
      oscillator.stop(ac.currentTime + duration / 1000);
    });
  }
}

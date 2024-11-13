/* eslint-disable @typescript-eslint/no-explicit-any */
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

  handleUpload(event: Event) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const elanFile = (event.target as any).files?.[0] as any;

    if (elanFile) {
      const fileName = elanFile.name;
      document.body.style.cursor = "wait";
      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      reader.addEventListener("load", (event: any) => {
        const rawCode = event.target.result;
      });
      reader.readAsText(elanFile);
    }

    event.preventDefault();
  }

  chooser() {
    const f = document.createElement("input");
    const g = document.getElementById("graphics") as HTMLElement;
    f.style.display = "none";
    f.type = "file";
    f.name = "file";
    //f.accept = ".elan";
    g.appendChild(f);
    return f;
  }

  chromeChooser() {
    const f = document.createElement("input");
    const g = document.getElementById("graphics") as HTMLElement;
    g.appendChild(f);
    return f;
  }

  readFileChrome(): Promise<string> {
    let fileHandle;

    const chooser = this.chromeChooser();

    return new Promise<string>((rs, rj) => {
      chooser.addEventListener("click", async () => {
        [fileHandle] = await window.showOpenFilePicker({
          startIn: "documents",
        });
        const file = await fileHandle.getFile();

        if (file.type !== "text/plain") {
          rj(`cannot load non text file ${file.name} of type ${file.type}`);
        } else {
          const contents = await file.text();
          rs(contents);
        }
      });

      chooser.click();
    });
  }

  readFile(): Promise<string> {
    if ("showOpenFilePicker" in self) {
      // The `showOpenFilePicker()` method of the File System Access API is supported.
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
      inp.click();
    });
  }

  writeFileChrome(fileName: string, data: string): Promise<void> {
    return self
      .showSaveFilePicker({
        suggestedName: fileName,
        startIn: "documents",
      })
      .then((fh) => fh.createWritable())
      .then((writeable) => writeable.write(data).then(() => writeable))
      .then((writeable) => writeable.close());
  }

  writeFile(fileName: string, data: string): Promise<void> {
    if (!fileName) {
      fileName = "untitled.txt";
    }

    if (!fileName.endsWith(".txt")) {
      fileName = `${fileName}.txt`;
    }

    if ("showSaveFilePicker" in self) {
      // The `showOpenFilePicker()` method of the File System Access API is supported.
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
        rj(e);
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

  waitForAnyKey(): Promise<void> {
    let k = "";
    while (k === "") {
      k = this.peekKey();
    }
    return Promise.resolve();
  }

  private peekKey(): string {
    this.graphics.focus();
    const buffer = this.keyBuffer;
    let ks = "";
    if (buffer.length > 0) {
      ks = buffer[buffer.length - 1].key;
    }
    return ks;
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

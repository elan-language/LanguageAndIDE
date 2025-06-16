import { ElanInputOutput } from "../../src/elan-input-output";
import { checkForUnclosedHtmlTag } from "../../src/web/web-helpers";

export class TestInputOutput implements ElanInputOutput {


  drawHtml(html: string): Promise<void> {
    this.drawn = html;
    return Promise.resolve();
  }
  
  waitForAnyKey(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  writeFile(path: string, data: string): Promise<void> {
    this.printed = data;
    return Promise.resolve();
  }
  
  readFile(): Promise<string> {
    return Promise.resolve("Line1 \n Line2\n\rLine3");
  }
  
  getKey(): Promise<string> {
    return Promise.resolve("");
  }

  waitForKey(): Promise<string> {
    return Promise.resolve("");
  }

  getKeyWithModifier(): Promise<[string, string]> {
    const t = ["", ""] as [string, string];
    return  Promise.resolve(t);
  }
  clearKeyBuffer(): Promise<void> {
    return Promise.resolve();
  }

  printed: string = "";
  inputed: string = "";
  drawn: string = "";

  drawBlockGraphics(html: string): Promise<void> {
    this.drawn = html;
    return Promise.resolve();
  }
  clearBlockGraphics(): Promise<void> {
    this.drawn = "";
    return Promise.resolve();
  }
  drawVectorGraphics(html: string): Promise<void> {
    this.drawn = html;
    return Promise.resolve();
  }
  clearVectorGraphics(): Promise<void> {
    this.drawn = "";
    return Promise.resolve();
  }
  clearDisplay(): Promise<void> {
    this.drawn = "";
    return Promise.resolve();
  }
  print(line: string): Promise<void> {
    checkForUnclosedHtmlTag(line);
    this.printed = this.printed + line;
    return Promise.resolve();
  }
  printLine(line: string): Promise<void> {
    this.print(line); //Currently, newline is not added for testing purposes
    return Promise.resolve();
  }
  printTab(position: number, text: string): Promise<void> {
    const charsSinceNl = this.printed.length;
    const spaces =
      "                                                                                ";
    const tab = spaces.substring(0, position - charsSinceNl);
    this.print(`${tab}${text}`);
    return Promise.resolve();
  }
  readLine(): Promise<string> {
    return Promise.resolve(this.inputed);
  }
  clearPrintedText(): Promise<void> {
    this.printed = "";
    return Promise.resolve();
  }
  clearSystemInfo(): Promise<void> {
    this.printed = "";
    return Promise.resolve();
  }
  clearHtml(): Promise<void> {
    this.drawn = "";
    return Promise.resolve();
  }
  
  tone(_duration: number, _frequency: number, _volume: number): Promise<void> {
    return Promise.resolve();
  }
}
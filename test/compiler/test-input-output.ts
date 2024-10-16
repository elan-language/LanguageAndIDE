import { ElanInputOutput } from "../../src/elan-input-output";
import { hasHiddenType } from "../../src/has-hidden-type";

export class TestInputOutput implements ElanInputOutput {
  readFile(path: string): Promise<string> {
    return Promise.resolve("test file content");
  }
  
  getKeystroke(): Promise<string> {
    return Promise.resolve("");
  }

  getKeystrokeWithModifier(): Promise<[string, string]> {
    const t = ["", ""] as [string, string];
    (t as unknown as hasHiddenType)._type = "Tuple";
    return  Promise.resolve(t);
  }
  clearKeyBuffer(): void {}
  printed: string = "";
  inputed: string = "";
  drawn: string = "";

  drawGraphics(html: string): void {
    this.drawn = html;
  }
  clearGraphics(): void {
    this.drawn = "";
  }
  print(line: string): void {
    this.printed = this.printed + line;
  }
  printLine(line: string): void {
    this.print(line); //Currently, newline is not added for testing purposes
  }
  printTab(position: number, text: string): void {
    const charsSinceNl = this.printed.length;
    const spaces =
      "                                                                                ";
    const tab = spaces.substring(0, position - charsSinceNl);
    this.print(`${tab}${text}`);
  }
  readLine(): Promise<string> {
    return Promise.resolve(this.inputed);
  }
  clearConsole(): void {
    this.printed = "";
  }
}
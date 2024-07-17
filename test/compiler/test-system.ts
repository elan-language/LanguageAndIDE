import { ElanInputOutput } from "../../src/elan-input-output";
import { System } from "../../src/system";

export class TestInputOutput implements ElanInputOutput {
  getKeystroke(): string {
    return "";
  }
  getKeystrokeWithModifier(): [string, string] {
    return ["", ""];
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

export function getTestSystem(input: string) {
  const tc = new TestInputOutput();
  tc.inputed = input;
  const system = new System(tc);
  return system;
}

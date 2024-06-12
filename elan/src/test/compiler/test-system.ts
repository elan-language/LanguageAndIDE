import { ElanInputOutput } from "../../elan-input-output";
import { System } from "../../system";

export class TestInputOutput implements ElanInputOutput {
  readKey(): string {
    return "";
  }
  readKeyWithModifier(): [string, string] {
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
  printLine(line: string): void {
    this.printed = this.printed + line;
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

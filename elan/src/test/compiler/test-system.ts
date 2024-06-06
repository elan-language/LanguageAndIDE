import { IElanConsole } from "../../elan-io";
import { System } from "../../system";

export class TestConsole implements IElanConsole {
  printed: string = "";
  inputed: string = "";

  printLine(line: string): void {
    this.printed = this.printed + line;
  }
  readLine(): Promise<string> {
    return Promise.resolve(this.inputed);
  }
}

export function getTestSystem(input: string) {
  const system = new System();
  const tc = new TestConsole();
  tc.inputed = input;
  system.elanConsole = tc;
  return system;
}

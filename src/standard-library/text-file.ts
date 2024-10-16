import {
  ElanBoolean,
  elanFunction,
  elanProcedure,
  ElanString,
  FunctionOptions,
  ProcedureOptions,
} from "../elan-type-annotations";
import { System } from "../system";

export class TextFile {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new TextFile();
  }

  constructor() {}

  private system?: System;

  fileName: string = "";
  content: string[] = [];
  currentLine = 0;

  @elanFunction(FunctionOptions.impure, ElanString)
  readLine(): string {
    let line = "";

    if (this.currentLine < this.content.length) {
      line = this.content[this.currentLine];
      this.currentLine++;
    }

    return line;
  }

  @elanFunction(FunctionOptions.impure, ElanString)
  readToEnd(): string {
    return this.content.join("\n");
  }

  @elanProcedure(ProcedureOptions.async)
  writeLine(data: string) {
    this.content.push(data);
  }

  @elanProcedure(ProcedureOptions.async)
  close() {
    this.system!.elanInputOutput.writeFile(this.fileName, this.readToEnd());
  }

  @elanFunction(FunctionOptions.pure, ElanBoolean)
  endOfFile(): boolean {
    return this.currentLine >= this.content.length;
  }
}

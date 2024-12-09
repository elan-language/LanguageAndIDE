import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ElanBoolean,
  elanFunction,
  elanProcedure,
  ElanString,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

export class TextFileReader {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new TextFileReader();
  }

  constructor() {}

  private system?: System;

  status: number = 0; //0 = Closed, 1 = Open
  content: string[] = [];
  currentLine = 0;

  @elanFunction([], FunctionOptions.impure, ElanString)
  readLine(): string {
    if (this.status === 0) {
      throw new ElanRuntimeError("Cannot use any method on a closed file");
    }
    let line = "";
    if (this.currentLine < this.content.length) {
      line = this.content[this.currentLine].trim();
      this.currentLine++;
    }

    return line;
  }

  @elanFunction([], FunctionOptions.impure, ElanString)
  readWholeFile(): string {
    if (this.status === 0) {
      throw new ElanRuntimeError("Cannot use any method on a closed file");
    }
    this.status = 0;
    return this.content.join("\n");
  }

  @elanProcedure([])
  close() {
    if (this.status === 0) {
      throw new ElanRuntimeError("Cannot use any method on a closed file");
    }
    this.status = 0;
  }

  @elanFunction([], FunctionOptions.pure, ElanBoolean)
  endOfFile(): boolean {
    if (this.status === 0) {
      throw new ElanRuntimeError("Cannot use any method on a closed file");
    }
    return this.currentLine >= this.content.length;
  }
}

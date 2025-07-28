import { ElanRuntimeError } from "../../ide/elan-runtime-error";
import { System } from "../../ide/system";
import {
  elanFunction,
  FunctionOptions,
  ElanString,
  elanProcedure,
  ElanBoolean,
} from "../elan-type-annotations";

export class TextFileReader {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new TextFileReader();
  }

  async _initialise() {
    return this;
  }

  constructor() {}

  private system?: System;

  status: number = 0; //0 = Closed, 1 = Open
  content: string[] = [];
  currentLine = 0;

  @elanFunction([], FunctionOptions.impure, ElanString)
  readLine(): string {
    if (this.status === 0) {
      throw new ElanRuntimeError(this.cannotUseOnClosed);
    }
    let line = "";
    if (this.currentLine < this.content.length) {
      line = this.content[this.currentLine].trim();
      this.currentLine++;
    }

    return line;
  }

  cannotUseOnClosed = "Cannot use any method on a closed file";

  @elanFunction([], FunctionOptions.impure, ElanString)
  readWholeFile(): string {
    if (this.status === 0) {
      throw new ElanRuntimeError(this.cannotUseOnClosed);
    }
    this.status = 0;
    return this.content.join("\n");
  }

  @elanProcedure([])
  close() {
    if (this.status === 0) {
      throw new ElanRuntimeError(this.cannotUseOnClosed);
    }
    this.status = 0;
  }

  @elanFunction([], FunctionOptions.pure, ElanBoolean)
  endOfFile(): boolean {
    if (this.status === 0) {
      throw new ElanRuntimeError(this.cannotUseOnClosed);
    }
    return this.currentLine >= this.content.length;
  }
}

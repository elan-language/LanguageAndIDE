import {
  ElanBoolean,
  elanFunction,
  elanProcedure,
  ElanString,
  FunctionOptions,
  ProcedureOptions,
} from "./elan-type-annotations";
import { System } from "./system";

export class TextFile {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new TextFile();
  }

  constructor() {}

  private system?: System;

  @elanFunction(FunctionOptions.impureAsync, ElanString)
  readLine(): Promise<string> {
    return Promise.resolve("");
  }

  @elanFunction(FunctionOptions.impureAsync, ElanString)
  readToEnd(): Promise<string> {
    return Promise.resolve("");
  }

  @elanProcedure(ProcedureOptions.async)
  writeLine(data: string) {
    return Promise.resolve();
  }

  @elanProcedure(ProcedureOptions.async)
  close() {
    return Promise.resolve();
  }

  @elanFunction(FunctionOptions.pureAsync, ElanBoolean)
  endOfFile(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

import {
  elanFunction,
  elanProcedure,
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

  @elanFunction(FunctionOptions.impureAsync)
  readLine(): Promise<string> {
    return Promise.resolve("");
  }

  @elanFunction(FunctionOptions.impureAsync)
  readToEnd(): Promise<string> {
    return Promise.resolve("");
  }

  @elanProcedure(ProcedureOptions.async)
  writeLine(data: string): Promise<void> {
    return Promise.resolve();
  }

  @elanProcedure(ProcedureOptions.async)
  close(): Promise<void> {
    return Promise.resolve();
  }

  @elanFunction(FunctionOptions.pureAsync)
  endOfFile(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

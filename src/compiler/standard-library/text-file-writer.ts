import { System } from "../../ide/system";
import { elanProcedure, ProcedureOptions } from "../elan-type-annotations";
import { ElanRuntimeError } from "./elan-runtime-error";

export class TextFileWriter {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new TextFileWriter();
  }

  async _initialise() {
    return this;
  }

  constructor() {}

  private system?: System;

  status: number = 0; //0 = Closed, 1 = Open
  fileName: string = "";
  content: string[] = [];
  currentLine = 0;
  cannotUseOnClosed = "Cannot use any method on a closed file";

  @elanProcedure([])
  writeLine(data: string) {
    if (this.status === 0) {
      throw new ElanRuntimeError(this.cannotUseOnClosed);
    }
    this.content.push(data);
  }

  @elanProcedure([], ProcedureOptions.async)
  async writeWholeFile(data: string) {
    if (this.status === 0) {
      throw new ElanRuntimeError(this.cannotUseOnClosed);
    }
    if (this.content.length > 0) {
      throw new ElanRuntimeError(
        "Cannot call 'writeWholeFile' if content has already been written using 'writeLine'",
      );
    }
    this.status = 0;
    try {
      await this.system!.elanInputOutput.writeFile(this.fileName, data);
    } catch (e) {
      throw new ElanRuntimeError(e as Error);
    }
  }

  @elanProcedure([], ProcedureOptions.async)
  async saveAndClose() {
    if (this.status === 0) {
      throw new ElanRuntimeError(this.cannotUseOnClosed);
    }
    this.status = 0;
    try {
      await this.system!.elanInputOutput.writeFile(this.fileName, this.content.join("\n"));
    } catch (e) {
      throw new ElanRuntimeError(e as Error);
    }
  }
}

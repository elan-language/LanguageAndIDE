import { ElanRuntimeError } from "../elan-runtime-error";
import { elanProcedure, ProcedureOptions } from "../elan-type-annotations";
import { System } from "../system";

export class TextFileWriter {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new TextFileWriter();
  }

  constructor() {}

  private system?: System;

  status: number = 0; //0 = Closed, 1 = Open
  fileName: string = "";
  content: string[] = [];
  currentLine = 0;

  @elanProcedure()
  writeLine(data: string) {
    if (this.status === 0) {
      throw new ElanRuntimeError("Cannot use any method on a closed file");
    }
    this.content.push(data);
  }

  @elanProcedure(ProcedureOptions.async)
  saveAndClose() {
    if (this.status === 0) {
      throw new ElanRuntimeError("Cannot use any method on a closed file");
    }
    this.status = 0;
    return this.system!.elanInputOutput.writeFile(this.fileName, this.content.join("\n"));
  }
}

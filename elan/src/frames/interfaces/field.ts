import { Frame } from "./frame";
import { Selectable } from "./selectable";
import { File } from "../interfaces/file";
import { CompileError } from "../compile-error";
import { CompileStatus } from "../status-enums";
import { Overtyper } from "../overtyper";

export interface Field extends Selectable {
  isField: boolean;
  getHolder(): Frame | File; //File because of GlobalSelector
  compileErrors: CompileError[];
  readCompileStatus(): CompileStatus;
  resetCompileStatusAndErrors(): void;
  aggregateCompileErrors(): CompileError[];
  overtyper: Overtyper;
}

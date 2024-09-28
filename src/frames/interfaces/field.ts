import { CompileError } from "../compile-error";
import { File } from "../interfaces/file";
import { Overtyper } from "../overtyper";
import { CompileStatus } from "../status-enums";
import { ElanSymbol } from "./elan-symbol";
import { Frame } from "./frame";
import { Selectable } from "./selectable";

export interface Field extends Selectable {
  isField: boolean;
  getHolder(): Frame | File; //File because of GlobalSelector
  compileErrors: CompileError[];
  readCompileStatus(): CompileStatus;
  resetCompileStatusAndErrors(): void;
  aggregateCompileErrors(): CompileError[];
  overtyper: Overtyper;
  updateCompileStatus(): void;
  autocompleteSymbols: ElanSymbol[];
}

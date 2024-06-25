import { CompileError } from "../compile-error";
import { File } from "../interfaces/file";
import { Overtyper } from "../overtyper";
import { CompileStatus } from "../status-enums";
import { Frame } from "./frame";
import { Scope } from "./scope";
import { Selectable } from "./selectable";
import { ElanSymbol } from "./symbol";

export interface Field extends Selectable {
  isField: boolean;
  getHolder(): Frame | File; //File because of GlobalSelector
  compileErrors: CompileError[];
  readCompileStatus(): CompileStatus;
  resetCompileStatusAndErrors(): void;
  aggregateCompileErrors(): CompileError[];
  overtyper: Overtyper;
  updateCompileStatus(): void;

  matchingSymbolsForId(scope: Scope): ElanSymbol[];
  autocompleteSymbols: ElanSymbol[];
}

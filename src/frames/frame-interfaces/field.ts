import { SymbolWrapper } from "../../compiler/symbols/symbol-wrapper";
import { Overtyper } from "../overtyper";
import { CompileStatus } from "../status-enums";
import { File } from "./file";
import { Frame } from "./frame";
import { Selectable } from "./selectable";

export interface Field extends Selectable {
  isField: boolean;
  getHolder(): Frame | File; //File because of GlobalSelector
  readCompileStatus(): CompileStatus;
  resetCompileStatusAndErrors(): void;

  overtyper: Overtyper;
  updateCompileStatus(): void;
  allPossibleSymbolCompletions: SymbolWrapper[];
  helpActive: boolean;
}

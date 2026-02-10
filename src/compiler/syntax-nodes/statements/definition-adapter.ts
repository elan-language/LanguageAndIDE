import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import {
  getDeconstructionIds,
  isLocalConstant,
  isVariable,
} from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { Definition } from "../../compiler-interfaces/definition";

export class DefinitionAdapter implements Definition {
  constructor(
    private readonly adapted: ElanSymbol,
    index: number,
  ) {
    const ids = getDeconstructionIds(adapted.symbolId);
    this.symbolId = ids[index];
    this.symbolScope = adapted.symbolScope;
  }

  isLocalConstant() {
    return isLocalConstant(this.adapted);
  }

  isVariable() {
    return isVariable(this.adapted);
  }

  symbolId: string;
  symbolType(): SymbolType {
    return this.adapted.symbolType();
  }
  symbolScope: SymbolScope;
}

import { ElanSymbol } from "../interfaces/elan-symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { getDeconstructionIds, isLetStatement, isVarStatement } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { Transforms } from "../syntax-nodes/transforms";

export class DefinitionAdapter implements ElanSymbol {
  constructor(
    private readonly adapted: ElanSymbol,
    index: number,
  ) {
    const ids = getDeconstructionIds(adapted.symbolId);
    this.symbolId = ids[index];
    this.symbolScope = adapted.symbolScope;

    if (isVarStatement(adapted)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)["isVarStatement"] = true;
    }

    if (isLetStatement(adapted)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)["isLet"] = true;
    }
  }

  symbolId: string;
  symbolType(transforms?: Transforms): SymbolType {
    return this.adapted.symbolType(transforms);
  }
  symbolScope: SymbolScope;
}

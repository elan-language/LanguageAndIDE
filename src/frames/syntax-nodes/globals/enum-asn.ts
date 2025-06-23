import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { SymbolType } from "../../compiler-interfaces/symbol-type";
import { singleIndent } from "../../frame-helpers";
import { Transforms } from "../../frame-interfaces/transforms";
import { EnumType } from "../../symbols/enum-type";
import { EnumValueType } from "../../symbols/enum-value-type";
import { getGlobalScope, symbolMatches } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { transforms } from "../ast-helpers";
import { EmptyAsn } from "../empty-asn";
import { EnumValuesAsn } from "../fields/enum-values-asn";
import { FrameAsn } from "../frame-asn";

export class EnumAsn extends FrameAsn implements ElanSymbol {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  get symbolId() {
    return getId(this.name);
  }

  symbolType(): SymbolType {
    return new EnumType(this.symbolId);
  }

  name: AstNode = EmptyAsn.Instance;
  values: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];

    const name = this.name.compile();
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this.scope),
      transforms(),
      this.compileErrors,
      this.fieldId,
    );

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `const ${name} = {\r
${singleIndent()}${this.values.compile()}\r
};\r
`;
  }

  // TODO move this onto EnumValuesAsn
  enumValueSymbols() {
    if (this.values instanceof EnumValuesAsn) {
      const names = this.values.names;

      return names.map((n) => ({
        symbolId: n,
        symbolType: () => new EnumValueType(getId(this.name), n),
        symbolScope: SymbolScope.program,
      }));
    }

    return [];
  }

  resolveSymbol(id: string, transforms: Transforms, _initialScope: Scope): ElanSymbol {
    for (const n of this.enumValueSymbols()) {
      if (n.symbolId === id) {
        return n;
      }
    }

    return this.getParentScope().resolveSymbol(id, transforms, this);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const otherMatches = this.getParentScope().symbolMatches(id, all, this);
    const symbols = this.enumValueSymbols();
    const matches = symbolMatches(id, all, symbols);
    return matches.concat(otherMatches);
  }
}

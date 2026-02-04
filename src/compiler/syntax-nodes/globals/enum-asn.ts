import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { EnumType } from "../../../compiler/symbols/enum-type";
import { getGlobalScope, match, symbolMatches } from "../../../compiler/symbols/symbol-helpers";
import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { isEnumValuesAsn } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class EnumAsn extends BreakpointAsn implements ElanSymbol {
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
    mustBeUniqueNameInScope(name, getGlobalScope(this.scope), this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `const ${name} = {\r
${this.singleIndent()}${this.values.compile()}\r
};\r
`;
  }

  enumValueSymbols() {
    return isEnumValuesAsn(this.values) ? this.values.getSymbols(getId(this.name)) : [];
  }

  resolveSymbol(id: string, caseSensitive: boolean, _initialScope: Scope): ElanSymbol {
    for (const n of this.enumValueSymbols()) {
      if (match(n.symbolId, id, caseSensitive)) {
        return n;
      }
    }

    return this.getParentScope().resolveSymbol(id, caseSensitive, this);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const otherMatches = this.getParentScope().symbolMatches(id, all, this);
    const symbols = this.enumValueSymbols();
    const matches = symbolMatches(id, all, symbols);
    return matches.concat(otherMatches);
  }
}

import { mustBeProcedure } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { FunctionType } from "../../symbols/function-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { isAstIdNode } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class CallAsn extends BreakpointAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  isCall = true;

  term: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];

    const id = isAstIdNode(this.term) ? this.term.id : "";
    const termSymbolType = this.scope.resolveSymbol(id, true, this.scope).symbolType();
    if (termSymbolType instanceof FunctionType) {
      mustBeProcedure(id, termSymbolType, this.symbolScope, this.compileErrors, this.fieldId);
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${this.term.compile()};`;
  }

  resolveSymbol(id: string, caseSensitive: boolean, _initialScope: Scope): ElanSymbol {
    return super.resolveSymbol(id, caseSensitive, this);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, this);
    return matches;
  }
}

import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { ProcedureType } from "../../symbols/procedure-type";
import { getGlobalScope, match } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";

export abstract class AbstractProcedureAsn extends CompoundAsn implements ElanSymbol, Scope {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  methodName: AstNode = EmptyAsn.Instance;
  paramList: AstNode = EmptyAsn.Instance;

  isProcedure = true;

  symbolIsType: boolean = false;

  get symbolId() {
    return getId(this.methodName);
  }

  abstract get symbolScope(): SymbolScope;

  symbolType() {
    const [pn, pt] =
      this.paramList instanceof ParamListAsn ? this.paramList.symbolNamesAndTypes() : [[], []];
    return new ProcedureType(pn, pt, false, true);
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    if (match(getId(this.methodName), id, caseSensitive)) {
      return this;
    }
    const s =
      this.paramList instanceof ParamListAsn
        ? this.paramList.resolveSymbol(id, caseSensitive, this)
        : new UnknownSymbol(id);

    return s instanceof UnknownSymbol ? super.resolveSymbol(id, caseSensitive, initialScope) : s;
  }

  public compile(): string {
    const name = this.methodName.compile();
    mustBeUniqueNameInScope(name, getGlobalScope(this), this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${name}(${this.paramList.compile()}) {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r`;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches =
      this.paramList instanceof ParamListAsn
        ? this.paramList.symbolMatches(id, all, initialScope)
        : [];
    return localMatches.concat(matches);
  }
}

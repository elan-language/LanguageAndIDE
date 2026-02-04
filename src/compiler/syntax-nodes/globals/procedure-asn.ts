import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { ProcedureType } from "../../../compiler/symbols/procedure-type";
import { getGlobalScope, match } from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { UnknownSymbol } from "../../../compiler/symbols/unknown-symbol";
import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";

export abstract class ProcedureAsn extends CompoundAsn implements ElanSymbol, Scope {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  params: AstNode = EmptyAsn.Instance;

  isProcedure = true;

  get symbolId() {
    return getId(this.name);
  }

  abstract get symbolScope(): SymbolScope;

  symbolType() {
    const [pn, pt] =
      this.params instanceof ParamListAsn ? this.params.symbolNamesAndTypes() : [[], []];
    return new ProcedureType(pn, pt, false, true);
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    if (match(getId(this.name), id, caseSensitive)) {
      return this;
    }
    const s =
      this.params instanceof ParamListAsn
        ? this.params.resolveSymbol(id, caseSensitive, this)
        : new UnknownSymbol(id);

    return s instanceof UnknownSymbol ? super.resolveSymbol(id, caseSensitive, initialScope) : s;
  }

  public compile(): string {
    const name = this.name.compile();
    mustBeUniqueNameInScope(name, getGlobalScope(this), this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${name}(${this.params.compile()}) {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r`;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches =
      this.params instanceof ParamListAsn ? this.params.symbolMatches(id, all, initialScope) : [];
    return localMatches.concat(matches);
  }
}

import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { FunctionType } from "../../../compiler/symbols/function-type";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { UnknownSymbol } from "../../../compiler/symbols/unknown-symbol";
import { getId } from "../../compile-rules";
import { match } from "../../symbols/symbol-helpers";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";
import { ReturnAsn } from "../statements/return-asn";

export abstract class FunctionAsn extends CompoundAsn implements ElanSymbol {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  params: AstNode = EmptyAsn.Instance;
  returnType: AstNode = EmptyAsn.Instance;

  get symbolId() {
    return getId(this.name);
  }

  symbolType() {
    const [pn, pt] =
      this.params instanceof ParamListAsn ? this.params.symbolNamesAndTypes() : [[], []];
    const rt = this.returnType.symbolType();
    return new FunctionType(pn, pt, rt, false, true, true);
  }

  get symbolScope() {
    return SymbolScope.program;
  }

  protected getReturnAsn(): ReturnAsn {
    return this.children.filter((s) => s instanceof ReturnAsn)[0];
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
    return `${this.name.compile()}(${this.params.compile()}) {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r`;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches =
      this.params instanceof ParamListAsn ? this.params.symbolMatches(id, all, initialScope) : [];
    return localMatches.concat(matches);
  }
}

import { getId } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { FunctionType } from "../../symbols/function-type";
import { match } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";
import { ReturnStatementAsn } from "../statements/return-statement-asn";

export abstract class AbstractFunctionAsn extends CompoundAsn implements ElanSymbol {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  methodName: AstNode = EmptyAsn.Instance;
  paramList: AstNode = EmptyAsn.Instance;
  type: AstNode = EmptyAsn.Instance;

  symbolIsType: boolean = true;

  get symbolId() {
    return getId(this.methodName);
  }

  symbolType() {
    const [pn, pt] =
      this.paramList instanceof ParamListAsn ? this.paramList.symbolNamesAndTypes() : [[], []];
    const rt = this.type.symbolType();
    return new FunctionType(false, pn, pt, rt, false, true, true);
  }

  get symbolScope() {
    return SymbolScope.program;
  }

  protected getReturnAsn(): ReturnStatementAsn {
    return this.children.filter((s) => s instanceof ReturnStatementAsn)[0];
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
    return `${this.methodName.compile()}(${this.paramList.compile()}) {\r
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

import { getId } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import { Transforms } from "../../frame-interfaces/transforms";
import { functionKeyword } from "../../keywords";
import { FunctionType } from "../../symbols/function-type";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";
import { ReturnAsn } from "../statements/return-asn";

export abstract class FunctionAsn extends FrameWithStatementsAsn implements ElanSymbol {
  isFunction = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  params: AstNode = EmptyAsn.Instance;
  returnType: AstNode = EmptyAsn.Instance;

  initialKeywords(): string {
    return functionKeyword;
  }
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

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    if (getId(this.name) === id) {
      return this;
    }
    const s =
      this.params instanceof ParamListAsn
        ? this.params.resolveSymbol(id, transforms, this)
        : new UnknownSymbol(id);

    return s instanceof UnknownSymbol ? super.resolveSymbol(id, transforms, initialScope) : s;
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

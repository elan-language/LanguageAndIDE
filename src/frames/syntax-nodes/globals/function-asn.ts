import { getId } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Scope } from "../../interfaces/scope";
import { Transforms } from "../../interfaces/transforms";
import { functionKeyword } from "../../keywords";
import { FunctionType } from "../../symbols/function-type";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";
import { ReturnAsn } from "../statements/return-asn";

export abstract class FunctionAsn extends FrameWithStatementsAsn implements ElanSymbol {
  isFunction = true;

  constructor(
    protected readonly name: AstNode,
    protected readonly params: AstNode,
    protected readonly returnType: AstNode,
    protected readonly children: AstNode[],
    fieldId: string,
    scope: Scope,
  ) {
    super(children, fieldId, scope);
  }
  initialKeywords(): string {
    return functionKeyword;
  }
  get symbolId() {
    return getId(this.name);
  }

  symbolType(transforms?: Transforms) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pn, pt] = (this.params as any).symbolNamesAndTypes(transforms);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = (this.params as any).resolveSymbol(id, transforms, initialScope);

    return s instanceof UnknownSymbol ? super.resolveSymbol(id, transforms, initialScope) : s;
  }

  public compile(): string {
    return `${this.name.compile()}(${this.params.compile()}) {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r`;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localMatches = (this.params as any).symbolMatches(id, all, initialScope);
    return localMatches.concat(matches);
  }
}

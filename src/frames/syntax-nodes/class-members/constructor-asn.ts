import { ConcreteClass } from "../../globals/concrete-class";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Member } from "../../interfaces/member";
import { Scope } from "../../interfaces/scope";
import { Transforms } from "../../interfaces/transforms";
import { constructorKeyword } from "../../keywords";
import { ProcedureType } from "../../symbols/procedure-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class ConstructorAsn extends FrameWithStatementsAsn implements ElanSymbol, Member {
  isConstructor = true;
  isMember = true;
  isAbstract = false;
  private = false;

  hrefForFrameHelp: string = "LangRef.html#constructor";

  constructor(
    protected readonly params: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
  }

  public compile(): string {
    this.compileErrors = [];

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}async _initialise(${this.params.compile()}) {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r
${this.indent()}${this.indent()}return this;\r
${this.indent()}}\r
`;
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = (this.params as any).resolveSymbol(id, transforms, this);
    return s instanceof UnknownSymbol ? super.resolveSymbol(id, transforms, initialScope) : s;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localMatches = (this.params as any).symbolMatches(id, all, initialScope);
    return localMatches.concat(matches);
  }

  get symbolId() {
    return `__${constructorKeyword}`;
  }

  symbolType(transforms?: Transforms) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pn, pt] = (this.params as any).symbolNamesAndTypes(transforms);
    return new ProcedureType(pn, pt, false, false);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

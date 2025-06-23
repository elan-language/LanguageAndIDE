import { AstNode } from "../../compiler-interfaces/ast-node";
import { Class } from "../../frame-interfaces/class";
import { ElanSymbol } from "../../frame-interfaces/elan-symbol";
import { Member } from "../../frame-interfaces/member";
import { Scope } from "../../frame-interfaces/scope";
import { Transforms } from "../../frame-interfaces/transforms";
import { constructorKeyword } from "../../keywords";
import { ProcedureType } from "../../symbols/procedure-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class ConstructorAsn extends FrameWithStatementsAsn implements ElanSymbol, Member {
  isConstructor = true;
  isMember = true;
  isAbstract = false;
  private = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  params: AstNode = EmptyAsn.Instance;

  getClass(): Class {
    return this.getParentScope() as Class;
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
    const s =
      this.params instanceof ParamListAsn
        ? this.params.resolveSymbol(id, transforms, this)
        : new UnknownSymbol(id);
    return s instanceof UnknownSymbol ? super.resolveSymbol(id, transforms, initialScope) : s;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches =
      this.params instanceof ParamListAsn ? this.params.symbolMatches(id, all, initialScope) : [];
    return localMatches.concat(matches);
  }

  get symbolId() {
    return `__${constructorKeyword}`;
  }

  symbolType() {
    const [pn, pt] =
      this.params instanceof ParamListAsn ? this.params.symbolNamesAndTypes() : [[], []];
    return new ProcedureType(pn, pt, false, false);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

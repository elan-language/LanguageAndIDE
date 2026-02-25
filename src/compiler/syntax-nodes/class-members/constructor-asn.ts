import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Class } from "../../../compiler/compiler-interfaces/class";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Member } from "../../../compiler/compiler-interfaces/member";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { ProcedureType } from "../../../compiler/symbols/procedure-type";
import {
  getGlobalScope,
  isValueTypeExcludingString,
} from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { UnknownSymbol } from "../../../compiler/symbols/unknown-symbol";
import { mustBeInitialisedInConstructor } from "../../compile-rules";
import { constructorKeyword } from "../../elan-keywords";
import { isAstIdNode } from "../ast-helpers";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";
import { ClassAsn } from "../globals/class-asn";
import { SetAsn } from "../statements/set-asn";

export class ConstructorAsn extends CompoundAsn implements ElanSymbol, Member {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  isMember = true;
  isAbstract = false;
  private = false;

  params: AstNode = EmptyAsn.Instance;

  getClass(): Class {
    return this.getParentScope() as Class;
  }

  public compile(): string {
    this.compileErrors = [];

    const cls = this.getClass();
    const properties = cls instanceof ClassAsn ? cls.properties() : [];

    const toInitProperties = properties.filter((p) => !isValueTypeExcludingString(p.symbolType()));
    const sets = this.children.filter((c) => c instanceof SetAsn);

    const toInitPropertyNames = toInitProperties
      .map((p) => (isAstIdNode(p.name) ? p.name.id : ""))
      .filter((id) => !!id);
    const setPropertyNames = sets
      .map((s) => (isAstIdNode(s.assignable) ? s.assignable.id : ""))
      .filter((id) => !!id);

    for (const name of toInitPropertyNames) {
      if (!setPropertyNames.includes(name)) {
        mustBeInitialisedInConstructor(name, this.compileErrors, this.fieldId);
      }
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}async _initialise(${this.params.compile()}) {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r
${this.indent()}${this.indent()}return this;\r
${this.indent()}}\r
`;
  }

  resolveSymbol(id: string, initialScope: Scope): ElanSymbol {
    const s =
      this.params instanceof ParamListAsn
        ? this.params.resolveSymbol(id, this)
        : new UnknownSymbol(id);
    return s instanceof UnknownSymbol ? super.resolveSymbol(id, initialScope) : s;
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

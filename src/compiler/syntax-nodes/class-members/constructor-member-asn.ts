import { mustBeInitialisedInConstructor } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Class } from "../../compiler-interfaces/class";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Member } from "../../compiler-interfaces/member";
import { Scope } from "../../compiler-interfaces/scope";
import { constructorKeyword } from "../../elan-keywords";
import { ProcedureType } from "../../symbols/procedure-type";
import {
  getAllAbstractClasses,
  getGlobalScope,
  isValueTypeExcludingString,
} from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { isAstIdNode } from "../ast-helpers";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";
import { ClassAsn } from "../globals/class-asn";
import { AssignmentAsn } from "../statements/assignment-asn";
import { PropertyAsn } from "./property-asn";

export class ConstructorMemberAsn extends CompoundAsn implements ElanSymbol, Member {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  isMember = true;
  isAbstract = false;
  private = false;

  symbolIsType: boolean = false;

  paramList: AstNode = EmptyAsn.Instance;

  getClass(): Class {
    return this.getParentScope() as Class;
  }

  public compile(): string {
    this.compileErrors = [];

    let properties: PropertyAsn[] = [];
    const cls = this.getClass();
    if (cls instanceof ClassAsn) {
      const abstractClasses = getAllAbstractClasses(cls, [], cls);
      properties = cls.properties();

      for (const ac of abstractClasses) {
        properties = properties.concat(ac.properties());
      }
    }

    const toInitProperties = properties.filter((p) => !isValueTypeExcludingString(p.symbolType()));
    const sets = this.children.filter((c) => c instanceof AssignmentAsn);

    const toInitPropertyNames = toInitProperties
      .map((p) => (isAstIdNode(p.identifierDef) ? p.identifierDef.id : ""))
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

    return `${this.indent()}async _initialise(${this.paramList.compile()}) {\r
${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r
${this.indent()}${this.indent()}return this;\r
${this.indent()}}\r
`;
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    const s =
      this.paramList instanceof ParamListAsn
        ? this.paramList.resolveSymbol(id, caseSensitive, this)
        : new UnknownSymbol(id);
    return s instanceof UnknownSymbol ? super.resolveSymbol(id, caseSensitive, initialScope) : s;
  }

  public override symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches =
      this.paramList instanceof ParamListAsn
        ? this.paramList.symbolMatches(id, all, initialScope)
        : [];
    return localMatches.concat(matches);
  }

  get symbolId() {
    return `__${constructorKeyword}`;
  }

  symbolType() {
    const [pn, pt] =
      this.paramList instanceof ParamListAsn ? this.paramList.symbolNamesAndTypes() : [[], []];
    return new ProcedureType(pn, pt, false, false);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

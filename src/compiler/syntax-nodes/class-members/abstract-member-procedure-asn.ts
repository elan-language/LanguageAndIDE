import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Class } from "../../compiler-interfaces/class";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Member } from "../../compiler-interfaces/member";
import { Scope } from "../../compiler-interfaces/scope";
import { ProcedureType } from "../../symbols/procedure-type";
import { getClassScope, getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";

export class AbstractMemberProcedureAsn extends BreakpointAsn implements Member, ElanSymbol {
  isAbstract = true;
  isMember: boolean = true;
  private = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  symbolIsType: boolean = false;

  name: AstNode = EmptyAsn.Instance;
  params: AstNode = EmptyAsn.Instance;

  getClass(): Class {
    return this.getParentScope() as Class;
  }

  public override indent(): string {
    return this.singleIndent();
  }

  public override compile(): string {
    this.compileErrors = [];

    const name = this.name.compile();
    mustBeUniqueNameInScope(name, getClassScope(this), this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${name}(${this.params.compile()}) {\r
${this.indent()}}\r
`;
  }

  get symbolId() {
    return getId(this.name);
  }

  symbolType() {
    const [pn, pt] =
      this.params instanceof ParamListAsn ? this.params.symbolNamesAndTypes() : [[], []];
    return new ProcedureType(pn, pt, false, true);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

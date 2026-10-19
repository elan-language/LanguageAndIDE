import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Class } from "../../compiler-interfaces/class";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Member } from "../../compiler-interfaces/member";
import { Scope } from "../../compiler-interfaces/scope";
import { FunctionType } from "../../symbols/function-type";
import { getClassScope, getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";

export class AbstractMemberFunctionAsn extends BreakpointAsn implements Member, ElanSymbol {
  isAbstract = true;
  isMember: boolean = true;
  private = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  symbolIsType: boolean = false;

  name: AstNode = EmptyAsn.Instance;
  params: AstNode = EmptyAsn.Instance;
  returnType: AstNode = EmptyAsn.Instance;

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

    this.returnType.compile();

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    if (name !== "toString") {
      return `${this.indent()}async ${name}(${this.params.compile()}) {\r
${this.indent()}${this.indent()}return ${this.returnType.compile()};\r
${this.indent()}}\r
`;
    }
    return "";
  }

  get symbolId() {
    return getId(this.name);
  }

  symbolType() {
    const [pn, pt] =
      this.params instanceof ParamListAsn ? this.params.symbolNamesAndTypes() : [[], []];
    const rt = this.returnType.symbolType();
    return new FunctionType(false, pn, pt, rt, false, true, true);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Class } from "../../../compiler/compiler-interfaces/class";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Member } from "../../../compiler/compiler-interfaces/member";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { FunctionType } from "../../../compiler/symbols/function-type";
import { getClassScope, getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { singleIndent } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";

export class AbstractFunctionAsn extends BreakpointAsn implements Member, ElanSymbol {
  isAbstract = true;
  isMember: boolean = true;
  private = false;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  params: AstNode = EmptyAsn.Instance;
  returnType: AstNode = EmptyAsn.Instance;

  getClass(): Class {
    return this.getParentScope() as Class;
  }

  public override indent(): string {
    return singleIndent();
  }

  public override compile(): string {
    this.compileErrors = [];

    const name = this.name.compile();
    mustBeUniqueNameInScope(name, getClassScope(this), this.compileErrors, this.fieldId);

    this.returnType.compile();

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    if (name !== "asString") {
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
    return new FunctionType(pn, pt, rt, false, true, true);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

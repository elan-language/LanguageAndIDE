import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { singleIndent } from "../../frame-helpers";
import { Class } from "../../frame-interfaces/class";
import { ElanSymbol } from "../../frame-interfaces/elan-symbol";
import { Member } from "../../frame-interfaces/member";
import { Scope } from "../../frame-interfaces/scope";
import { ProcedureType } from "../../symbols/procedure-type";
import { getClassScope, getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { transforms } from "../ast-helpers";
import { EmptyAsn } from "../empty-asn";
import { ParamListAsn } from "../fields/param-list-asn";
import { FrameAsn } from "../frame-asn";

export class AbstractProcedureAsn extends FrameAsn implements Member, ElanSymbol {
  isAbstract = true;
  isMember: boolean = true;
  private = false;

  hrefForFrameHelp: string = "LangRef.html#Abstract_procedure";

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  params: AstNode = EmptyAsn.Instance;

  getClass(): Class {
    return this.getParentScope() as Class;
  }

  public override indent(): string {
    return singleIndent();
  }

  public override compile(): string {
    this.compileErrors = [];

    const name = this.name.compile();
    mustBeUniqueNameInScope(
      name,
      getClassScope(this),
      transforms(),
      this.compileErrors,
      this.fieldId,
    );

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

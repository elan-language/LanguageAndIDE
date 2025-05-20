import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { singleIndent } from "../../frame-helpers";
import { ConcreteClass } from "../../globals/concrete-class";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Member } from "../../interfaces/member";
import { Scope } from "../../interfaces/scope";
import { Transforms } from "../../interfaces/transforms";
import { ProcedureType } from "../../symbols/procedure-type";
import { getClassScope, getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { transforms } from "../ast-helpers";
import { FrameAsn } from "../frame-asn";

export class AbstractProcedureAsn extends FrameAsn implements Member, ElanSymbol {
  isAbstract = true;
  isMember: boolean = true;
  private = false;

  hrefForFrameHelp: string = "LangRef.html#Abstract_procedure";

  constructor(
    protected readonly name: AstNode,
    protected readonly params: AstNode,
    protected readonly children: AstNode[],
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  getClass(): ConcreteClass {
    return this.getParent() as ConcreteClass;
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

  symbolType(transforms?: Transforms) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pn, pt] = (this.params as any).symbolNamesAndTypes(transforms);
    return new ProcedureType(pn, pt, false, true);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

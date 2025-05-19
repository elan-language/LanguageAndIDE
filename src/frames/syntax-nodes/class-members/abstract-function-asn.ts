import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { singleIndent } from "../../frame-helpers";
import { ConcreteClass } from "../../globals/concrete-class";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Member } from "../../interfaces/member";
import { Scope } from "../../interfaces/scope";
import { Transforms } from "../../interfaces/transforms";
import { FunctionType } from "../../symbols/function-type";
import { getClassScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { transforms } from "../ast-helpers";
import { FrameAsn } from "../frame-asn";

export class AbstractFunctionAsn extends FrameAsn implements Member, ElanSymbol {
  isAbstract = true;
  isMember: boolean = true;
  private = false;

  hrefForFrameHelp: string = "LangRef.html#Abstract_function";

  constructor(
    protected readonly name: AstNode,
    protected readonly params: AstNode,
    protected readonly returnType: AstNode,
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

    this.returnType.compile();

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

  symbolType(transforms?: Transforms) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pn, pt] = (this.params as any).symbolNamesAndTypes(transforms);
    const rt = this.returnType.symbolType();
    return new FunctionType(pn, pt, rt, false, true, true);
  }

  get symbolScope() {
    return SymbolScope.member;
  }
}

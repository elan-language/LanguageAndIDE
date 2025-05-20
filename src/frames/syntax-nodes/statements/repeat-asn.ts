import { mustBeOfType } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { BooleanType } from "../../symbols/boolean-type";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class RepeatAsn extends FrameWithStatementsAsn {
  isStatement: boolean = true;

  hrefForFrameHelp: string = "LangRef.html#repeat";

  constructor(
    private readonly condition: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  compile(): string {
    this.compileErrors = [];
    mustBeOfType(this.condition, BooleanType.Instance, this.compileErrors, this.fieldId);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}do {\r
${this.compileChildren()}\r
${this.indent()}} while (!(${this.condition.compile()}));`;
  }
}

import { mustBeOfType, mustNotHaveConditionalAfterUnconditionalElse } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { BooleanType } from "../../symbols/boolean-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { compileNodes } from "../ast-helpers";
import { EmptyAsn } from "../empty-asn";
import { FrameAsn } from "../frame-asn";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";
import { ElseAsn } from "./else-asn";

export class IfAsn extends FrameWithStatementsAsn {
  isStatement = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  condition: AstNode = EmptyAsn.Instance;

  reconfigureForCompile(): AstNode[] {
    const ifChildren: AstNode[] = [];
    let currentElse: ElseAsn | undefined = undefined;

    for (const c of this.children) {
      if (c instanceof ElseAsn) {
        currentElse = c;
        currentElse.setCompileScope(this);
        ifChildren.push(c);
      } else if (currentElse) {
        (c as FrameAsn).setCompileScope(currentElse);
        currentElse.addChild(c);
      } else {
        ifChildren.push(c);
      }
    }

    return ifChildren;
  }

  compile(): string {
    this.compileErrors = [];

    mustBeOfType(this.condition, BooleanType.Instance, this.compileErrors, this.fieldId);
    const elses = this.children.filter((c) => c instanceof ElseAsn) as ElseAsn[];
    let toCompile = this.children;

    if (elses.length > 0) {
      mustNotHaveConditionalAfterUnconditionalElse(elses, this.compileErrors, this.fieldId);
      toCompile = this.reconfigureForCompile();
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}if (${this.condition.compile()}) {\r
${compileNodes(toCompile)}\r
${this.indent()}}`;
  }
}

import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { BooleanType } from "../../../compiler/symbols/boolean-type";
import { getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { mustBeOfType, mustNotHaveConditionalAfterUnconditionalElse } from "../../compile-rules";
import { compileNodes } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";
import { ElseAsn } from "./else-asn";

export class IfAsn extends CompoundAsn {
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
        (c as BreakpointAsn).setCompileScope(currentElse);
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

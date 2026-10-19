import { mustBeOfType, mustNotHaveConditionalAfterUnconditionalElse } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../compiler-interfaces/scope";
import { BooleanType } from "../../symbols/boolean-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { compileNodes } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";
import { ElseClauseAsn } from "./else-clause-asn";

export class IfStatementAsn extends CompoundAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  condition: AstNode = EmptyAsn.Instance;

  reconfigureForCompile(): AstNode[] {
    const ifChildren: AstNode[] = [];
    let currentElse: ElseClauseAsn | undefined = undefined;

    for (const c of this.children) {
      if (c instanceof ElseClauseAsn) {
        currentElse = c;
        currentElse.setCompileScope(this);
        ifChildren.push(c);
      } else if (currentElse) {
        if (c instanceof BreakpointAsn) {
          c.setCompileScope(currentElse);
          currentElse.addChild(c);
        }
      } else {
        ifChildren.push(c);
      }
    }

    return ifChildren;
  }

  compile(): string {
    this.compileErrors = [];

    mustBeOfType(
      this.condition,
      BooleanType.Instance,
      this.compileErrors,
      this.fieldId,
      this.scope,
    );
    const elses = this.children.filter((c) => c instanceof ElseClauseAsn);
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

import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { compileNodes } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { CompoundAsn } from "../compound-asn";
import { CatchAsn } from "./catch-asn";
import { CatchCaseAsn } from "./catch-case-asn";

export class TryAsn extends CompoundAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  reconfigureForCompile(): AstNode[] {
    const tryChildren: AstNode[] = [];
    let currentCatch: CatchAsn | undefined = undefined;
    let currentCaseCatch: CatchCaseAsn | undefined = undefined;

    for (const c of this.children) {
      if (c instanceof CatchCaseAsn) {
        if (!currentCatch) {
          currentCatch = new CatchAsn(this.fieldId, this);
          tryChildren.push(currentCatch);
        }
        currentCaseCatch = c;
        currentCaseCatch.setCompileScope(this);
        currentCatch.addChild(c);
      } else if (currentCaseCatch) {
        if (c instanceof BreakpointAsn) {
          c.setCompileScope(currentCaseCatch);
          currentCaseCatch.addChild(c);
        }
      } else {
        tryChildren.push(c);
      }
    }

    return tryChildren;
  }

  compile(): string {
    this.compileErrors = [];

    const toCompile = this.reconfigureForCompile();

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}try {\r
${compileNodes(toCompile)}\r
${this.indent()}}`;
  }
}

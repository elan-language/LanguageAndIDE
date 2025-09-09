import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { compileNodes } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { CompoundAsn } from "../compound-asn";
import { CatchAsn } from "./catch-asn";

export class TryAsn extends CompoundAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  reconfigureForCompile(): AstNode[] {
    const tryChildren: AstNode[] = [];
    let currentCatch: CatchAsn | undefined = undefined;

    for (const c of this.children) {
      if (c instanceof CatchAsn) {
        currentCatch = c;
        currentCatch.setCompileScope(this);
        tryChildren.push(c);
      } else if (currentCatch) {
        (c as BreakpointAsn).setCompileScope(currentCatch);
        currentCatch.addChild(c);
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

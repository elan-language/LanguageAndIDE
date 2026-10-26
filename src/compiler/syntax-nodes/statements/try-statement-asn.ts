import { Scope } from "../../compiler-interfaces/scope";
import { CompoundAsn } from "../compound-asn";

export class TryStatementAsn extends CompoundAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  // reconfigureForCompile(): AstNode[] {
  //   const tryChildren: AstNode[] = [];
  //   // let currentCatch: CatchAsn | undefined = undefined;
  //   // let currentCaseCatch: CatchStatementAsn | undefined = undefined;

  //   // for (const c of this.children) {
  //   //   if (c instanceof CatchStatementAsn) {
  //   //     if (!currentCatch) {
  //   //       currentCatch = new CatchAsn(this.fieldId, this);
  //   //       currentCatch.variable = c.identifierDef;
  //   //       tryChildren.push(currentCatch);
  //   //     }
  //   //     currentCaseCatch = c;
  //   //     currentCaseCatch.setCompileScope(currentCatch);
  //   //     currentCatch.addChild(c);
  //   //   } else if (currentCaseCatch) {
  //   //     if (c instanceof BreakpointAsn) {
  //   //       c.setCompileScope(currentCaseCatch);
  //   //       currentCaseCatch.addChild(c);
  //   //     }
  //   //   } else {
  //   //     tryChildren.push(c);
  //   //   }
  //   //}
  //   return tryChildren;
  // }

  compile(): string {
    this.compileErrors = [];

    //const toCompile = this.reconfigureForCompile();

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}try {\r
${this.compileChildren()}\r
${this.indent()}}`;
  }
}

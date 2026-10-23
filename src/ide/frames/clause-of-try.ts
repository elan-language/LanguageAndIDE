import { Clause } from "./frame-interfaces/clause";
import { Statement } from "./frame-interfaces/statement";
import { FrameWithStatements } from "./frame-with-statements";

export abstract class ClauseOfTry extends FrameWithStatements implements Statement, Clause {
  isClause = true;
  isClauseOfTry: boolean = true;
  isStatement: boolean = true;

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
  }

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  outerHtmlTag: string = "el-statement";
}

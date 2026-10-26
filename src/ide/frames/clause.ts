import { Statement } from "./frame-interfaces/statement";
import { FrameWithStatements } from "./frame-with-statements";

export abstract class Clause extends FrameWithStatements implements Statement {
  isClause = true;
  isStatement: boolean = true;
  outerHtmlTag: string = "el-statement";

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
}

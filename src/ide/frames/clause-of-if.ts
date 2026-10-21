import { Clause } from "./frame-interfaces/clause";
import { Statement } from "./frame-interfaces/statement";
import { FrameWithStatements } from "./frame-with-statements";
import { IfStatement } from "./statements/if-statement";

export abstract class ClauseOfIf extends FrameWithStatements implements Statement, Clause {
  isClause = true;
  isClauseOfIf: boolean = true;
  isStatement: boolean = true;

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
  }

  elseClauseAlreadyExists() {
    return (this.getParent() as IfStatement).hasElseClause();
  }
}

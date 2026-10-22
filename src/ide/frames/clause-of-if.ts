import { endKeyword, ifKeyword } from "../../compiler/elan-keywords";
import { Clause } from "./frame-interfaces/clause";
import { CodeSource } from "./frame-interfaces/code-source";
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

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  elseClauseAlreadyExists() {
    return (this.getParent() as IfStatement).hasElseClause();
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    let result = false;
    const endIf = `${endKeyword} ${ifKeyword}`;
    if (source.isMatch(endIf)) {
      result = true;
    }
    return result;
  }

  outerHtmlTag: string = "el-statement";
}

import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { FrameType } from "../frame-type";
import { FrameWithStatements } from "../frame-with-statements";
import { CatchClause } from "./catch-clause";
import { TryClause } from "./try-clause";

export class TryStatement extends FrameWithStatements {
  frameType: FrameType = FrameType.tryStatement;
  constructor(parent: Parent) {
    super(parent);
    const selector = this.getFirstChild();
    this.addChildBefore(new TryClause(this), selector);
    this.addChildBefore(new CatchClause(this), selector);
    this.removeChild(selector);
  }

  helpId(): string {
    return "try"; // 'then' clause has no visible manifestation
  }

  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 2;
  }

  getFields(): Field[] {
    return []; //Try has no direct Fields.
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_try`;
  }

  outerHtmlTag: string = "el-statement";
}

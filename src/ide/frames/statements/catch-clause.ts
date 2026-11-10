import { Clause } from "../clause";
import { FieldImpl } from "../fields/field-impl";
import { exceptionTypeFieldSpec, identifierFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { Frame } from "../frame-interfaces/frame";
import { Parent } from "../frame-interfaces/parent";
import { FrameType } from "../frame-type";
import { FrameWithStatements } from "../frame-with-statements";

export class CatchClause extends Clause {
  frameType: FrameType = FrameType.catchClause;
  variable: FieldImpl;
  exceptionType: FieldImpl;

  constructor(parent: Parent) {
    super(parent);
    this.variable = new FieldImpl(this, identifierFieldSpec);
    this.variable.setFieldToKnownValidText("e");
    this.exceptionType = new FieldImpl(this, exceptionTypeFieldSpec);
    this.exceptionType.setFieldToKnownValidText("ElanRuntimeError");
  }

  isDeletable(): boolean {
    const allClauses = this.getParent().getChildren();
    return allClauses.filter((c) => c instanceof CatchClause).length > 1; // always leave at least one catch clause
  }

  insertPeerSelector(before: boolean): void {
    //Not strictly a peer selector - inserts either a child of itself or child of predecessor
    const parent = this.getParent();
    if (before) {
      const previousChild = parent.getChildBefore(this) as unknown as FrameWithStatements;
      const lastStatementInPrevious = previousChild.getLastChild() as unknown as Frame;
      previousChild.insertOrGotoChildSelector(true, lastStatementInPrevious);
    } else {
      const lastChildOfThis = this.getLastChild();
      this.insertOrGotoChildSelector(true, lastChildOfThis);
    }
  }

  helpId(): string {
    return "catch";
  }

  getFields(): Field[] {
    return [this.variable, this.exceptionType];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_catch`;
  }
}

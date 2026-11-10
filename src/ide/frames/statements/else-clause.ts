import { Clause } from "../clause";
import { Field } from "../frame-interfaces/field";
import { Frame } from "../frame-interfaces/frame";
import { FrameType } from "../frame-type";
import { FrameWithStatements } from "../frame-with-statements";

export class ElseClause extends Clause {
  frameType: FrameType = FrameType.elseClause;

  override isMovable(): boolean {
    return false;
  }
  override canInsertAfter(): boolean {
    return false;
  }
  insertPeerSelector(before: boolean): void {
    //Not strictly a peer selector - inserts either a child of itself or child of predecessor
    if (before) {
      const parent = this.getParent();
      const previousChild = parent.getChildBefore(this) as unknown as FrameWithStatements;
      const lastStatementInPrevious = previousChild.getLastChild() as unknown as Frame;
      previousChild.insertOrGotoChildSelector(true, lastStatementInPrevious);
    }
  }

  helpId(): string {
    return "else";
  }

  getFields(): Field[] {
    return [];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_else`;
  }
}

import { elseKeyword, endKeyword, ifKeyword } from "../../../compiler/elan-keywords";
import { Clause } from "../clause";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Frame } from "../frame-interfaces/frame";
import { FrameWithStatements } from "../frame-with-statements";

export class ElseClause extends Clause {
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

  initialKeywords(): string {
    return elseKeyword;
  }

  getFields(): Field[] {
    return [];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_else`;
  }
  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${elseKeyword}\r
${this.renderChildrenAsElanSource()}`;
  }

  parseTop(source: CodeSource): void {
    source.remove(elseKeyword);
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return source.isMatch(`${endKeyword} ${ifKeyword}`);
  }
}

import { elifKeyword, thenKeyword } from "../../../compiler/elan-keywords";
import { ClauseOfIf } from "../clause-of-if";
import { CodeSourceFromString } from "../code-source-from-string";
import { FieldImpl } from "../fields/field-impl";
import { expressionFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Frame } from "../frame-interfaces/frame";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";

export class ElseIfClause extends ClauseOfIf {
  condition: FieldImpl;

  constructor(parent: Parent) {
    super(parent);
    this.condition = new FieldImpl(this, expressionFieldSpec);
    this.condition.setPlaceholder("<i>condition</i>");
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

  initialKeywords(): string {
    return elifKeyword;
  }

  getFields(): Field[] {
    return [this.condition];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_elseIf`;
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${elifKeyword} ${this.condition.renderAsElanSource()} ${thenKeyword}\r
${this.renderChildrenAsElanSource()}`;
  }

  parseTop(source: CodeSource): void {
    source.remove(`${elifKeyword} `);
    const condition = source.readUntil(/\sthen/);
    this.condition.parseFrom(new CodeSourceFromString(condition));
    source.remove(` ${thenKeyword}`);
  }
}

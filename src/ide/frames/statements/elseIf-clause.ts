import { elifKeyword, endKeyword, ifKeyword, thenKeyword } from "../../../compiler/elan-keywords";
import { Clause } from "../clause";
import { CodeSourceFromString } from "../code-source-from-string";
import { FieldImpl } from "../fields/field-impl";
import { expressionFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Frame } from "../frame-interfaces/frame";
import { Parent } from "../frame-interfaces/parent";
import { FrameType } from "../frame-type";
import { FrameWithStatements } from "../frame-with-statements";

export class ElseIfClause extends Clause {
  frameType: FrameType = FrameType.elseIfClause;
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

  helpId(): string {
    return "elif";
  }

  getFields(): Field[] {
    return [this.condition];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_elseIf`;
  }

  parseTop(source: CodeSource): void {
    source.remove(`${elifKeyword} `);
    const condition = source.readUntil(/\sthen/);
    this.condition.parseFrom(new CodeSourceFromString(condition));
    source.remove(` ${thenKeyword}`);
  }
  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return source.isMatch(`${endKeyword} ${ifKeyword}`);
  }
}

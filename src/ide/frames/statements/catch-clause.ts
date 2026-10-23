import { asKeyword, catchKeyword, endKeyword, tryKeyword } from "../../../compiler/elan-keywords";
import { ClauseOfTry } from "../clause-of-try";
import { FieldImpl } from "../fields/field-impl";
import { exceptionTypeFieldSpec, identifierFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Frame } from "../frame-interfaces/frame";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";

export class CatchClause extends ClauseOfTry {
  variable: FieldImpl;
  exceptionType: FieldImpl;

  constructor(parent: Parent) {
    super(parent);
    this.variable = new FieldImpl(this, identifierFieldSpec);
    this.variable.setFieldToKnownValidText("e");
    this.exceptionType = new FieldImpl(this, exceptionTypeFieldSpec);
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

  initialKeywords(): string {
    return catchKeyword;
  }

  getFields(): Field[] {
    return [this.variable, this.exceptionType];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_${catchKeyword}`;
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${catchKeyword} ${this.variable.renderAsElanSource()} ${asKeyword} ${this.exceptionType.renderAsElanSource()}\r
${this.renderChildrenAsElanSource()}`;
  }

  parseTop(source: CodeSource): void {
    source.remove(`${catchKeyword} `);
    this.variable.parseFrom(source);
    source.remove(` ${asKeyword} `);
    this.exceptionType.parseFrom(source);
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return source.isMatch(`${endKeyword} ${tryKeyword}`);
  }
}

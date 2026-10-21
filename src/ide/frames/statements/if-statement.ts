import { endKeyword, ifKeyword, thenKeyword } from "../../../compiler/elan-keywords";
import { CodeSourceFromString } from "../code-source-from-string";
import { FieldImpl } from "../fields/field-impl";
import { expressionFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameWithStatements } from "../frame-with-statements";
import { ElseClause } from "./else-clause";
import { ThenClause } from "./then-clause";

export class IfStatement extends FrameWithStatements implements Statement {
  isStatement = true;
  condition: FieldImpl;
  constructor(parent: Parent) {
    super(parent);
    this.condition = new FieldImpl(this, expressionFieldSpec);
    this.condition.setPlaceholder("<i>condition</i>");
    const selector = this.getFirstChild();
    this.addChildBefore(new ThenClause(this), selector);
    this.removeChild(selector);
  }

  initialKeywords(): string {
    return ifKeyword;
  }

  getFields(): Field[] {
    return [this.condition];
  }
  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_if`;
  }

  frameSpecificAnnotation(): string {
    return "if statement";
  }

  outerHtmlTag: string = "el-statement";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${ifKeyword} ${this.condition.renderAsElanSource()} ${thenKeyword}\r
${this.renderChildrenAsElanSource()}\r
${this.indent()}${endKeyword} ${ifKeyword}`;
  }

  parseTop(source: CodeSource): void {
    source.remove("if ");
    const condition = source.readUntil(/\sthen/);
    this.condition.parseFrom(new CodeSourceFromString(condition));
    source.remove(" then");
    source.removeNewLine();
    this.getChildren()[0].parseFrom(source);
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return this.parseStandardEnding(source, "end if");
  }

  override insertSelectorAfterLastField(): void {
    this.getFirstChild().select(true, false);
  }

  hasElseClause(): boolean {
    return this.getChildren().filter((s) => s instanceof ElseClause).length > 0;
  }
}

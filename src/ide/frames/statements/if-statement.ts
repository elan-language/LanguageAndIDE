import { endKeyword, ifKeyword, thenKeyword } from "../../../compiler/keywords";
import { CodeSourceFromString } from "../code-source-from-string";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameWithStatements } from "../frame-with-statements";

export class IfStatement extends FrameWithStatements implements Statement {
  isStatement = true;
  condition: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this.condition = new ExpressionField(this);
    this.condition.setPlaceholder("<i>condition</i>");
  }

  initialKeywords(): string {
    return ifKeyword;
  }

  getFields(): Field[] {
    return [this.condition];
  }
  getIdPrefix(): string {
    return "if";
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  outerHtmlTag: string = "el-statement";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${ifKeyword} ${this.condition.renderAsElanSource()} ${thenKeyword}\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${ifKeyword}`;
  }

  parseTop(source: CodeSource): void {
    source.remove("if ");
    const condition = source.readUntil(/\sthen/);
    this.condition.parseFrom(new CodeSourceFromString(condition));
    source.remove(" then");
    source.removeNewLine();
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return this.parseStandardEnding(source, "end if");
  }

  override insertSelectorAfterLastField(): void {
    this.getFirstChild().select(true, false);
  }
}

import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ExpressionField } from "../fields/expression-field";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { mustBeOfType, mustHaveLastSingleElse } from "../compile-rules";
import { BooleanType } from "../symbols/boolean-type";
import { ifKeyword } from "../keywords";
import { Else } from "./else";
import { Transforms } from "../syntax-nodes/transforms";
import { ThenStatement } from "./then-statement";
import { StatementSelector } from "./statement-selector";

export class IfStatement extends FrameWithStatements implements Statement {
  isStatement = true;
  condition: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.condition = new ExpressionField(this);
    this.condition.setPlaceholder("condition");
    this.getChildren().pop(); // To remove StatementSelector added by superclass
    this.getChildren().push(new ThenStatement(this));
    this.getChildren().push(new StatementSelector(this));
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

  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>if </keyword>${this.condition.renderAsHtml()}</top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<keyword>end if</keyword>
</statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}if ${this.condition.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end if`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    mustBeOfType(
      this.condition.getOrTransformAstNode(transforms),
      BooleanType.Instance,
      this.compileErrors,
      this.htmlId,
    );
    const elses = this.getChildren().filter((c) => c instanceof Else) as Else[];
    if (elses.length > 0) {
      mustHaveLastSingleElse(elses, this.compileErrors, this.htmlId);
    }

    return `${this.indent()}if (${this.condition.compile(transforms)}) {\r
${this.compileStatements(transforms)}\r
${this.indent()}}`;
  }

  public getThenStatement(): ThenStatement {
    return this.getChildren().filter((m) => "isThen" in m)[0] as ThenStatement;
  }

  parseTop(source: CodeSource): void {
    source.remove("if ");
    this.condition.parseFrom(source);
    source.removeNewLine();
    this.getThenStatement().parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return this.parseStandardEnding(source, "end if");
  }
}

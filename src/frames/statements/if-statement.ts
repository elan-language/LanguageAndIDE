import { CodeSourceFromString } from "../code-source-from-string";
import { mustBeOfType } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { Transforms } from "../interfaces/transforms";
import { endKeyword, ifKeyword, thenKeyword } from "../keywords";
import { compileStatements } from "../parent-helpers";
import { BooleanType } from "../symbols/boolean-type";
import { Else } from "./else";

export class IfStatement extends FrameWithStatements implements Statement {
  isStatement = true;
  condition: ExpressionField;
  hrefForFrameHelp: string = "LangRef.html#if_statement";

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

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>${ifKeyword} </el-kw>${this.condition.renderAsHtml()}<el-kw> ${thenKeyword}</el-kw>${this.helpAsHtml()}${this.getFrNo()}</el-top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<el-kw>${endKeyword} ${ifKeyword}</el-kw>
</el-statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}${ifKeyword} ${this.condition.renderAsSource()} ${thenKeyword}\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${ifKeyword}`;
  }

  reconfigureForCompile(): Frame[] {
    const ifChildren: Frame[] = [];
    let currentElse: Else | undefined = undefined;

    for (const c of this.getChildren()) {
      if (c instanceof Else) {
        currentElse = c;
        currentElse.setCompileScope(this);
        ifChildren.push(c);
      } else if (currentElse) {
        c.setCompileScope(currentElse);
        currentElse.addChild(c);
      } else {
        ifChildren.push(c);
      }
    }

    return ifChildren;
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
    let toCompile = this.getChildren();

    if (elses.length > 0) {
      //mustNotHaveConditionalAfterUnconditionalElse(elses, this.compileErrors, this.htmlId);
      toCompile = this.reconfigureForCompile();
    }

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}if (${this.condition.compile(transforms)}) {\r
${compileStatements(transforms, toCompile)}\r
${this.indent()}}`;
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

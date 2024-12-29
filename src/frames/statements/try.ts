import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { endKeyword, tryKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class TryStatement extends FrameWithStatements {
  initialKeywords(): string {
    return tryKeyword;
  }
  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 3;
  }

  getFields(): Field[] {
    return []; //Try has no direct Fields.
  }

  getIdPrefix(): string {
    return "try";
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-expand>+</el-expand><el-kw>${tryKeyword} </el-kw>${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>end try</el-kw>
</el-statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}try\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${tryKeyword}`;
  }
  parseTop(source: CodeSource): void {
    source.remove(tryKeyword);
    source.removeNewLine();
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, `${endKeyword} ${tryKeyword}`);
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    return `${this.indent()}try {\r
${this.compileStatements(transforms)}\r
${this.indent()}}`;
  }
}

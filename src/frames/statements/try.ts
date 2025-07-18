import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";
import { endKeyword, tryKeyword } from "../keywords";
import { CatchStatement } from "./catch-statement";

export class TryStatement extends FrameWithStatements {
  catch: CatchStatement;
  constructor(parent: Parent) {
    super(parent);
    this.catch = new CatchStatement(this);
    this.getChildren().push(this.catch);
  }

  initialKeywords(): string {
    return tryKeyword;
  }
  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 2;
  }

  getFields(): Field[] {
    return []; //Try has no direct Fields.
  }

  getIdPrefix(): string {
    return "try";
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>${tryKeyword} </el-kw>${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
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
  }

  parseBottom(source: CodeSource): boolean {
    let result = false;
    if (source.isMatchRegEx(/^[^\S\r\n]*catch\s/)) {
      result = true;
      this.catch.parseFrom(source);
    }
    return result;
  }
}

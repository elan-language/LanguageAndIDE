import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { catchKeyword, endKeyword, tryKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";
import { CatchStatement } from "./catch-statement";
import { StatementSelector } from "./statement-selector";

export class TryStatement extends FrameWithStatements {
  catch: CatchStatement;

  constructor(parent: Parent) {
    super(parent);
    this.catch = new CatchStatement(this);
    this.getChildren().push(this.catch);
    this.getChildren().push(new StatementSelector(this));
  }

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
<el-kw>end try</el-kw>${this.contextMenu()}
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
    source.removeIndent();
    if (source.isMatch(catchKeyword)) {
      this.catch.parseFrom(source);
      const priorSelector = this.getChildBefore(this.catch);
      this.removeChild(priorSelector);
    }
    return this.parseStandardEnding(source, `${endKeyword} ${tryKeyword}`);
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}try {\r
${this.compileStatements(transforms)}\r
${this.indent()}}`;
  }
}

import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { thenKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class ThenStatement extends FrameWithStatements implements Statement {
  isThen = true;
  isStatement = true;
  constructor(parent: Parent) {
    super(parent);
    this.movable = false;
  }
  initialKeywords(): string {
    return thenKeyword;
  }
  delete(): void {} //Does nothing as default cannot be deleted

  getFields(): Field[] {
    return [];
  }
  getIdPrefix(): string {
    return "then";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-expand>+</el-expand><el-kw>then </el-kw>${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}then\r
${this.renderChildrenAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.compileStatements(transforms)}\r`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    source.remove("then");
  }
  parseBottom(source: CodeSource): boolean {
    let result = false;
    source.removeIndent();
    if (source.isMatch("else")) {
      result = true;
    } else if (source.isMatch("end if")) {
      result = true;
    }
    return result;
  }
  canInsertBefore(): boolean {
    return false;
  }
}

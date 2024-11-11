import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { catchingKeyword, doingKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class DoingStatement extends FrameWithStatements implements Statement {
  isDoing = true;
  isStatement = true;
  constructor(parent: Parent) {
    super(parent);
    this.movable = false;
  }
  initialKeywords(): string {
    return doingKeyword;
  }
  delete(): void {} //Does nothing as default cannot be deleted

  getFields(): Field[] {
    return [];
  }
  getIdPrefix(): string {
    return doingKeyword;
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><el-kw>${doingKeyword} </el-kw>${this.getFrNo()}</top>
${this.renderChildrenAsHtml()}
</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${doingKeyword}\r
${this.renderChildrenAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.compileStatements(transforms)}\r`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    source.remove(doingKeyword);
  }
  parseBottom(source: CodeSource): boolean {
    let result = false;
    source.removeIndent();
    if (source.isMatch(catchingKeyword)) {
      result = true;
    }
    return result;
  }
  canInsertBefore(): boolean {
    return false;
  }
}

import { CodeSource } from "../code-source";
import { singleIndent } from "../frame-helpers";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { otherwiseKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class OtherwiseStatement extends FrameWithStatements implements Statement {
  isOtherwise = true;
  isStatement = true;
  constructor(parent: Parent) {
    super(parent);
    this.movable = true;
  }
  initialKeywords(): string {
    return otherwiseKeyword;
  }
  getFields(): Field[] {
    return [];
  }
  getIdPrefix(): string {
    return "default";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-expand>+</el-expand><el-kw>${otherwiseKeyword} </el-kw>${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${otherwiseKeyword}\r
${this.renderChildrenAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.indent()}default:\r
${this.compileStatements(transforms)}\r
${this.indent()}${singleIndent()}break;`;
  }

  parseTop(source: CodeSource): void {
    source.remove(otherwiseKeyword);
  }
  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return source.isMatch("case ") || source.isMatch("end switch");
  }
  canInsertAfter(): boolean {
    return false;
  }
}

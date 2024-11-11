import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { singleIndent } from "../helpers";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { defaultKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class DefaultStatement extends FrameWithStatements implements Statement {
  isDefault = true;
  isStatement = true;
  constructor(parent: Parent) {
    super(parent);
    this.movable = true;
  }
  initialKeywords(): string {
    return defaultKeyword;
  }
  getFields(): Field[] {
    return [];
  }
  getIdPrefix(): string {
    return "default";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-expand>+</el-expand><el-kw>default </el-kw>${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}default\r
${this.renderChildrenAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.indent()}default:\r
${this.compileStatements(transforms)}\r
${this.indent()}${singleIndent()}break;`;
  }

  parseTop(source: CodeSource): void {
    source.remove("default");
  }
  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return source.isMatch("case ") || source.isMatch("end switch");
  }
  canInsertAfter(): boolean {
    return false;
  }
}

import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { otherwiseKeyword } from "../keywords";

export class OtherwiseStatement extends AbstractFrame implements Statement {
  isOtherwise = true;
  isStatement = true;
  constructor(parent: Parent) {
    super(parent);
    this.movable = true;
  }
  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
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
</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.getParent().indent()}${otherwiseKeyword}`;
  }

  compile(): string {
    this.compileErrors = [];
    return `${this.indent()}break;\r\n${this.getParent().indent()}default:`;
  }

  parseFrom(source: CodeSource): void {
    source.remove(otherwiseKeyword);
    source.removeNewLine();
  }

  canInsertAfter(): boolean {
    return false;
  }
}

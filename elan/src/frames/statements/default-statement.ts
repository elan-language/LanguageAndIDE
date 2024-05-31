import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { singleIndent } from "../helpers";
import { defaultKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class DefaultStatement extends FrameWithStatements implements Statement {
  isStatement = true;
  constructor(parent: Parent) {
    super(parent);
    this.movable = false;
  }
  initialKeywords(): string {
    return defaultKeyword;
  }
  delete(): void {} //Does nothing as default cannot be deleted

  getFields(): Field[] {
    return [];
  }
  getIdPrefix(): string {
    return "default";
  }
  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>default </keyword></top>
${this.renderChildrenAsHtml()}
</statement>`;
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
    return source.isMatch("end switch");
  }
  canInsertAfter(): boolean {
    return false;
  }
}

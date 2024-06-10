import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { singleIndent } from "../helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { defaultKeyword, thenKeyword } from "../keywords";

export class ThenStatement extends FrameWithStatements implements Statement {
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
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>then </keyword></top>
${this.renderChildrenAsHtml()}
</statement>`;
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

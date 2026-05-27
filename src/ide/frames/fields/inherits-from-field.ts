import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { InheritanceNode } from "../parse-nodes/inheritanceNode";
import { AbstractField } from "./abstract-field";

export class InheritsFromField extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setOptional(true);
    this.setPlaceholder(" <i>inheritance</i>");
  }

  helpId(): string {
    return "InheritsFromField";
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_text`;
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new InheritanceNode(this.getFile());
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }

  override renderAsHtml(): string {
    let result = "";
    if (this.isSelected()) {
      result = ` ${super.renderAsHtml()}`;
    } else {
      const textAsHtml = this.getFile().language().inheritsFromTextAsHtml(this);
      result = `<el-field id="${this.htmlId}" class="${this.cls()}" tabindex="-1"><el-txt>${textAsHtml}</el-txt><el-place>${this._placeholder}</el-place>${this.getMessage()}${this.helpAsHtml()}</el-field>`;
    }
    return result;
  }

  default_renderasHtml(): string {
    return super.renderAsHtml();
  }
}

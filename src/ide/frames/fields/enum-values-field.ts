import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { EnumValuesList } from "../parse-nodes/enum-values-list";
import { AbstractField } from "./abstract-field";

export class EnumValuesField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>values</i>");
  }

  helpId(): string {
    return "EnumValuesField";
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_enumVals`;
  }
  initialiseRoot(): ParseNode {
    this.rootNode = new EnumValuesList(this.getFile());
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
      result = super.renderAsHtml();
    } else {
      const textAsHtml = this.getFile().language().enumValuesListAsHtml(this);
      result = `<el-field id="${this.htmlId}" class="${this.cls()}" tabindex="-1"><el-txt>${textAsHtml}</el-txt><el-place>${this._placeholder}</el-place>${this.getMessage()}${this.helpAsHtml()}</el-field>`;
    }
    return result;
  }

  default_renderAsHtml(): string {
    return super.renderAsHtml();
  }
}

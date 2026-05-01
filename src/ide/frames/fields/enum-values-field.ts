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
    return "enumVals";
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
      result = this.getFile().language().enumValuesListAsHtml(this);
    }
    return result;
  }

  default_renderAsHtml(): string {
    return super.renderAsHtml();
  }
}

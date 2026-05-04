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
    return "text";
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
      result = super.renderAsHtml();
    } else {
      result = this.getFile().language().inheritance(this);
    }
    return result;
  }

  default_renderAsHtml(): string {
    return super.renderAsHtml();
  }
}

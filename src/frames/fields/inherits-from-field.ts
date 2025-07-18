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
    this.setPlaceholder("<i>inherits ClassName(s)</i>");
  }

  helpId(): string {
    return "InheritsFromField";
  }

  getIdPrefix(): string {
    return "text";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new InheritanceNode();
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

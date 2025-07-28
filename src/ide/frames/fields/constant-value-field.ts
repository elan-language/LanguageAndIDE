import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { ConstantValueNode } from "../parse-nodes/constant-value-node";
import { AbstractField } from "./abstract-field";

export class ConstantValueField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>literal</i>");
  }

  helpId(): string {
    return "ConstantValueField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new ConstantValueNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

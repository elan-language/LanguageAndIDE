import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { AssertActualNode } from "../parse-nodes/assert-actual-node";
import { AbstractField } from "./abstract-field";

export class AssertActualField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>computed value</i>");
  }

  helpId(): string {
    return "AssertActualField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new AssertActualNode();
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/\sis\s/);

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

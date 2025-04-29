import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { AssertActualNode } from "../parse-nodes/assert-actual-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class AssertActualField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>computed value</i>");
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new AssertActualNode();
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/\sis\s/);

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

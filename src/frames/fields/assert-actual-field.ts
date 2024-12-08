import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { Term } from "../parse-nodes/term";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class AssertActualField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new Term();
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/\sis\s/);

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

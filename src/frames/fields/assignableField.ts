import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { AssignableNode } from "../parse-nodes/assignable-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class AssignableField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>variable</i>");
    this.help = `A previously defined variable, but NOT a parameter. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)`;
  }

  getIdPrefix(): string {
    return "ident";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new AssignableNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/(\s+to\s+)|\r|\n/);

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

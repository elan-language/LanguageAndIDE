import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { AssignableNode } from "../parse-nodes/assignable-node";
import { AbstractField } from "./abstract-field";

export class AssignableField extends AbstractField {
  private delimiter: RegExp;

  constructor(holder: Frame, delimiter = /(\s+to\s+)|\r|\n/) {
    super(holder);
    this.delimiter = delimiter;
    this.setPlaceholder("<i>variable</i>");
  }

  helpId(): string {
    return "AssignableField";
  }

  getIdPrefix(): string {
    return "ident";
  }
  initialiseRoot(): ParseNode {
    this.rootNode = new AssignableNode(this.getFile());
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(this.delimiter);

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

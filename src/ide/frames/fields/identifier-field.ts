import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { IdentifierUse } from "../parse-nodes/identifier-use";
import { AbstractField } from "./abstract-field";

export class IdentifierField extends AbstractField {
  isParseByNodes: boolean = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>name</i>");
  }

  helpId(): string {
    return "IdentifierField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new IdentifierUse(this.getFile());
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/[^a-zA-Z0-9_]/);

  getIdPrefix(): string {
    return "ident";
  }
  isEndMarker(key: string) {
    return key === " " || key === "(";
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

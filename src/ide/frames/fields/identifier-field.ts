import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { Identifier } from "../parse-nodes/identifier";
import { AbstractField } from "./abstract-field";

export class IdentifierField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>name</i>");
  }

  helpId(): string {
    return "IdentifierField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new Identifier(this.getFile());
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/[^a-zA-Z0-9_]/);

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_ident`;
  }
  isEndMarker(key: string) {
    return key === " " || key === "(";
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

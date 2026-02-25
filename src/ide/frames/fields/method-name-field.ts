import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { MethodNameDef } from "../parse-nodes/method-name-def";
import { AbstractField } from "./abstract-field";

export class MethodNameField extends AbstractField {
  isParseByNodes: boolean = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>name</i>");
  }
  helpId(): string {
    return "MethodNameField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new MethodNameDef(this.getFile());
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

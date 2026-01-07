import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { ValueDefNode } from "../parse-nodes/value-def-node";
import { AbstractField } from "./abstract-field";

export class ValueDefField extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>name</i>");
  }

  helpId(): string {
    return "ValueDefField";
  }

  getIdPrefix(): string {
    return "var";
  }
  initialiseRoot(): ParseNode {
    this.rootNode = new ValueDefNode(this.getFile());
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/(\s+((set to)|(be))\s+)|\r|\n/);

  isEndMarker(key: string) {
    return this.text.length === 0 ? false : key === " ";
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

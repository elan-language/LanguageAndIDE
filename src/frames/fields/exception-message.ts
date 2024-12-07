import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ExceptionMsgNode } from "../parse-nodes/exception-msg-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ExceptionMessage extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>message</i>");
    this.help = `message defined as a literal string (in quotes), or the name of a previously-defined variable or constant containing a string.`;
  }
  getIdPrefix(): string {
    return "msg";
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new ExceptionMsgNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

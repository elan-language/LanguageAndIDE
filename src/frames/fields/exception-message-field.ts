import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { ExceptionMsgNode } from "../parse-nodes/exception-msg-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ExceptionMessageField extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>message</i>");
  }
  helpId(): string {
    return "ExceptionMessageField";
  }

  getIdPrefix(): string {
    return "msg";
  }
  initialiseRoot(): ParseNode {
    this.rootNode = new ExceptionMsgNode();
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToEndOfLine();

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

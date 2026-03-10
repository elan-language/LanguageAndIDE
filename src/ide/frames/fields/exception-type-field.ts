import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { TypeNameUse } from "../parse-nodes/type-name-use";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractField } from "./abstract-field";

export class ExceptionTypeField extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.useHtmlTags = true;
    this.setPlaceholder("<i>Type</i>");
  }

  helpId(): string {
    return "TypeField";
  }

  getIdPrefix(): string {
    return "type";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new TypeNameUse(this.getFile(), new Set<TokenType>([]));
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) => source.readUntil(/\s/);

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

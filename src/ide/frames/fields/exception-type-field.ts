import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { TypeSimpleName } from "../parse-nodes/type-simple-name";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractField } from "./abstract-field";

export class ExceptionTypeField extends AbstractField {
  constructor(holder: Frame) {
    super(holder);
    this.useHtmlTags = true;
    this.setFieldToKnownValidText("CustomError");
    this.setPlaceholder("<i>exception type</i>");
  }

  helpId(): string {
    return "TypeField";
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_type`;
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new TypeSimpleName(this.getFile(), new Set<TokenType>([]));
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) => source.readUntil(/\s/);

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml();
  }
}

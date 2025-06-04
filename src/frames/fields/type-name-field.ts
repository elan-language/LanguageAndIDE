import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";

import { ParseNode } from "../interfaces/parse-node";
import { TypeNameNode } from "../parse-nodes/type-name-node";
import { TokenType } from "../symbol-completion-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class TypeNameField extends AbstractField {
  isParseByNodes = true;
  constructor(holder: Frame) {
    super(holder);
    this.useHtmlTags = true;
    this.placeholder = "Name";
  }

  helpId(): string {
    return "TypeNameField";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new TypeNameNode(new Set<TokenType>());
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(/[^a-zA-Z0-9_]/);

  getIdPrefix(): string {
    return "type";
  }
  public textAsHtml(): string {
    if (this.selected) {
      return super.textAsHtml();
    } else {
      return `<el-type>${this.text}</el-type>`;
    }
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }
}

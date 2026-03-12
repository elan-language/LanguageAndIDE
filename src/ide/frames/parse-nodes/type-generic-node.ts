import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { concreteAndAbstractTypes } from "./parse-node-helpers";
import { TypeNameQualifiedNode } from "./type-name-qualified-node";

export class TypeGenericNode extends AbstractSequence {
  qualifiedName: TypeNameQualifiedNode | undefined;
  genericTypes: CSV | undefined;
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  concreteAndAbstract = new Set<TokenType>(concreteAndAbstractTypes);

  constructor(file: File, tokenTypes: Set<TokenType>) {
    super(file);
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.file.language().addNodesForTypeGeneric(this);
      super.parseText(text);
    }
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return this.concreteAndAbstract;
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  renderAsHtml() {
    return this.delegateHtmlToLanguage();
  }
}

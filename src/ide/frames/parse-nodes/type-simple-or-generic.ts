import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeGenericNode } from "./type-generic-node";
import { TypeNameQualifiedNode } from "./type-name-qualified-node";

export class TypeSimpleOrGeneric extends AbstractAlternatives {
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  constructor(file: File, tokenTypes: Set<TokenType> = new Set<TokenType>()) {
    super(file);
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.alternatives.push(new TypeNameQualifiedNode(this.file, this.tokenTypes));
      this.alternatives.push(new TypeGenericNode(this.file, this.tokenTypes));
      super.parseText(text);
    }
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.matchedText.length === 0 ? this.tokenTypes : super.symbolCompletion_tokenTypes();
  }

  override symbolCompletion_context(): string {
    return "none";
  }
}

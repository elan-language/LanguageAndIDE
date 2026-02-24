import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { OPEN_BRACKET } from "../symbols";
import { AbstractAlternatives } from "./abstract-alternatives";
import { TypeFuncNode } from "./type-func-node";
import { TypeGenericNode } from "./type-generic-node";
import { TypeNameQualifiedNode } from "./type-name-qualified-node";
import { TypeTupleNode } from "./type-tuple-node";

export class TypeNode extends AbstractAlternatives {
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  constructor(file: File, tokenTypes: Set<TokenType> = new Set<TokenType>()) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr("<i>Type</i>");
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      if (text.trimStart().startsWith("Func")) {
        // tested first because 'Func' is *syntactically* valid simple type
        this.alternatives.push(new TypeFuncNode(this.file));
      } else if (text.trimStart().startsWith(OPEN_BRACKET)) {
        this.alternatives.push(new TypeTupleNode(this.file));
      } else {
        this.alternatives.push(new TypeNameQualifiedNode(this.file, this.tokenTypes));
        this.alternatives.push(new TypeGenericNode(this.file, this.tokenTypes));
      }
      super.parseText(text.trimStart());
    }
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.matchedText.length === 0 ? this.tokenTypes : super.symbolCompletion_tokenTypes();
  }
}

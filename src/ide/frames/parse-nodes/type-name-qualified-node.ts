import { libraryKeyword } from "../../../compiler/elan-keywords";
import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { DotAfter } from "./dot-after";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { TypeNameUse } from "./type-name-use";

export class TypeNameQualifiedNode extends AbstractSequence {
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  unqualifiedName: TypeNameUse | undefined;
  libraryQualifier: OptionalNode | undefined;

  constructor(
    file: File,
    tokenTypes: Set<TokenType> = new Set<TokenType>([
      TokenType.type_abstract,
      TokenType.type_concrete,
      TokenType.type_notInheritable,
      TokenType.type_enum,
    ]),
  ) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr("<i>Type</i>");
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.libraryQualifier = new OptionalNode(
        this.file,
        new DotAfter(this.file, new KeywordNode(this.file, libraryKeyword, false, true)),
      );
      this.addElement(this.libraryQualifier);
      this.unqualifiedName = new TypeNameUse(this.file);
      this.addElement(this.unqualifiedName);
      super.parseText(text);
    }
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }
}

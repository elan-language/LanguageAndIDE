import { libraryKeyword } from "../../../compiler/keywords";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { DotAfter } from "./dot-after";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { TypeSimpleName } from "./type-simple-name";

export class TypeNameNode extends AbstractSequence {
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  name: TypeSimpleName | undefined;
  libraryQualifier: OptionalNode | undefined;

  constructor(
    tokenTypes: Set<TokenType> = new Set<TokenType>([
      TokenType.type_abstract,
      TokenType.type_concrete,
      TokenType.type_notInheritable,
      TokenType.type_enum,
    ]),
  ) {
    super();
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.libraryQualifier = new OptionalNode(
        new DotAfter(new KeywordNode(libraryKeyword, false, true)),
      );
      this.addElement(this.libraryQualifier);
      this.name = new TypeSimpleName();
      this.addElement(this.name);
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    const qualifier = this.libraryQualifier?.matchedNode ? `<el-kw>${libraryKeyword}</el-kw>.` : ``;
    return `${qualifier}<el-type>${this.name?.renderAsElanSource()}</el-type>`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }
}

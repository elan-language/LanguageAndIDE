import { ofKeyword } from "../../../compiler/keywords";
import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { GT, LT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { concreteAndAbstractTypes, Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";
import { TypeNameNode } from "./type-name-node";
import { TypeNode } from "./type-node";

export class TypeGenericNode extends AbstractSequence {
  simpleType: TypeNameNode | undefined;
  genericTypes: CSV | undefined;
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  concreteAndAbstract = new Set<TokenType>(concreteAndAbstractTypes);

  constructor(file: File, tokenTypes: Set<TokenType>) {
    super(file);
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.simpleType = new TypeNameNode(this.file, this.tokenTypes);
      const typeConstr = () => new TypeNode(this.file, this.concreteAndAbstract);
      this.genericTypes = new CSV(this.file, typeConstr, 1);

      this.addElement(this.simpleType!);
      this.addElement(new PunctuationNode(this.file, LT));
      this.addElement(new KeywordNode(this.file, ofKeyword));
      this.addElement(new SpaceNode(this.file, Space.required));
      this.addElement(this.genericTypes);
      this.addElement(new PunctuationNode(this.file, GT));
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

  override renderAsHtml(): string {
    return this.file.language().typeGenericNodeAsHtml(this);
  }
}

import { ofKeyword } from "../../../compiler/keywords";
import { TokenType } from "../symbol-completion-helpers";
import { GT, LT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CommaNode } from "./comma-node";
import { KeywordNode } from "./keyword-node";
import { Multiple } from "./multiple";
import { concreteAndAbstractTypes, Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";
import { TypeNameNode } from "./type-name-node";
import { TypeNode } from "./type-node";

export class TypeGenericNode extends AbstractSequence {
  simpleType: TypeNameNode | undefined;
  generic: Sequence | undefined;
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  concreteAndAbstract = new Set<TokenType>(concreteAndAbstractTypes);

  constructor(tokenTypes: Set<TokenType>) {
    super();
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.simpleType = new TypeNameNode(this.tokenTypes);
      const lt = () => new PunctuationNode(LT);
      const of = () => new KeywordNode(ofKeyword);
      const sp = () => new SpaceNode(Space.required);
      const type = () => new TypeNode(this.concreteAndAbstract);
      const commaType = () =>
        new Sequence([() => new CommaNode(), () => new TypeNode(this.concreteAndAbstract)]);
      const commaTypes = () => new Multiple(commaType, 0);
      const gt = () => new PunctuationNode(GT);
      this.generic = new Sequence([lt, of, sp, type, commaTypes, gt]);
      this.addElement(this.simpleType);
      this.addElement(this.generic);
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
}

import { TokenType } from "../helpers";
import { ofKeyword } from "../keywords";
import { GT, LT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CommaNode } from "./comma-node";
import { KeywordNode } from "./keyword-node";
import { Multiple } from "./multiple";
import { conreteAndAbstractTypes, Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";
import { TypeSimpleNode } from "./type-simple-node";

export class TypeGenericNode extends AbstractSequence {
  simpleType: TypeSimpleNode | undefined;
  generic: Sequence | undefined;
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  constructor(tokenTypes: Set<TokenType>) {
    super();
    this.tokenTypes = tokenTypes;
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.simpleType = new TypeSimpleNode(this.tokenTypes);
      const lt = () => new PunctuationNode(LT);
      const of = () => new KeywordNode(ofKeyword);
      const sp = () => new SpaceNode(Space.required);
      const type = () => new TypeNode(this.tokenTypes);
      const commaType = () =>
        new Sequence([() => new CommaNode(), () => new TypeNode(this.tokenTypes)]);
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
      return new Set<TokenType>(conreteAndAbstractTypes);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }
}

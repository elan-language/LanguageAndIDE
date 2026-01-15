import { ofKeyword } from "../../../compiler/keywords";
import { ParseNode } from "../frame-interfaces/parse-node";
import { TokenType } from "../symbol-completion-helpers";
import { GT, LT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { concreteAndAbstractTypes, Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";
import { TypeNameNode } from "./type-name-node";
import { TypeNode } from "./type-node";
import { File } from "../frame-interfaces/file";
import { CSV } from "./csv";

export class TypeGenericNode extends AbstractSequence {
  simpleType: TypeNameNode | undefined;
  generic: Sequence | undefined;
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  concreteAndAbstract = new Set<TokenType>(concreteAndAbstractTypes);
  private firstType: (() => ParseNode) | undefined;

  constructor(file: File, tokenTypes: Set<TokenType>) {
    super(file);
    this.tokenTypes = tokenTypes;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.simpleType = new TypeNameNode(this.file, this.tokenTypes);
      const lt = () => new PunctuationNode(this.file, LT);
      const of = () => new KeywordNode(this.file, ofKeyword);
      const sp = () => new SpaceNode(this.file, Space.required);
      const typeConstr = () => new TypeNode(this.file, this.concreteAndAbstract);
      const types = () => new CSV(this.file, typeConstr, 1);
      const gt = () => new PunctuationNode(this.file, GT);
      this.generic = new Sequence(this.file, [lt, of, sp, types, gt]);
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

  override renderAsHtml(): string {
    const fromLanguage = this.file.language().renderNodeAsHtml(this);
    return fromLanguage.length > 0 ? fromLanguage : super.renderAsHtml();
  }
}

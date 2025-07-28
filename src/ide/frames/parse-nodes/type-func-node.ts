import { ofKeyword } from "../../../compiler/keywords";
import { TokenType } from "../symbol-completion-helpers";
import { ARROW, GT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";
import { TypeSpecificFuncNode } from "./type-specific-func-node";

export class TypeFuncNode extends AbstractSequence {
  inputTypes: OptionalNode | undefined;
  returnType: TypeNode | undefined;

  tokenTypes = new Set<TokenType>([
    TokenType.type_concrete,
    TokenType.type_abstract,
    TokenType.type_notInheritable,
  ]);

  constructor() {
    super();
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new TypeSpecificFuncNode());
      this.addElement(new PunctuationNode("<"));
      this.addElement(new KeywordNode(ofKeyword));
      this.addElement(new SpaceNode(Space.required));
      const inputTypes = () => new CSV(() => new TypeNode(this.tokenTypes), 1);
      const sp = () => new SpaceNode(Space.required);
      const inputTypesSp = new Sequence([inputTypes, sp]);
      this.inputTypes = new OptionalNode(inputTypesSp);
      this.inputTypes.setSyntaxCompletionWhenEmpty("<i>InputType(s) </i>");
      this.addElement(this.inputTypes);
      this.addElement(new PunctuationNode(ARROW));
      this.addElement(new SpaceNode(Space.required));
      this.returnType = new TypeNode(this.tokenTypes);
      this.returnType.setSyntaxCompletionWhenEmpty("<i>ReturnType</i>");
      this.addElement(this.returnType);
      this.addElement(new PunctuationNode(GT));
      super.parseText(text.trimStart());
    }
  }

  getSyntaxCompletionAsHtml(): string {
    return super.getSyntaxCompletionAsHtml();
  }
}

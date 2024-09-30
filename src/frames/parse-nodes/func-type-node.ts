import { ofKeyword } from "../keywords";
import { ARROW, GT, LT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class FuncTypeNode extends AbstractSequence {
  inputTypes: OptionalNode | undefined;
  returnType: TypeNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "Type";
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new PunctuationNode("Func"));
      this.addElement(new PunctuationNode(LT));
      this.addElement(new KeywordNode(ofKeyword));
      this.addElement(new SpaceNode(Space.required));
      const inputTypes = () => new CSV(() => new TypeNode(), 1);
      const sp = () => new SpaceNode(Space.required);
      const inputTypesSp = new Sequence([inputTypes, sp]);
      this.inputTypes = new OptionalNode(inputTypesSp);
      this.addElement(this.inputTypes);
      this.addElement(new PunctuationNode(ARROW));
      this.addElement(new SpaceNode(Space.required));
      this.returnType = new TypeNode();
      this.addElement(this.returnType);
      this.addElement(new PunctuationNode(GT));
      super.parseText(text.trimStart());
    }
  }
}

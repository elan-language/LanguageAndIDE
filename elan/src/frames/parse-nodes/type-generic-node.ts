import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { TypeNode } from "./type-node";
import { TypeSimple } from "./type-simple";
import { GT, LT } from "../symbols";
import { ofKeyword } from "../keywords";
import { SpaceNode } from "./space-node";
import { Space } from "./parse-node-helpers";
import { CommaNode } from "./comma-node";
import { Multiple } from "./multiple";

export class TypeGenericNode extends AbstractSequence {
  simpleType: TypeSimple | undefined;
  generic: Sequence | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "Type";
  }
  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.simpleType = new TypeSimple();
      const lt = () => new SymbolNode(LT);
      const of = () => new KeywordNode(ofKeyword);
      const sp = () => new SpaceNode(Space.required);
      const type = () => new TypeNode();
      const commaType = () =>
        new Sequence([() => new CommaNode(), () => new TypeNode()]);
      const commaTypes = () => new Multiple(commaType, 0);
      const gt = () => new SymbolNode(GT);
      this.generic =new Sequence([lt, of, sp, type, commaTypes, gt]);
      this.addElement(this.simpleType);
      this.addElement(this.generic);
      super.parseText(text);
    }
  }
}

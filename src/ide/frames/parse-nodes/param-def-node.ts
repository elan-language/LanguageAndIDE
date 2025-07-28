import { asKeyword, outKeyword } from "../keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Space } from "./parse-node-helpers";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class ParamDefNode extends AbstractSequence {
  name: IdentifierNode | undefined;
  type: TypeNode | undefined;
  out: OptionalNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "<i>name</i> as <i>Type</i>";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      const outSpace = new Sequence([
        () => new KeywordNode(outKeyword),
        () => new SpaceNode(Space.required),
      ]);
      this.out = new OptionalNode(outSpace);
      this.addElement(this.out);
      this.name = new IdentifierNode();
      this.addElement(this.name);
      this.addElement(new SpaceNode(Space.required));
      this.addElement(new KeywordNode(asKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.type = new TypeNode(
        new Set<TokenType>([
          TokenType.type_concrete,
          TokenType.type_abstract,
          TokenType.type_notInheritable,
        ]),
      );
      this.addElement(this.type);
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(outKeyword)])
      : super.symbolCompletion_keywords();
  }
}

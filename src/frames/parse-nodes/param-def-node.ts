import { TokenType } from "../helpers";
import { asKeyword, outKeyword } from "../keywords";
import { ParseStatus } from "../status-enums";
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
      this.type = new TypeNode();
      this.addElement(this.type);
      super.parseText(text);
    }
  }

  getToMatchAndTokenType(): [string, TokenType] {
    if (this.getElements()[4].status === ParseStatus.valid) {
      return this.getElements()[5].getToMatchAndTokenType();
    }

    return ["", TokenType.none];
  }
}

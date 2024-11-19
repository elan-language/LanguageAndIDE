import { SymbolCompletionSpec, TokenType } from "../helpers";
import { emptyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class EmptyOfTypeNode extends AbstractSequence {
  type: TypeNode | undefined;

  parseText(text: string): void {
    this.addElement(new KeywordNode(emptyKeyword));
    this.addElement(new SpaceNode(Space.required));
    this.type = new TypeNode();
    this.addElement(this.type);
    super.parseText(text);
  }

  override getSymbolCompletionSpecOld(): SymbolCompletionSpec {
    return new SymbolCompletionSpec(this.matchedText, [TokenType.type]);
  }
}

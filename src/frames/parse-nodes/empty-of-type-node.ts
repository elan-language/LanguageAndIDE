import { SymbolCompletionSpec_Old, TokenType } from "../helpers";
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
    this.type = new TypeNode(new Set<TokenType>([TokenType.type_concrete]));
    this.addElement(this.type);
    super.parseText(text);
  }

  override symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    return new SymbolCompletionSpec_Old(this.matchedText, new Set<TokenType>([TokenType.type]));
  }
}

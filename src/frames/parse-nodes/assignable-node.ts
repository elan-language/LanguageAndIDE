import { SymbolCompletionSpec, TokenType } from "../helpers";
import { propertyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotAfter } from "./dot-after";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Sequence } from "./sequence";

export class AssignableNode extends AbstractSequence {
  simpleOrProp: Alternatives;

  constructor() {
    super();
    const propDot = () => new DotAfter(new KeywordNode(propertyKeyword));
    const simple = () => new IdentifierNode();
    const qualProp = () => new Sequence([propDot, simple]);
    this.simpleOrProp = new Alternatives([simple, qualProp]);
    this.addElement(this.simpleOrProp);
  }

  override getSymbolCompletionSpecOld(): SymbolCompletionSpec {
    const bestMatch = this.simpleOrProp.bestMatch;

    if (bestMatch instanceof IdentifierNode) {
      return new SymbolCompletionSpec(bestMatch.matchedText, [TokenType.assignable]);
    }

    if (bestMatch instanceof Sequence) {
      const elements = bestMatch.getElements();

      return new SymbolCompletionSpec(elements[1].matchedText ?? "", [TokenType.property]);
    }

    return new SymbolCompletionSpec("", [TokenType.none]);
  }
}

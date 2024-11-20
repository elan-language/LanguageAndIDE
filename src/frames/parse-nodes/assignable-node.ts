import { SymbolCompletionSpec_Old, TokenType } from "../helpers";
import { propertyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotAfter } from "./dot-after";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Sequence } from "./sequence";

export class AssignableNode extends AbstractSequence {
  simpleOrProp: Alternatives;
  tokenTypes = [TokenType.id_parameter_out, TokenType.id_property, TokenType.id_variable];

  constructor() {
    super();
    const propDot = () => new DotAfter(new KeywordNode(propertyKeyword));
    const simple = () => new IdentifierNode(this.tokenTypes);
    const qualProp = () => new Sequence([propDot, simple]);
    this.simpleOrProp = new Alternatives([simple, qualProp]);
    this.addElement(this.simpleOrProp);
  }

  override symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    const bestMatch = this.simpleOrProp.bestMatch;

    if (bestMatch instanceof IdentifierNode) {
      return new SymbolCompletionSpec_Old(bestMatch.matchedText, [TokenType.assignable]);
    }

    if (bestMatch instanceof Sequence) {
      const elements = bestMatch.getElements();

      return new SymbolCompletionSpec_Old(elements[1].matchedText ?? "", [TokenType.id_property]);
    }

    return new SymbolCompletionSpec_Old("", [TokenType.none]);
  }
}

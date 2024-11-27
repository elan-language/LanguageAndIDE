import { propertyKeyword } from "../keywords";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotAfter } from "./dot-after";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { assignableIds } from "./parse-node-helpers";
import { Sequence } from "./sequence";

export class AssignableNode extends AbstractSequence {
  simpleOrProp: Alternatives;
  tokenTypes = new Set<TokenType>([
    TokenType.id_parameter_out,
    TokenType.id_property,
    TokenType.id_variable,
  ]);

  constructor() {
    super();
    const simple = () => new IdentifierNode(this.tokenTypes);
    const propDot = () => new DotAfter(new KeywordNode(propertyKeyword));
    const prop = () => new IdentifierNode(new Set([TokenType.id_property]));
    const qualProp = () => new Sequence([propDot, prop]);
    this.simpleOrProp = new Alternatives([simple, qualProp]);
    this.addElement(this.simpleOrProp);
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>(assignableIds);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_keywords(): Set<string> {
    return this.getElements().length === 0
      ? new Set<string>([propertyKeyword])
      : super.symbolCompletion_keywords();
  }
}

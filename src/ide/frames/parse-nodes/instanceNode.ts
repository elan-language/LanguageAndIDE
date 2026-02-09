import { Index } from ".";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { OptionalNode } from "./optional-node";
import { allIds } from "./parse-node-helpers";

export class InstanceNode extends AbstractSequence {
  variable: IdentifierNode | undefined;
  index: OptionalNode | undefined;
  tokenTypes = new Set([
    TokenType.id_let,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
  ]);

  parseText(text: string): void {
    if (text.length > 0) {
      this.variable = new IdentifierNode(this.file, this.tokenTypes);
      this.index = new OptionalNode(this.file, new Index(this.file));
      this.addElement(this.variable);
      this.addElement(this.index);
      super.parseText(text);
    }
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>(allIds);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }
}

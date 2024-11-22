import { SymbolCompletionSpec_Old, TokenType } from "../helpers";
import { libraryKeyword, propertyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotAfter } from "./dot-after";
import { IdentifierNode } from "./identifier-node";
import { InstanceNode } from "./instanceNode";
import { OptionalNode } from "./optional-node";
import { allIds } from "./parse-node-helpers";
import { Qualifier } from "./qualifier";

export class InstanceProcRef extends AbstractSequence {
  prefix: OptionalNode | undefined;
  simple: IdentifierNode | undefined;
  tokenTypes = new Set([
    TokenType.id_let,
    TokenType.id_parameter_out,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
  ]);

  constructor() {
    super();
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const qualifier = () => new DotAfter(new Qualifier());
      const instance = () => new DotAfter(new InstanceNode());
      this.prefix = new OptionalNode(new Alternatives([qualifier, instance]));
      this.simple = new IdentifierNode(this.tokenTypes);
      this.addElement(this.prefix);
      this.addElement(this.simple!);
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    return `${this.prefix!.matchedNode ? this.prefix?.matchedNode.renderAsHtml() : ""}<el-method>${this.simple?.renderAsHtml()}</el-method>`;
  }

  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    return new SymbolCompletionSpec_Old(
      this.matchedText,
      new Set<TokenType>([TokenType.idOrProcedure]),
    );
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>(allIds);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_keywords(): string[] {
    return this.getElements().length === 0
      ? [libraryKeyword, propertyKeyword]
      : super.symbolCompletion_keywords();
  }
}

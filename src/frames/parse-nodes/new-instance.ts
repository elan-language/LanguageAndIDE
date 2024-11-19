import { SymbolCompletionSpec, TokenType } from "../helpers";
import { newKeyword } from "../keywords";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";
import { TypeSimpleOrGeneric } from "./type-simple-or-generic";
import { WithClause } from "./with-clause";

export class NewInstance extends AbstractSequence {
  type: TypeSimpleOrGeneric | undefined;
  args: CSV | undefined;
  withClause: OptionalNode | undefined;

  parseText(text: string): void {
    this.addElement(new KeywordNode(newKeyword));
    this.addElement(new SpaceNode(Space.required));
    this.type = new TypeSimpleOrGeneric();
    this.addElement(this.type);
    this.addElement(new PunctuationNode(OPEN_BRACKET));
    this.args = new CSV(() => new ExprNode(), 0);
    this.args.setCompletionWhenEmpty("<i>arguments</i>");
    this.addElement(this.args);
    this.addElement(new PunctuationNode(CLOSE_BRACKET));
    this.withClause = new OptionalNode(new WithClause());
    this.addElement(this.withClause);
    super.parseText(text);
  }

  getSymbolCompletionSpec(): SymbolCompletionSpec {
    const spec = this.withClause!.getSymbolCompletionSpec();
    const id = spec.toMatch;
    const tokenType = spec.tokenTypes[0];
    if (tokenType !== TokenType.none) {
      return new SymbolCompletionSpec(`${this.type?.matchedText}.${id}`, tokenType);
    }

    return new SymbolCompletionSpec(this.type?.matchedText ?? "", TokenType.type);
  }
}

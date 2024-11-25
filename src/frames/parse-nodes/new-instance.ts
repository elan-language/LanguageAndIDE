import { newKeyword } from "../keywords";
import { TokenType } from "../symbol-completion-helpers";
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
    this.type = new TypeSimpleOrGeneric(new Set<TokenType>([TokenType.type_concrete]));
    this.addElement(this.type);
    this.addElement(new PunctuationNode(OPEN_BRACKET));
    this.args = new CSV(() => new ExprNode(), 0);
    this.args.setSyntaxCompletionWhenEmpty("<i>arguments</i>");
    this.addElement(this.args);
    this.addElement(new PunctuationNode(CLOSE_BRACKET));
    this.withClause = new OptionalNode(new WithClause(() => this.type!.matchedText));
    this.addElement(this.withClause);
    super.parseText(text);
  }

  symbolCompletion_keywords(): Set<string> {
    return this.getElements().length === 0
      ? new Set<string>([newKeyword])
      : super.symbolCompletion_keywords();
  }
}

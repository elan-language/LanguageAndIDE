import { newKeyword, withKeyword } from "../keywords";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { Sequence } from "./sequence";
import { SetClause } from "./set-clause";
import { SpaceNode } from "./space-node";
import { TypeSimpleOrGeneric } from "./type-simple-or-generic";

export class NewInstance extends AbstractSequence {
  type: TypeSimpleOrGeneric | undefined;
  args: CSV | undefined;

  parseText(text: string): void {
    this.addElement(new KeywordNode(newKeyword));
    this.addElement(new SpaceNode(Space.required));
    this.type = new TypeSimpleOrGeneric();
    this.addElement(this.type);
    this.addElement(new PunctuationNode(OPEN_BRACKET));
    this.args = new CSV(() => new ExprNode(), 0);
    this.args.setCompletionWhenEmpty("arguments");
    this.addElement(this.args);
    this.addElement(new PunctuationNode(CLOSE_BRACKET));
    // optional with clause
    const sp1 = () => new SpaceNode(Space.required);
    const withK = () => new KeywordNode(withKeyword);
    const sp2 = () => new SpaceNode(Space.required);
    const changes = () => new CSV(() => new SetClause(), 1);
    const withClause = new OptionalNode(new Sequence([sp1, withK, sp2, changes]));
    this.addElement(withClause);
    super.parseText(text);
  }
}

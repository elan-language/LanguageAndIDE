import { newKeyword } from "../keywords";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { SymbolNode } from "./symbol-node";
import { TypeSimpleOrGeneric } from "./type-simple-or-generic";

export class NewInstance extends AbstractSequence {
  type: TypeSimpleOrGeneric | undefined;
  args: CSV | undefined;

  parseText(text: string): void {
    this.addElement(new KeywordNode(newKeyword));
    this.addElement(new SpaceNode(Space.required));
    this.type = new TypeSimpleOrGeneric();
    this.addElement(this.type);
    this.addElement(new SymbolNode(OPEN_BRACKET));
    this.args = new CSV(() => new ExprNode(), 0);
    this.args.setCompletionWhenEmpty("arguments");
    this.addElement(this.args);
    this.addElement(new SymbolNode(CLOSE_BRACKET));
    super.parseText(text);
  }
}

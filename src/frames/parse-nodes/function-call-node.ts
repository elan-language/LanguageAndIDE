import { globalKeyword, libraryKeyword } from "../keywords";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { ArrayListNode } from "./array-list-node";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { IdentifierNode } from "./identifier-node";
import { ImmutableListNode } from "./immutable-list-node";
import { InstanceNode } from "./instanceNode";
import { KeywordNode } from "./keyword-node";
import { LitValueNode } from "./lit-value";
import { OptionalNode } from "./optional-node";
import { PunctuationNode } from "./punctuation-node";
import { Qualifier } from "./qualifier";

export class FunctionCallNode extends AbstractSequence {
  qualifier: OptionalNode | undefined;
  name: IdentifierNode | undefined;
  args: CSV | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      const array = () => new Qualifier(new ArrayListNode(() => new ExprNode()));
      const list = () => new Qualifier(new ImmutableListNode(() => new ExprNode()));
      const literal = () => new Qualifier(new LitValueNode());
      const global = () => new Qualifier(new KeywordNode(globalKeyword));
      const lib = () => new Qualifier(new KeywordNode(libraryKeyword));
      const instance = () => new Qualifier(new InstanceNode());
      const qualifier = new Alternatives([global, lib, instance, literal, list, array]);
      this.qualifier = new OptionalNode(qualifier);
      this.name = new IdentifierNode();
      this.args = new CSV(() => new ExprNode(), 0);

      this.addElement(this.qualifier);
      this.addElement(this.name);
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.addElement(this.args); //arg list
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `${this.qualifier?.renderAsHtml()}<method>${this.name!.renderAsHtml()}</method>(${this.args!.renderAsHtml()})`;
  }
}

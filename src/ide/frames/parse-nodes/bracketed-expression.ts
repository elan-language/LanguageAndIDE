import { File } from "../frame-interfaces/file";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";

export class BracketedExpression extends AbstractSequence {
  expr: ExprNode | undefined;

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr("");
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.file, OPEN_BRACKET));
      this.expr = new ExprNode(this.file);
      this.addElement(this.expr);
      this.addElement(new SpaceNode(this.file, Space.ignored));
      this.addElement(new PunctuationNode(this.file, CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}

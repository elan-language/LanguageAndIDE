import { AbstractAlternatives } from "./abstract-alternatives";
import { ExprNode } from "./expr-node";
import { IndexDouble } from "./index-double";
import { IndexRange } from "./index-range";

export class IndexValue extends AbstractAlternatives {
  contents: IndexValue | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.alternatives.push(new ExprNode(this.file));
      this.alternatives.push(new IndexDouble(this.file));
      this.alternatives.push(new IndexRange(this.file));
      super.parseText(text);
    }
  }
}

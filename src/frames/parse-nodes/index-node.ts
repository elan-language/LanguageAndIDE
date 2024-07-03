import { IndexDouble } from "./index-double";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IndexSingle } from "./index-single";

export class IndexNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "name";
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.alternatives.push(new IndexDouble());
      this.alternatives.push(new IndexSingle());
      super.parseText(text);
    }
  }
}

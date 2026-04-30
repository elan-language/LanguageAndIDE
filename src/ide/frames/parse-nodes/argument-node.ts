import { File } from "../frame-interfaces/file";
import { AbstractAlternatives } from "./abstract-alternatives";
import { ExprNode } from "./expr-node";
import { Lambda } from "./lambda";

export class ArgumentNode extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "<i>value or expression</i>";
  }

    parseText(text: string): void {
      //evaluate options that start with a keyword, first
      if (text.trim().length > 0) {
        this.alternatives.push(new Lambda(this.file));
        this.alternatives.push(new ExprNode(this.file));
        super.parseText(text);
      }
    }
}
import { globalKeyword, libraryKeyword, propertyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotAfter } from "./dot-after";
import { IdentifierNode } from "./identifier-node";
import { IndexNode } from "./index-node";
import { IndexSingle } from "./index-single";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";

export class VarRefCompound extends AbstractSequence {
  optQualifier: OptionalNode | undefined;
  simple: IdentifierNode | undefined;
  index: OptionalNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "variable";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const instance = () => new DotAfter(new IdentifierNode());
      const global = () => new DotAfter(new KeywordNode(globalKeyword));
      const lib = () => new DotAfter(new KeywordNode(libraryKeyword));
      const prop = () => new DotAfter(new KeywordNode(propertyKeyword));
      const qualifier = new Alternatives([global, lib, prop, instance]);
      this.optQualifier = new OptionalNode(qualifier);
      this.simple = new IdentifierNode();
      this.index = new OptionalNode(new IndexSingle());
      this.addElement(this.optQualifier!);
      this.addElement(this.simple!);
      this.addElement(this.index!);
      super.parseText(text);
    }
  }
}

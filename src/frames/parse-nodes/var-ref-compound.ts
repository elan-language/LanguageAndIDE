import { globalKeyword, libraryKeyword, propertyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { Dotted } from "./dotted";
import { IdentifierNode } from "./identifier-node";
import { IndexNode } from "./index-node";
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
      const instance = () => new Dotted(new IdentifierNode());
      const global = () => new Dotted(new KeywordNode(globalKeyword));
      const lib = () => new Dotted(new KeywordNode(libraryKeyword));
      const prop = () => new Dotted(new KeywordNode(propertyKeyword));
      const qualifier = new Alternatives([global, lib, prop, instance]);
      this.optQualifier = new OptionalNode(qualifier);
      this.simple = new IdentifierNode();
      this.index = new OptionalNode(new IndexNode());
      this.addElement(this.optQualifier!);
      this.addElement(this.simple!);
      this.addElement(this.index!);
      super.parseText(text);
    }
  }
}

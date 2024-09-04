import { propertyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotAfter } from "./dot-after";
import { IdentifierNode } from "./identifier-node";
import { IndexSingle } from "./index-single";
import { KeywordNode } from "./keyword-node";
import { Multiple } from "./multiple";
import { OptionalNode } from "./optional-node";
import { Sequence } from "./sequence";

export class AssignableNode extends AbstractSequence {
  simpleOrProp: Alternatives;
  index: OptionalNode;

  constructor() {
    super();
    const propDot = () => new DotAfter(new KeywordNode(propertyKeyword));
    const simple = () => new IdentifierNode();
    const qualProp = () => new Sequence([propDot, simple]);
    this.simpleOrProp = new Alternatives([simple, qualProp]);
    this.addElement(this.simpleOrProp);
    const single = () => new IndexSingle();
    const double = () => new Sequence([() => new IndexSingle(), () => new IndexSingle()]);
    const options = new Alternatives([single, double]);
    this.index = new OptionalNode(options);
    this.addElement(this.index);
  }
}

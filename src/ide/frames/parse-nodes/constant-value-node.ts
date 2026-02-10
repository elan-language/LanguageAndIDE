import { AbstractAlternatives } from "./abstract-alternatives";
import { DictionaryNode } from "./dictionary-node";
import { IdentifierNode } from "./identifier-node";
import { ListNode } from "./list-node";
import { LitValueNode } from "./lit-value-node";
import { TupleNode } from "./tuple-node";
import { File } from "../frame-interfaces/file";

export class ConstantValueNode extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    this.alternatives.push(new IdentifierNode(this.file));
    this.alternatives.push(new LitValueNode(this.file));
    this.alternatives.push(new TupleNode(this.file)); //TODO This could do with constraints on members - as below
    this.alternatives.push(new ListNode(this.file, () => new ConstantValueNode(this.file)));
    this.alternatives.push(
      new DictionaryNode(
        this.file,
        () => new ConstantValueNode(this.file),
        () => new ConstantValueNode(this.file),
      ),
    );
    super.parseText(text);
  }
}

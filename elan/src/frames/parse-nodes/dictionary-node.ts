import { ParseNode } from "./parse-node";
import { KVPnode } from "./kvp-node";
import { AbstractParseNode } from "./abstract-parse-node";
import { ImmutableListNode } from "./immutable-list-node";
import { ArrayListNode } from "./array-list-node";

export class DictionaryNode extends AbstractParseNode {
  kvps: ImmutableListNode | undefined;
  private keyConstructor: () => ParseNode;
  private valueConstructor: () => ParseNode;

  constructor(
    keyConstructor: () => ParseNode,
    valueConstructor: () => ParseNode,
  ) {
    super();
    this.keyConstructor = keyConstructor;
    this.valueConstructor = valueConstructor;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const kvpConstructor = () =>
        new KVPnode(this.keyConstructor, this.valueConstructor);
      this.kvps = new ArrayListNode(kvpConstructor);
      this.kvps.parseText(text);
      this.updateFrom(this.kvps);
    }
  }
}

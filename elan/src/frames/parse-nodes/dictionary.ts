import { ParseNode } from "./parse-node";
import { KVPnode } from "./kvp-node";
import { AbstractParseNode } from "./abstract-parse-node";
import { List } from "./list";

export class Dictionary extends AbstractParseNode  {

    listConstructor: () => ParseNode;
    kvpConstructor: () => ParseNode;

    constructor(keyConstructor: () => ParseNode, valueConstructor: () => ParseNode ) {
        super();
        this.kvpConstructor = () => new KVPnode(keyConstructor, valueConstructor);
        this.listConstructor = () => new List(this.kvpConstructor);
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            var list = this.listConstructor();
            list.parseText(text);
            this.updateFrom(list);
        }
    }
    
    get symbolType() {
       return undefined;
    }
}
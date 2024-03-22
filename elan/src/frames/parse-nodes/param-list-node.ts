import { AbstractParseNode } from "./abstract-parse-node";
import { CSV } from "./csv";
import { ParamDefNode } from "./param-def-node copy";

export class ParamListNode extends AbstractParseNode {

    parseText(text: string): void {
        if (text.trim().length > 0) {
            var list = new CSV(() => new ParamDefNode(), 0);
            list.parseText(text); 
            this.updateFrom(list);      
        }
    }
}
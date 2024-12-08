import { CSV } from "./csv";
import { ParamDefNode } from "./param-def-node";

export class ParamListNode extends CSV {
    constructor() {
        super(() => new ParamDefNode(), 0);
        this.setSyntaxCompletionWhenEmpty("<i>parameter definitions</i>");
    }
}
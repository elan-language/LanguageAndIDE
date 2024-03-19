import { RegExMatchNode } from "./regex-match-node";

export class TypeSimpleNode extends RegExMatchNode {

    constructor() {
        super(/^\s*[A-Z]\w*/);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}


import { RegExMatchNode } from "./regex-match-node";

export class TypeSimpleNode extends RegExMatchNode {

    constructor() {
        super(/^\s*[A-Z]\w*/);
        this.completionWhenEmpty = "Type";
    }
    renderAsHtml(): string {
        return `<type>${this.renderAsSource()}</type>`;
    }
}


import { ClassType } from "../../symbols/class-type";
import { Field } from "../interfaces/field";
import { RegExMatchNode } from "./regex-match-node";

export class TypeSimpleNode extends RegExMatchNode {

    constructor() {
        super(/^\s*[A-Z]\w*/);
        this.placeholder = "Type";
    }
    renderAsHtml(): string {
        return `<type>${this.renderAsSource()}</type>`;
    }
}


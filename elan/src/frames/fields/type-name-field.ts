import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";

import { ParseNode } from "../parse-nodes/parse-node";
import { TypeSimpleNode } from "../parse-nodes/type-simple-node";
import { AbstractField } from "./abstract-field";

export class TypeNameField extends AbstractField {
    isParseByNodes = true;
    constructor(holder: Frame) {
        super(holder);
        this.useHtmlTags = true;
        this.placeholder = "Name";
    }

    initialiseRoot(): ParseNode {
        this.rootNode = new TypeSimpleNode(this);
        return this.rootNode;
    }

    readToDelimeter: (source: CodeSource) => string =  (source: CodeSource) => source.readUntil(/[^a-zA-Z0-9_]/);


    getIdPrefix(): string {
        return 'type';
    }
    public textAsHtml(): string {
        if (this.selected) {
            return super.textAsHtml();
        }
        else{ 
            return `<type>${this.text}</type>`;
        } 
    }

}
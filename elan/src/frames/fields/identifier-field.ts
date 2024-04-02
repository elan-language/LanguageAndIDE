import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";

import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class IdentifierField extends AbstractField {
    isParseByNodes: boolean = true;

    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }

    initialiseRoot(): ParseNode {
        this.rootNode = new IdentifierNode();
        return this.rootNode;
    }
    readToDelimeter: (source: CodeSource) => string = (source: CodeSource) => source.readUntil(/[^a-zA-Z0-9_]/);

    getIdPrefix(): string {
        return 'ident';
    }
}
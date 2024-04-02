import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";

import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { LitString } from "../parse-nodes/lit-string";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class ExceptionMessage extends AbstractField {
    isParseByNodes = true;
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("message");
    }
    getIdPrefix(): string {
        return 'msg';
    }
    initialiseRoot(): ParseNode { 
        this.rootNode = new Alternatives([() => new LitString(),() => new IdentifierNode() ]);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = 
    (source: CodeSource) => source.readToEndOfLine();
}
import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { LitString as LitStringNonEmpty } from "../parse-nodes/lit-string";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class ExceptionMessage extends AbstractField {
    isParseByNodes = true;
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("message");
        this.help = `message defined as a literal string (in quotes), or the name of a previously-defined variable or constant containing a string.`;
    }
    getIdPrefix(): string {
        return 'msg';
    }
    initialiseRoot(): ParseNode {
        this.astNode = undefined; 
        this.rootNode = new Alternatives([() => new LitStringNonEmpty(),() => new IdentifierNode() ]);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = 
    (source: CodeSource) => source.readToEndOfLine();
}
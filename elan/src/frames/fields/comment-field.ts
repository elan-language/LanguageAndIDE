import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";

import { ParseNode } from "../parse-nodes/parse-node";
import { RegExMatchNode } from "../parse-nodes/regex-match-node";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

export class CommentField extends AbstractField  {
    isParseByNodes = true; 

    constructor(holder: Frame) {
        super(holder);
        this.setOptional(true);
        this.setPlaceholder("comment");
    }
    initialiseRoot(): ParseNode {
        this.rootNode = new RegExMatchNode(Regexes.anythingToNewLineAsRegExp, this);
        return this.rootNode;
    }
    readToDelimeter: (source: CodeSource) => string =  (source: CodeSource) => source.readToEndOfLine();

    getIdPrefix(): string {
        return 'comment';
    }

}
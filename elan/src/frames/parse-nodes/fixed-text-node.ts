import { AbstractParseNode } from "./abstract-parse-node";

export abstract class FixedTextNode extends AbstractParseNode {
    fixedText: string;

    constructor(fixedText: string) {
        super();
        this.fixedText = fixedText;
        this.placeholder = fixedText;
    }
}


import { Alternatives } from "./alternatives";
import { IdentifierNode } from "./identifier-node";
import { IndexNode } from "./index-node";
import { OptionalNode } from "./optional-node";
import { globalKeyword, libraryKeyword, propertyKeyword } from "../keywords";
import { KeywordNode } from "./keyword-node";
import { AbstractSequence } from "./abstract-sequence";
import { Qualifier } from "./qualifier";

export class VarRefCompound extends AbstractSequence {
    optQualifier: OptionalNode | undefined;
    simple: IdentifierNode | undefined;
    index: OptionalNode | undefined;

    constructor() {
        super();
        this.completionWhenEmpty = "variable";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            const instance = () => new Qualifier(new IdentifierNode());
            const global = () => new Qualifier(new KeywordNode(globalKeyword));
            const lib = () => new Qualifier(new KeywordNode(libraryKeyword));
            const prop = () => new Qualifier(new KeywordNode(propertyKeyword));
            const qualifier = new Alternatives([global, lib, prop, instance]);
            this.optQualifier =  new OptionalNode(qualifier);
            this.simple = new IdentifierNode();
            this.index = new OptionalNode(new IndexNode());
            this.addElement(this.optQualifier!);
            this.addElement(this.simple!);
            this.addElement(this.index!);
            super.parseText(text);
        }
    }
}
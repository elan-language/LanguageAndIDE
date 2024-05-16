import { propertyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { IndexNode } from "./index-node";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Qualifier } from "./qualifier";

export class AssignableNode extends AbstractSequence {

    qualifier: OptionalNode;
    simple: IdentifierNode;
    index: OptionalNode;

    constructor() {
        super();
        const qualDot =  new Qualifier(new KeywordNode(propertyKeyword));
        this.qualifier = new OptionalNode(qualDot);
        this.simple =  new IdentifierNode();
        this.index =  new OptionalNode(new IndexNode());
        this.addElement(this.qualifier);
        this.addElement(this.simple);
        this.addElement(this.index);
    }

}
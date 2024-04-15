import { AbstractAlternatives } from "./abstract-alternatives";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { TypeWithOptGenerics } from "./type-with-opt-generics";
import { ARROW, GT, LT } from "../symbols";
import { ofKeyword } from "../keywords";
import { CommaNode } from "./comma-node";
import { KeywordNode } from "./keyword-node";
import { Multiple } from "./multiple";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeTuple } from "./type-tuple";

export class TypeNode extends AbstractAlternatives {

    constructor() {
        super();
        this.placeholder = "Type";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            // Func - tested first because 'Func' is syntactically valid as a simple type name
            if (text.trimStart().startsWith("Func")) {
                var f = () => new SymbolNode("Func");
                var lt = () => new SymbolNode(LT);
                var of = () => new KeywordNode(ofKeyword);
                var sp0 = () => new SpaceNode(Space.required);
                var type = () => new TypeNode();
                var commaType = () => new Sequence([() => new CommaNode() ,() => new TypeNode()]);
                var commaTypes = () => new Multiple(commaType, 0);
                var sp1 = () => new SpaceNode(Space.required);
                var arrow = () => new SymbolNode(ARROW);;
                var sp2 = () => new SpaceNode(Space.required);
                var retType = () => new TypeNode();
                var gt =() => new SymbolNode(GT);
                var func = new Sequence([f,lt,of,sp0,type,commaTypes,sp1,arrow,sp2,retType,gt]);
                this.alternatives.push(func);
            } else if (text.trimStart().startsWith("(")) {
                var tuple = new TypeTuple();
                this.alternatives.push(tuple);
            } 
            var single = new TypeWithOptGenerics();
            this.alternatives.push(single);
            super.parseText(text.trimStart());
        }
    }
}

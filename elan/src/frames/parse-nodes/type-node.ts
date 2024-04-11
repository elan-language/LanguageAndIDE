import { AbstractAlternatives } from "./abstract-alternatives";
import { CSV } from "./csv";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { TypeWithOptGenerics } from "./type-with-opt-generics";
import { ARROW, CLOSE_BRACKET, GT, LT, OPEN_BRACKET } from "../symbols";
import { RuleNames } from "./rule-names";
import { FixedTextNode } from "./fixed-text-node";
import { ofKeyword, returnKeyword } from "../keywords";
import { CommaNode } from "./comma-node";
import { KeywordNode } from "./keyword-node";
import { Multiple } from "./multiple";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class TypeNode extends AbstractAlternatives {

    constructor() {
        super();
        this.placeholder = "Type";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            // Func - tested first because 'Func' is syntactically valid as a simple type name
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
            // Single
            var single = new TypeWithOptGenerics();
            // Tuple
            var open = () => new SymbolNode(OPEN_BRACKET);
            var csv = () => new CSV(() => new TypeNode(), 2);
            var close =() => new SymbolNode(CLOSE_BRACKET);
            var tuple = new Sequence([open,csv,close], RuleNames.tuple);
            this.alternatives.push(func);
            this.alternatives.push(single);
            this.alternatives.push(tuple);
            super.parseText(text);
        }
    }
}

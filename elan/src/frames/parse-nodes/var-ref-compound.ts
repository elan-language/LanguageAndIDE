
import { UnknownType } from "../../symbols/unknown-type";

import { Alternatives } from "./alternatives";
import { IdentifierNode } from "./identifier-node";
import { IndexNode } from "./index-node";
import { OptionalNode } from "./optional-node";
import { globalKeyword, libraryKeyword, propertyKeyword } from "../keywords";
import { KeywordNode } from "./keyword-node";
import { Sequence } from "./sequence";
import { SymbolNode } from "./symbol-node";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Multiple } from "./multiple";
import { DOT } from "../symbols";
import { RuleNames } from "./rule-names";
import { AbstractSequence } from "./abstract-sequence";

export class VarRefCompound extends AbstractSequence {
    optQualifier: OptionalNode | undefined;
    simple: IdentifierNode | undefined;
    indexes: Multiple | undefined;

    constructor() {
        super();
        this.placeholder = "variable";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            
            var instance = () => new IdentifierNode();
            var prop = () => new KeywordNode(propertyKeyword);
            var global = () => new KeywordNode(globalKeyword);
            var lib = () => new KeywordNode(libraryKeyword);
            var qualifier = () => new Alternatives([prop, global, lib, instance]);
            var dot = () => new SymbolNode(DOT);
            var qualDot = () => new Sequence([qualifier, dot], RuleNames.qualDot);
            
            this.simple = new IdentifierNode();
            this.optQualifier =  new OptionalNode(qualDot);
            this.indexes = new Multiple(() => new IndexNode(), 0, RuleNames.indexes);
            this.elements.push(this.optQualifier!);
            this.elements.push(this.simple!);
            this.elements.push(this.indexes!);
            super.parseText(text);
        }
    }
}
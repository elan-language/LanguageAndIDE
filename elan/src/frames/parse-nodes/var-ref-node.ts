
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

export class VarRefNode extends AbstractAlternatives {
    constructor() {
        super();
        this.placeholder = "variable";
    }

    parseText(text: string): void {
        var simple = () => new IdentifierNode();
        var instance = () => new IdentifierNode();
        var prop = () => new KeywordNode(propertyKeyword);
        var global = () => new KeywordNode(globalKeyword);
        var lib = () => new KeywordNode(libraryKeyword);
        var qualifier = () => new Alternatives([prop, global, lib, instance]);
        var dot = () => new SymbolNode(DOT);
        var qualDot = () => new Sequence([qualifier, dot], RuleNames.qualDot);
        var optQualifier = () => new OptionalNode(qualDot);
        var indexes = () => new Multiple(() => new IndexNode(), 0, RuleNames.indexes);
        var compound = () => new Sequence( [optQualifier, simple, indexes ], RuleNames.compound);
        this.alternatives.push(simple());
        this.alternatives.push(compound());
        super.parseText(text);
    }
}
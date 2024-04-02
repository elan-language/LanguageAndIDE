import { IHasSymbolType } from "../../symbols/has-symbol-type";
import { UnknownType } from "../../symbols/unknown-type";
import { isHasSymbolType } from "../../symbols/symbolHelpers";
import { Field } from "../interfaces/field";
import { AbstractSequence } from "./abstract-sequence";
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

export class VarRefNode extends AbstractAlternatives implements IHasSymbolType {
    constructor(field : Field) {
        super(field);
        this.placeholder = "variable";
    }

    parseText(text: string): void {
        var simple = () => new IdentifierNode(this.field);
        var instance = () => new IdentifierNode(this.field);
        var prop = () => new KeywordNode(propertyKeyword, this.field);
        var global = () => new KeywordNode(globalKeyword, this.field);
        var lib = () => new KeywordNode(libraryKeyword, this.field);
        var qualifier = () => new Alternatives([prop, global, lib, instance], this.field);
        var dot = () => new SymbolNode(DOT, this.field);
        var qualDot = () => new Sequence([qualifier, dot], this.field);
        var optQualifier = () => new OptionalNode(qualDot, this.field);

        var indexes = () => new Multiple(() => new IndexNode(this.field), 0,this.field);
        var compound = () => new Sequence( [optQualifier, simple, indexes ], this.field);
        this.alternatives.push(simple());
        this.alternatives.push(compound());
        super.parseText(text);
    }

    get symbolType() {
        // kludge 
        var id = this.bestMatch;

        if (isHasSymbolType(id)){
            return id.symbolType;
        }

        return UnknownType.Instance;
    }
}
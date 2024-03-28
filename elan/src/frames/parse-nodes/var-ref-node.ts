import { IHasSymbolType } from "../../symbols/has-symbol-type";
import { UnknownType } from "../../symbols/unknown-type";
import { isHasSymbolType } from "../../symbols/symbolHelpers";
import { Field } from "../interfaces/field";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { IdentifierNode } from "./identifier-node";
import { IndexNode } from "./index-node";
import { Optional } from "./optional";
import { globalKeyword, libraryKeyword, propertyKeyword } from "../keywords";
import { KeywordNode } from "./keyword-node";
import { Sequence } from "./sequence";
import { SymbolNode } from "./symbol-node";

export class VarRefNode extends AbstractSequence implements IHasSymbolType {
    constructor(field : Field) {
        super(field);
    }

    parseText(text: string): void {
        var prop = () => new KeywordNode(propertyKeyword, this.field);
        var global = () => new KeywordNode(globalKeyword, this.field);
        var lib = () => new KeywordNode(libraryKeyword, this.field);
        var qualifier = () => new Alternatives([prop, global, lib], this.field);
        var dot = () => new SymbolNode(".", this.field);
        var qualDot = () => new Sequence([qualifier, dot], this.field);
        var optQualifier = new Optional(qualDot, this.field);
        this.elements.push(optQualifier);
        this.elements.push(new IdentifierNode(this.field));
        this.elements.push(new Optional(() => new IndexNode(this.field), this.field));
        super.parseText(text);
    }

    get symbolType() {
        // kludge 
        var id = (this.elements[0] as Alternatives).bestMatch;

        if (isHasSymbolType(id)){
            return id.symbolType;
        }

        return UnknownType.Instance;
    }
}
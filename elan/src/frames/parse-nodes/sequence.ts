
import { IHasSymbolType } from "../../symbols/has-symbol-type";
import { IHasSymbolTypes } from "../../symbols/has-symbol-types";
import { UnknownType } from "../../symbols/unknown-type";
import { isHasSymbolType, mapSymbolTypes } from "../../symbols/symbolHelpers";
import { Field } from "../interfaces/field";
import { AbstractSequence } from "./abstract-sequence";
import { ParseNode } from "./parse-node";

export class Sequence extends AbstractSequence implements IHasSymbolTypes {

    elementConstructors: (() => ParseNode)[];
    constructor(elementConstructors: (() => ParseNode)[]) {
        super();
        this.elementConstructors = elementConstructors;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elementConstructors.forEach(ec => {
                this.elements.push(ec());
            });
        }
        super.parseText(text);
    }

    get symbolTypes() {
        return mapSymbolTypes(this.elements);
    }
}
import { TupleType } from "../../symbols/tuple-type";
import { Field } from "../interfaces/field";
import { AstNode } from "./ast-node";

export class LiteralTupleAsn {
    constructor(private readonly items: AstNode[], field: Field) {

    }

    get symbolType() {
        return new TupleType(this.items.map(i => i.symbolType!));
    }

    toString() {
        const it = this.items.map(p => p.toString()).join(", ");
        return `(${it})`;
    }
}
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { AstNode } from "./ast-node";

export class IndexedAsn {

    constructor(private id: string, private index : AstNode, private field : Field) {
        this.id = id.trim();
    }

    get symbolType() {
        var holder = this.field.getHolder();
        return holder.resolveSymbol(this.id, holder as Frame).symbolType;
    }

    toString() {
        return `${this.id}[${this.index}]`;
    }
}
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { AstNode } from "./ast-node";

export class TypeAsn {

    constructor(private type: string, private genericParameters : Array<AstNode>, private field : Field) {
        this.type = type.trim();
    }

    get symbolType() {
        // var holder = this.field.getHolder();
        // return holder.resolveSymbol(this.id, holder as Frame).symbolType;
        return undefined;
    }

    toString() {
        const pp = this.genericParameters.map(p => p.toString()).join(", "); 
        const gp = pp ? `<${pp}>` : "";
        return `Type ${this.type}${gp}`;
    }

}
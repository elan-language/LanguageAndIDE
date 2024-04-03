import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { QualifierAsn } from "./qualifier-asn";

export class FuncCallAsn {

    constructor(private id: string, private qualifier : AstNode | undefined, private parameters: Array<ExprAsn>, private field : Field) {
        this.id = id.trim();
    }

    get symbolType() {
        var holder = this.field.getHolder();
        return holder.resolveSymbol(this.id, holder as Frame).symbolType;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");
        const q = this.qualifier ? `${this.qualifier}` : "";

        return  `Func Call ${q}${this.id} (${pp})`;
    }

}
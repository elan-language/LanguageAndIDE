import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { ExprAsn } from "./expr-asn";

export class FuncCallAsn {

    constructor(private id: string, private parameters: Array<ExprAsn>, private field : Field) {
        this.id = id.trim();
    }

    get symbolType() {
        var holder = this.field.getHolder();
        return holder.resolveSymbol(this.id, holder as Frame).symbolType;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");

        return  `Func Call ${this.id} (${pp})`;
    }

}
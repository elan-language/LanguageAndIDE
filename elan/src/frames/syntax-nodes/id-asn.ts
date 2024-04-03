import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";

export class IdAsn {

    constructor(private id: string, private field: Field) {
        this.id = id.trim();
    }

    get symbolType() {
        var holder = this.field.getHolder();
        return holder.resolveSymbol(this.id, holder as Frame).symbolType;
    }

    toString() {
        return this.id;
    }

}
import { BooleanType } from "../../symbols/boolean-type";
import { CharType } from "../../symbols/char-type";
import { DictionaryType } from "../../symbols/dictionary-type";
import { FloatType } from "../../symbols/float-type";
import { IntType } from "../../symbols/int-type";
import { ListType } from "../../symbols/list-type";
import { StringType } from "../../symbols/string-type";
import { TupleType } from "../../symbols/tuple-type";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { AstNode } from "./ast-node";

export class VarAsn {

    constructor(private id: string, private qualifier: string, private field: Field) {
        this.id = id.trim();
        this.qualifier = qualifier.trim();
    }

    get symbolType() {

        var holder = this.field.getHolder();
        return holder.resolveSymbol(this.id, holder as Frame).symbolType;
    }

    toString() {
        const qual = this.qualifier ? `${this.qualifier}` : "";
        return `${qual}${this.id}`;
    }

}
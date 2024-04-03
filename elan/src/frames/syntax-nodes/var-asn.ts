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

    constructor(private id: string, private qualifier : AstNode | undefined, private index : AstNode | undefined, private field: Field) {
        this.id = id.trim();
    }

    get symbolType() {

        var holder = this.field.getHolder();
        return holder.resolveSymbol(this.id, holder as Frame).symbolType;
    }

    toString() {
        const q = this.qualifier ? `${this.qualifier}.` : "";
        const idx = this.index ? `${this.index}` : "";
        return `${q}${this.id}${idx}`;
    }

}
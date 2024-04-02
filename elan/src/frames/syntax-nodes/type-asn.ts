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

export class TypeAsn {

    constructor(private type: string, private genericParameters : Array<AstNode>, private field : Field) {
        this.type = type.trim();
    }

    get symbolType() {
        switch (this.type) {
            case ("Int") : return IntType.Instance;
            case ("Float") : return FloatType.Instance;
            case ("Boolean") : return BooleanType.Instance;
            case ("String") : return StringType.Instance;
            case ("Char") : return CharType.Instance;
            case ("List") : return new ListType(this.genericParameters[0].symbolType!);
            case ("Dictionary") : return new DictionaryType(this.genericParameters[0].symbolType!, this.genericParameters[1].symbolType!);
            case ("Tuple") : throw new TupleType(this.genericParameters.map(p => p.symbolType!));
            case ("Iter") : throw new Error("Not impl");
        }
        return undefined;
    }

    toString() {
        const pp = this.genericParameters.map(p => p.toString()).join(", "); 
        const gp = pp ? `<${pp}>` : "";
        return `Type ${this.type}${gp}`;
    }

}
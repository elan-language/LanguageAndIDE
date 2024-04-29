import { BooleanType } from "../../symbols/boolean-type";
import { ClassType } from "../../symbols/class-type";
import { DictionaryType } from "../../symbols/dictionary-type";
import { NumberType } from "../../symbols/number-type";
import { GenericClassType } from "../../symbols/generic-class-type";
import { IntType } from "../../symbols/int-type";
import { IterType } from "../../symbols/iter-type";
import { ListType } from "../../symbols/list-type";
import { StringType } from "../../symbols/string-type";
import { TupleType } from "../../symbols/tuple-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { CompileError } from "../compile-error";


export class TypeAsn implements AstNode {

    constructor(public readonly type: string, public genericParameters: AstNode[], private scope: Scope) {
        this.type = type.trim();
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        var cc: CompileError[] = [];
        for (const i of this.genericParameters) {
            cc = cc.concat(i.aggregateCompileErrors());
        }
        return this.compileErrors.concat(cc);
    }

    compile(): string {
        this.compileErrors = [];
        if (this.type === "Dictionary") {
            return "Object";
        }

        if (this.type === "List") {
            return "Array";
        }

        return this.type;
    }

    renderAsDefaultObjectCode(): string {
        switch (this.type) {
            case "Int":
            case "Float": return "0";
            case "Char":
            case "String": return '""';
            case "Boolean": return "false";
            case "List": return "system.defaultList()";
            case "Array": return "system.defaultArray()";
            case "Dictionary": return "system.defaultDictionary()";
            case "Iter": return "system.defaultIter()";
        }
        return `${this.type}.defaultInstance()`;
    }


    get symbolType() {
        switch (this.type) {
            case ("Int"): return IntType.Instance;
            case ("Float"): return NumberType.Instance;
            case ("Boolean"): return BooleanType.Instance;
            case ("String"): return StringType.Instance;
            case ("List"): return new ListType(this.genericParameters[0].symbolType!);
            case ("Dictionary"): return new DictionaryType(this.genericParameters[0].symbolType!, this.genericParameters[1].symbolType!);
            case ("Tuple"): return new TupleType(this.genericParameters.map(p => p.symbolType!));
            case ("Iter"): return new IterType(this.genericParameters[0].symbolType!);
            default: {
                if (this.genericParameters.length === 0) {
                    return new ClassType(this.type);
                }
                return new GenericClassType(this.type, this.genericParameters[0].symbolType!);
            }
        }
    }

    toString() {
        const pp = this.genericParameters.map(p => p.toString()).join(", ");
        const gp = pp ? `<${pp}>` : "";
        return `Type ${this.type}${gp}`;
    }
}
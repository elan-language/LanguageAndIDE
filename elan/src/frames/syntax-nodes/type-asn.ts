import { BooleanType } from "../../symbols/boolean-type";
import { ClassType } from "../../symbols/class-type";
import { DictionaryType } from "../../symbols/dictionary-type";
import { FloatType } from "../../symbols/number-type";
import { GenericClassType } from "../../symbols/generic-class-type";
import { IntType } from "../../symbols/int-type";
import { IterType } from "../../symbols/iter-type";
import { ListType } from "../../symbols/list-type";
import { StringType } from "../../symbols/string-type";
import { TupleType } from "../../symbols/tuple-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "../interfaces/ast-node";
import { CompileError } from "../compile-error";
import { ArrayType } from "../../symbols/array-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstIdNode } from "../interfaces/ast-id-node";


export class TypeAsn extends AbstractAstNode implements AstIdNode {

    constructor(public readonly id: string, public readonly genericParameters: AstNode[], public readonly fieldId: string, scope: Scope) {
        super();
    }

    is2d : boolean = false;

    aggregateCompileErrors(): CompileError[] {
        var cc: CompileError[] = [];
        for (const i of this.genericParameters) {
            cc = cc.concat(i.aggregateCompileErrors());
        }
        return this.compileErrors.concat(cc);
    }

    compile(): string {
        this.compileErrors = [];
        if (this.id === "Dictionary") {
            return "Object";
        }

        if (this.id === "List") {
            return "Array";
        }

        return this.id;
    }

    renderAsDefaultObjectCode(): string {
        switch (this.id) {
            case "Int":
            case "Float": return "0";
            case "String": return '""';
            case "Boolean": return "false";
            case "List": return "system.defaultList()";
            case "Array": return "system.defaultArray()";
            case "Dictionary": return "system.defaultDictionary()";
            case "Iter": return "system.defaultIter()";
        }
        return `${this.id}.defaultInstance()`;
    }


    symbolType() {
        switch (this.id) {
            case ("Int"): return IntType.Instance;
            case ("Float"): return FloatType.Instance;
            case ("Boolean"): return BooleanType.Instance;
            case ("String"): return StringType.Instance;
            case ("List"): return new ListType(this.genericParameters[0].symbolType());
            case ("Array"): return new ArrayType(this.genericParameters[0].symbolType(), this.is2d);
            case ("Dictionary"): return new DictionaryType(this.genericParameters[0].symbolType(), this.genericParameters[1].symbolType());
            case ("Tuple"): return new TupleType(this.genericParameters.map(p => p.symbolType()));
            case ("Iter"): return new IterType(this.genericParameters[0].symbolType());
            default: {
                if (this.genericParameters.length === 0) {
                    return new ClassType(this.id);
                }
                return new GenericClassType(this.id, this.genericParameters[0].symbolType());
            }
        }
    }

    toString() {
        const pp = this.genericParameters.map(p => p.toString()).join(", ");
        const gp = pp ? `<${pp}>` : "";
        return `Type ${this.id}${gp}`;
    }
}
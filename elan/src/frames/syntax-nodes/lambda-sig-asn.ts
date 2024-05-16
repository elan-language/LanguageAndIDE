import { ISymbol } from "../../symbols/symbol";
import { ISymbolType } from "../../symbols/symbol-type";
import { UnknownType } from "../../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { ParamDefAsn } from "./param-def-asn";
import { Transforms } from "./transforms";

export class LambdaSigAsn extends AbstractAstNode implements Scope, AstNode {

    constructor(private readonly parameters: ParamDefAsn[], public readonly fieldId: string, private readonly scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        var cc: CompileError[] = [];
        for (const i of this.parameters) {
            cc = cc.concat(i.aggregateCompileErrors());
        }
        return this.compileErrors.concat(cc);
    }

    symbolType() {
        return UnknownType.Instance;
    }

    compile(): string {
        throw new Error("Method not implemented.");
    }

    resolveSymbol(id: string | undefined, transforms: Transforms, scope: Scope): ISymbol {
        for (const p of this.parameters) {
            if (p.id.trim() === id) {
                return {
                    symbolId: id,
                    symbolType: () => p.symbolType()
                };
            }
        }
        return this.scope.resolveSymbol(id, transforms, this);
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");

        return `${pp}`;
    }
}
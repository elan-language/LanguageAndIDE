import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { thisKeyword } from "../keywords";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class ThisAsn extends AbstractAstNode implements AstNode {

    constructor(private originalKeyword : string,  public readonly fieldId: string, private readonly scope : Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors;
    }


    compile(): string {
        this.compileErrors = [];
        return thisKeyword;
    }

    get symbolType() {
        return this.scope.resolveSymbol(thisKeyword, this.scope)?.symbolType;
    }

    toString() {
        return this.originalKeyword;
    }
}
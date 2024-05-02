import { ArrayType } from "../../symbols/array-type";
import { ClassType } from "../../symbols/class-type";
import { DictionaryType } from "../../symbols/dictionary-type";
import { FunctionType } from "../../symbols/function-type";
import { GenericParameterType } from "../../symbols/generic-parameter-type";
import { IterType } from "../../symbols/iter-type";
import { ListType } from "../../symbols/list-type";
import { SymbolScope } from "../../symbols/symbol";
import { ISymbolType } from "../../symbols/symbol-type";
import { CompileError } from "../compile-error";
import { mustBeKnownSymbol, mustCallExtensionViaQualifier, mustMatchParameters } from "../compile-rules";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";
import { FixedIdAsn } from "./fixed-id-asn";
import { QualifierAsn } from "./qualifier-asn";

export class FuncCallAsn extends AbstractAstNode implements AstNode {

    constructor(public id: string, private readonly qualifier: AstNode | undefined, private readonly parameters: Array<AstNode>, public fieldId: string, private scope: Scope) {
        super();
        this.id = id.trim();
    }

    aggregateCompileErrors(): CompileError[] {
        var cc: CompileError[] = [];

        for (const i of this.parameters) {
            cc = cc.concat(i.aggregateCompileErrors());
        }

        if (this.qualifier) {
            cc.concat(this.qualifier.aggregateCompileErrors());
        }

        return this.compileErrors.concat(cc);
    }

    getGlobalScope(start : any) : Scope {
        if (start.constructor.name === "FileImpl"){
            return start;
        }
        return this.getGlobalScope(start.getParent());
    }

    compile(): string {
        this.compileErrors = [];
        var currentScope = this.scope;
        var scopeQ = "";
        var qualifier = this.qualifier as QualifierAsn | undefined;
        var parameters = [...this.parameters];

        const classScope = qualifier ? qualifier.symbolType : undefined;
        if (classScope instanceof ClassType) {
            const s = this.scope.resolveSymbol(classScope.className, this.scope);
            // replace scope with class scope
            currentScope = s as unknown as Scope;
        }
        else if (qualifier instanceof FixedIdAsn && qualifier.id === "") {
            // todo kludge
            currentScope = this.getGlobalScope(currentScope as Frame);
            qualifier = undefined;
        }

        const funcSymbol = currentScope.resolveSymbol(this.id, this.scope);

        mustBeKnownSymbol(funcSymbol!, this.compileErrors, this.fieldId);

        if (funcSymbol?.symbolScope === SymbolScope.stdlib) {
            scopeQ = `_stdlib.`;
        }
        if (funcSymbol?.symbolScope === SymbolScope.property) {
            scopeQ = `this.`;
        }

        if (funcSymbol?.symbolType instanceof FunctionType) {
            mustCallExtensionViaQualifier(funcSymbol.symbolType, qualifier, this.compileErrors, this.fieldId);

            if (funcSymbol.symbolType.isExtension && qualifier) {
                parameters = [qualifier.value].concat(parameters);
                qualifier = undefined;
            }

            mustMatchParameters(parameters, funcSymbol.symbolType.parametersTypes, this.compileErrors, this.fieldId);
        }

        const pp = parameters.map(p => p.compile()).join(", ");
        const q = qualifier ? `${qualifier.compile()}` : scopeQ;
        return `${q}${this.id}(${pp})`;
    }

    flatten(p: ISymbolType): ISymbolType[] {
        if (p instanceof ArrayType || p instanceof ListType || p instanceof IterType) {
            return this.flatten(p.ofType);
        }

        if (p instanceof DictionaryType) {
            return this.flatten(p.keyType).concat(this.flatten(p.valueType));
        }

        return [p];
    }

    get symbolType() {
        const type = this.scope.resolveSymbol(this.id, this.scope)?.symbolType;

        if (type instanceof FunctionType) {
            const returnType = type.returnType;

            if (returnType instanceof GenericParameterType) {
                const flattened = type.parametersTypes.map(n => this.flatten(n));
                const pTypes = this.parameters.map(p => this.flatten(p.symbolType!));

                for (var i = 0; i < flattened.length; i++) {
                    const pt = flattened[i];
                    const pst = pTypes[i];

                    for (var i = 0; i < pt.length; i++) {
                        const t = pt[i];
                        const st = pst[i];

                        if (t instanceof GenericParameterType && t.id === returnType.id) {
                            return st;
                        }
                    }
                }
                return undefined;
            }
            return returnType;
        }

        return type;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");
        const q = this.qualifier ? `${this.qualifier}` : "";
        return `Func Call ${q}${this.id} (${pp})`;
    }
}
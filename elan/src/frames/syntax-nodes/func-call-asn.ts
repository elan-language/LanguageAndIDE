import { ArrayType } from "../symbols/array-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { FunctionType } from "../symbols/function-type";
import { GenericParameterType } from "../symbols/generic-parameter-type";
import { IterType } from "../symbols/iter-type";
import { ListType } from "../symbols/list-type";
import { ISymbolType } from "../interfaces/symbol-type";
import { UnknownType } from "../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { mustBeKnownSymbol, mustBePureFunctionSymbol, mustCallExtensionViaQualifier, mustMatchParameters } from "../compile-rules";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { QualifierAsn } from "./qualifier-asn";
import { transforms } from "./ast-helpers";
import { scopePrefix, updateScopeAndQualifier } from "../symbols/symbol-helpers";

export class FuncCallAsn extends AbstractAstNode implements AstIdNode {

    constructor(public readonly id: string, private readonly qualifier: AstNode | undefined, private readonly parameters: Array<AstNode>, public readonly fieldId: string, private readonly scope: Scope) {
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

    compile(): string {
        this.compileErrors = [];

        var parameters = [...this.parameters];
        var [qualifier, currentScope] = updateScopeAndQualifier(this.qualifier as QualifierAsn | undefined, transforms(), this.scope);

        const funcSymbol = currentScope.resolveSymbol(this.id, transforms(), this.scope);
        const fst = funcSymbol.symbolType(transforms());

        mustBeKnownSymbol(funcSymbol, this.compileErrors, this.fieldId);
        mustBePureFunctionSymbol(fst, this.scope, this.compileErrors, this.fieldId);

        if (fst instanceof FunctionType) {
            mustCallExtensionViaQualifier(fst, qualifier, this.compileErrors, this.fieldId);

            if (fst.isExtension && qualifier) {
                parameters = [(qualifier as any).value].concat(parameters);
                qualifier = undefined;
            }

            mustMatchParameters(parameters, fst.parametersTypes, this.compileErrors, this.fieldId);
        }

        const pp = parameters.map(p => p.compile()).join(", ");
        const q = qualifier ? `${qualifier.compile()}` : scopePrefix(funcSymbol?.symbolScope);
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

    containsGenericType(type: ISymbolType): boolean {
        if (type instanceof GenericParameterType) {
            return true;
        }
        if (type instanceof ArrayType || type instanceof ListType || type instanceof IterType) {
            return this.containsGenericType(type.ofType);
        }
        if (type instanceof DictionaryType) {
            return this.containsGenericType(type.keyType) || this.containsGenericType(type.valueType);
        }

        return false;
    }

    generateType(type: ISymbolType, matches: Map<string, ISymbolType>): ISymbolType {
        if (type instanceof GenericParameterType) {
            return matches.get(type.id) ?? UnknownType.Instance;
        }
        if (type instanceof ArrayType) {
            return new ArrayType(this.generateType(type.ofType, matches), type.is2d);
        }
        if (type instanceof ListType) {
            return new ListType(this.generateType(type.ofType, matches));
        }
        if (type instanceof IterType) {
            return new IterType(this.generateType(type.ofType, matches));
        }
        if (type instanceof DictionaryType) {
            return new DictionaryType(this.generateType(type.keyType, matches), this.generateType(type.valueType, matches));
        }

        return UnknownType.Instance;
    }

    matchGenericTypes(type : FunctionType, parameters : AstNode[]) {
        const matches = new Map<string, ISymbolType>();

        const flattened = type.parametersTypes.map(n => this.flatten(n));
        var parameters = this.parameters;

        if (type.isExtension && this.qualifier) {
            parameters = [(this.qualifier as QualifierAsn).value as AstNode].concat(parameters);
        }

        const pTypes = parameters.map(p => this.flatten(p.symbolType()));

        for (var i = 0; i < flattened.length; i++) {
            const pt = flattened[i];
            const pst = pTypes[i];

            for (var i = 0; i < pt.length; i++) {
                const t = pt[i];
                const st = pst[i];

                if (t instanceof GenericParameterType) {
                    matches.set(t.id, st);
                }
            }
        }
        return matches;
    }


    symbolType() {
        const type = this.scope.resolveSymbol(this.id, transforms(), this.scope).symbolType(transforms());

        if (type instanceof FunctionType) {
            const returnType = type.returnType;

            if (this.containsGenericType(returnType)) {
                const matches = this.matchGenericTypes(type, this.parameters);
                return this.generateType(returnType, matches);
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
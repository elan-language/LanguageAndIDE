import { ArrayType } from "../../symbols/array-type";
import { ClassDefinitionType } from "../../symbols/class-definition-type";
import { ClassType } from "../../symbols/class-type";
import { FunctionType } from "../../symbols/function-type";
import { ListType } from "../../symbols/list-type";
import { SymbolScope } from "../../symbols/symbol";
import { ISymbolType } from "../../symbols/symbol-type";
import { CompileError } from "../compile-error";
import { mustBeIndexableSymbol, mustBePublicProperty } from "../compile-rules";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { AstNode } from "./ast-node";
import { AstIdNode } from "./ast-id-node";
import { IndexAsn } from "./index-asn";
import { QualifierAsn } from "./qualifier-asn";
import { RangeAsn } from "./range-asn";
import { ThisAsn } from "./this-asn";
import { getClassScope } from "../../symbols/symbolHelpers";

export class VarAsn extends AbstractAstNode implements AstIdNode {

    constructor(public readonly id: string, public readonly qualifier: AstNode | undefined, private readonly index: AstNode | undefined, public readonly fieldId: string, private scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        const q = this.qualifier ? this.qualifier.aggregateCompileErrors() : [];
        const i = this.index ? this.index.aggregateCompileErrors() : [];

        return this.compileErrors
            .concat(q)
            .concat(i);
    }

    private isRange() {
        return this.index instanceof IndexAsn && this.index.index1 instanceof RangeAsn;
    }

    private isIndex() {
        return this.index instanceof IndexAsn && !(this.index.index1 instanceof RangeAsn);
    }

    private getQualifier() {
        if (this.qualifier) {
            return `${this.qualifier.compile()}`;
        }
        const s = this.scope.resolveSymbol(this.id, transforms(), this.scope);

        if (s && s.symbolScope === SymbolScope.property) {
            return "this.";
        }

        return "";
    }

    wrapListOrArray(rootType: ISymbolType, code: string): string {
        if (rootType instanceof ListType) {
            return `system.list(${code})`;
        }
        if (rootType instanceof ArrayType) {
            return `system.wrapArray(${code})`;
        }
        if (rootType instanceof FunctionType) {
            return this.wrapListOrArray(rootType.returnType, code);
        }
        return code;
    }

    compile(): string {
        this.compileErrors = [];
        var q = this.getQualifier();

        const classScope = this.qualifier ? this.qualifier.symbolType() : undefined;
        if (classScope instanceof ClassType) {
            const s = this.scope.resolveSymbol(classScope.className, transforms(), this.scope) as unknown as Scope;
            const p = s.resolveSymbol(this.id, transforms(), s);

            mustBePublicProperty(p, this.compileErrors, this.fieldId);
        }

        var idx = this.index ? this.index.compile() : "";
        var code = `${q}${this.id}${idx}`;

        if (this.isRange() || this.index) {
            const rootType = this.scope.resolveSymbol(this.id, transforms(), this.scope).symbolType(transforms());
            if (this.index) {
                mustBeIndexableSymbol(rootType, (this.index as IndexAsn).isDoubleIndex(), this.compileErrors, this.fieldId);
            }
            if (this.isRange()) {
                code = this.wrapListOrArray(rootType, code);
            }
        }

        return code;
    }

    updateScope(currentScope: Scope) {
        const classScope = this.qualifier ? this.qualifier.symbolType() : undefined;
        if (classScope instanceof ClassType) {
            const s = this.scope.resolveSymbol(classScope.className, transforms(), this.scope);
            // replace scope with class scope
            currentScope = s as unknown as Scope;
        }
        else if (classScope instanceof ClassDefinitionType) {
            currentScope = classScope as unknown as Scope;
        }
        else if (this.qualifier instanceof QualifierAsn && this.qualifier?.value instanceof ThisAsn) {
            // todo kludge
            currentScope = getClassScope(currentScope as Frame);
        }

        return currentScope;
    }


    get rootSymbolType() {
        const currentScope = this.updateScope(this.scope);
        const rootType = currentScope.resolveSymbol(this.id, transforms(), currentScope).symbolType(transforms());
        return rootType;
    }

    symbolType() {
        const rootType = this.rootSymbolType;
        if (this.isIndex() && (rootType instanceof ListType || rootType instanceof ArrayType)) {
            return rootType.ofType;
        }
        return rootType;
    }

    get symbolScope() {
        const currentScope = this.updateScope(this.scope);
        const symbol = currentScope.resolveSymbol(this.id, transforms(), currentScope);
        return symbol.symbolScope;
    }

    toString() {
        const q = this.qualifier ? `${this.qualifier}` : "";
        const idx = this.index ? `${this.index}` : "";
        return `${q}${this.id}${idx}`;
    }
}
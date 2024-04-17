import { ArrayType } from "../../symbols/array-type";
import { ListType } from "../../symbols/list-type";
import { SymbolScope } from "../../symbols/symbol";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { IndexAsn } from "./index-asn";
import { RangeAsn } from "./range-asn";

export class VarAsn implements AstNode {

    constructor(private id: string, private qualifier: AstNode | undefined, private index: AstNode | undefined, private scope : Scope) {
        this.id = id.trim();
    }

    private isRange() {
        return this.index instanceof IndexAsn && this.index.index instanceof RangeAsn;
    }

    private isIndex() {
        return this.index instanceof IndexAsn && !(this.index.index instanceof RangeAsn);
    }

    private getQualifier() {
        if (this.qualifier) {
            return `${this.qualifier.renderAsObjectCode()}.`;
        }
        const s = this.scope.resolveSymbol(this.id, this.scope);
      
        if (s && s.symbolScope === SymbolScope.property) {
            return "this.";
        }

        return "";
    }



    renderAsObjectCode(): string {
        var q = this.getQualifier();
        var idx = this.index ? this.index.renderAsObjectCode() : ""; 
        const code = `${q}${this.id}${idx}`;

        if (this.isRange()) {
            const rootType = this.scope.resolveSymbol(this.id, this.scope).symbolType;
            if (rootType instanceof ListType) {
                return `system.list(${code})`;
            }
            if (rootType instanceof ArrayType) {
                return `system.array(${code})`;
            }
        }

        return code;
    }

    get symbolType() {
        const rootType = this.scope.resolveSymbol(this.id, this.scope).symbolType;
        if (this.isIndex() && rootType instanceof ListType) {
            return rootType.ofType;
        }
        return this.scope.resolveSymbol(this.id, this.scope).symbolType;
    }

    toString() {
        const q = this.qualifier ? `${this.qualifier}.` : "";
        const idx = this.index ? `${this.index}` : "";
        return `${q}${this.id}${idx}`;
    }
}
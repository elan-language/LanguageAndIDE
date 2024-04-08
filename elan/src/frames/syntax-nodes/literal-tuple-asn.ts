import { TupleType } from "../../symbols/tuple-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class LiteralTupleAsn implements AstNode {

    constructor(private readonly items: AstNode[], scope : Scope) {
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return new TupleType(this.items.map(i => i.symbolType!));
    }

    toString() {
        const it = this.items.map(p => p.toString()).join(", ");
        return `(${it})`;
    }
}
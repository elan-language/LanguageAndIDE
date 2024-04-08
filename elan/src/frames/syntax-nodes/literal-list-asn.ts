import { ListType } from "../../symbols/list-type";
import { Scope } from "../interfaces/scope";
import { Field } from "../interfaces/field";
import { AstNode } from "./ast-node";

export class LiteralListAsn {
    
    constructor(private readonly items: AstNode[], scope : Scope) {
    }

    get symbolType() {
        return new ListType(this.items[0].symbolType!);
    }

    toString() {
        const it = this.items.map(p => p.toString()).join(", ");
        return `[${it}]`;
    }
}
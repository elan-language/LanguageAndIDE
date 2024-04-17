import { AstNode } from "./ast-node";

export class FixedIdAsn implements AstNode {

    constructor(private id: string,) {
    }
    renderAsObjectCode(): string {
        return this.id;
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return this.id;
    }
}
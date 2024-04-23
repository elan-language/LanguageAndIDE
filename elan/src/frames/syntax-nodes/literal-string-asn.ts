import { StringType } from "../../symbols/string-type";
import { AstNode } from "./ast-node";

export class LiteralStringAsn implements AstNode {
    
    constructor(private value: string) {
        
    }

    compile(): string {
        return `${this.value}`;
    }

    get symbolType() {
        return StringType.Instance;
    }

    toString() {
        return this.value;
    }
}
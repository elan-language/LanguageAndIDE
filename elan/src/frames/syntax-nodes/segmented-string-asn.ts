import { StringType } from "../../symbols/string-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class SegmentedStringAsn implements AstNode {
    
    constructor(private segments : AstNode[], scope : Scope) {
       
    }
    
    compile(): string {
        return  `\`${this.segments.map(s => s.compile()).join("")}\``; 
    }

    get symbolType() {
        return StringType.Instance;
    }

    toString() {
        return this.segments.map(s => `${s}`).join("");
    }
}
import { ISymbolType } from "../symbols/symbol-type";
import { CompileError } from "./compile-error";
import { AstNode } from "./syntax-nodes/ast-node";

export function mustBeOfType(expr : AstNode | undefined, ofType : ISymbolType, compileErrors : CompileError[]){
    if (expr?.symbolType !== ofType){
        compileErrors.push(new CompileError(`Expression must be ${ofType.name}`));
    }
   
}
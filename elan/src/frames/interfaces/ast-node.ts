import { ISymbolType } from "./symbol-type";
import { CompileError } from "../compile-error";
import { SymbolScope } from "../symbols/symbol-scope";

export interface AstNode {
    symbolType():  ISymbolType;

    symbolScope: SymbolScope;

    compile(): string;

    compileErrors: CompileError[];

    aggregateCompileErrors(): CompileError[];

    fieldId: string;
}
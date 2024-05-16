import { SymbolType } from "./symbol-type";
import { CompileError } from "../compile-error";
import { SymbolScope } from "../symbols/symbol-scope";

export interface AstNode {
    symbolType():  SymbolType;

    symbolScope: SymbolScope;

    compile(): string;

    compileErrors: CompileError[];

    aggregateCompileErrors(): CompileError[];

    fieldId: string;
}
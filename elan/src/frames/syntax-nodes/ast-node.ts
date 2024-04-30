import { ISymbolType } from "../../symbols/symbol-type";
import { CompileError } from "../compile-error";

export interface AstNode {
    symbolType: ISymbolType | undefined;

    compile(): string;

    compileErrors: CompileError[];

    aggregateCompileErrors(): CompileError[];

    fieldId: string;
}
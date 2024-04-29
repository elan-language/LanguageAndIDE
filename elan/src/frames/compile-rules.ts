import { ArrayType } from "../symbols/array-type";
import { BooleanType } from "../symbols/boolean-type";
import { ClassType } from "../symbols/class-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { IntType } from "../symbols/int-type";
import { IterType } from "../symbols/iter-type";
import { ListType } from "../symbols/list-type";
import { NumberType } from "../symbols/number-type";
import { StringType } from "../symbols/string-type";
import { ISymbolType } from "../symbols/symbol-type";
import { TupleType } from "../symbols/tuple-type";
import { UnknownType } from "../symbols/unknown-type";
import { CompileError } from "./compile-error";
import { AstNode } from "./syntax-nodes/ast-node";

export function mustBeOfType(expr: AstNode | undefined, ofType: ISymbolType, compileErrors: CompileError[]) {
    if (expr?.symbolType !== ofType) {
        compileErrors.push(new CompileError(`Expression must be ${ofType.name}`));
    }
}

function FailIncompatible(lhs: AstNode, rhs: AstNode, compileErrors: CompileError[]) {
    compileErrors.push(new CompileError(`Cannot assign ${rhs.symbolType!.name} to ${lhs.symbolType!.name} `));
}

function FailUnknown(lhs: AstNode, compileErrors: CompileError[]) {
    compileErrors.push(new CompileError(`Undeclared variable ${lhs}`));
}

export function mustBeCompatibleType(lhs: AstNode, rhs: AstNode, compileErrors: CompileError[]) {
    if (lhs.symbolType instanceof UnknownType || lhs.symbolType === undefined) {
        FailUnknown(lhs, compileErrors);
        return;
    }

    if (rhs.symbolType instanceof UnknownType || rhs.symbolType === undefined) {
        FailUnknown(rhs, compileErrors);
        return;
    }

    if (lhs.symbolType instanceof BooleanType && !(rhs.symbolType instanceof BooleanType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs.symbolType instanceof StringType && !(rhs.symbolType instanceof StringType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs.symbolType instanceof IntType && !(rhs.symbolType instanceof IntType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs.symbolType instanceof NumberType && !(rhs.symbolType instanceof IntType || rhs.symbolType instanceof NumberType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs.symbolType instanceof ListType && lhs.symbolType.name !== rhs.symbolType.name) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs.symbolType instanceof ArrayType && lhs.symbolType.name !== rhs?.symbolType.name) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs.symbolType instanceof DictionaryType && lhs.symbolType.name !== rhs.symbolType.name) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs.symbolType instanceof TupleType && lhs.symbolType.name !== rhs?.symbolType?.name) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs.symbolType instanceof IterType && !(rhs.symbolType instanceof ListType || rhs.symbolType instanceof ArrayType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs.symbolType instanceof IterType && (rhs?.symbolType instanceof ListType || rhs.symbolType instanceof ArrayType)) {
        if (lhs.symbolType.ofType.name !== rhs.symbolType.ofType.name) {
            FailIncompatible(lhs, rhs, compileErrors);
            return;
        }
    }

    if (lhs.symbolType instanceof ClassType && !(rhs.symbolType instanceof ClassType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }

    if (lhs.symbolType instanceof ClassType && rhs.symbolType instanceof ClassType) {
        if (lhs.symbolType.className !== rhs.symbolType.className){
            // TODO inheritance
            FailIncompatible(lhs, rhs, compileErrors);
            return;
        }
    }

}


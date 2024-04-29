import { ArrayType } from "../symbols/array-type";
import { BooleanType } from "../symbols/boolean-type";
import { ClassType } from "../symbols/class-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { FunctionType } from "../symbols/function-type";
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

export function mustCallExtensionViaQualifier(ft: FunctionType, qualifier: AstNode | undefined, compileErrors: CompileError[]) {
    if (ft.isExtension && qualifier === undefined) {
        compileErrors.push(new CompileError(`Cannot call extension method directly`));
    }
}

export function mustMatchParameters(parms: AstNode[], ofType: ISymbolType[], compileErrors: CompileError[]) {
   const maxLen = parms.length > ofType.length ? parms.length : ofType.length;

    for(var i = 0; i < maxLen; i++){
        const p = parms[i];
        const t = ofType[i];

        if (p === undefined){
            compileErrors.push(new CompileError(`Missing parameter ${i}`));
        }
        else if (t === undefined){
            compileErrors.push(new CompileError(`Too many parameters ${i}`));
        }
        else {
            mustBeCompatibleType(t, p.symbolType!, compileErrors);
        }
    }
}


function FailIncompatible(lhs: ISymbolType, rhs: ISymbolType, compileErrors: CompileError[]) {
    compileErrors.push(new CompileError(`Cannot assign ${rhs.name} to ${lhs.name} `));
}

function FailUnknown(lhs: AstNode, compileErrors: CompileError[]) {
    compileErrors.push(new CompileError(`Undeclared variable ${lhs}`));
}

export function mustBeCompatibleType(lhs: ISymbolType, rhs: ISymbolType, compileErrors: CompileError[]) {
    if (lhs instanceof BooleanType && !(rhs instanceof BooleanType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs instanceof StringType && !(rhs instanceof StringType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs instanceof IntType && !(rhs instanceof IntType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs instanceof NumberType && !(rhs instanceof IntType || rhs instanceof NumberType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs instanceof ListType && lhs.name !== rhs.name) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs instanceof ArrayType && lhs.name !== rhs.name) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs instanceof DictionaryType && lhs.name !== rhs.name) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs instanceof TupleType && lhs.name !== rhs?.name) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs instanceof IterType && !(rhs instanceof ListType || rhs instanceof ArrayType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }
    if (lhs instanceof IterType && (rhs instanceof ListType || rhs instanceof ArrayType)) {
        if (lhs.ofType.name !== rhs.ofType.name) {
            FailIncompatible(lhs, rhs, compileErrors);
            return;
        }
    }

    if (lhs instanceof ClassType && !(rhs instanceof ClassType)) {
        FailIncompatible(lhs, rhs, compileErrors);
        return;
    }

    if (lhs instanceof ClassType && rhs instanceof ClassType) {
        if (lhs.className !== rhs.className){
            // TODO inheritance
            FailIncompatible(lhs, rhs, compileErrors);
            return;
        }
    }

}

export function mustBeCompatibleNode(lhs: AstNode, rhs: AstNode, compileErrors: CompileError[]) {
    if (lhs.symbolType instanceof UnknownType || lhs.symbolType === undefined) {
        FailUnknown(lhs, compileErrors);
        return;
    }

    if (rhs.symbolType instanceof UnknownType || rhs.symbolType === undefined) {
        FailUnknown(rhs, compileErrors);
        return;
    }

    mustBeCompatibleType(lhs.symbolType, rhs.symbolType, compileErrors);
}


import { ArrayType } from "../symbols/array-type";
import { BooleanType } from "../symbols/boolean-type";
import { ClassDefinitionType } from "../symbols/class-definition-type";
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

export function mustBeOfSymbolType(exprType: ISymbolType | undefined, ofType: ISymbolType, compileErrors: CompileError[], location: string) {
    if (exprType?.name !== ofType.name) {
        compileErrors.push(new CompileError(`Expression must be ${ofType.name}`, location));
    }
}

export function mustBeOfType(expr: AstNode | undefined, ofType: ISymbolType, compileErrors: CompileError[], location: string) {
    mustBeOfSymbolType(expr?.symbolType, ofType, compileErrors, location);
}

export function mustBeAbstractClass(classType: ClassDefinitionType, compileErrors: CompileError[], location: string) {
    if (!classType.isAbstract) {
        compileErrors.push(new CompileError(`Superclass ${classType.name} must be abstract`, location));
    }
}

export function mustImplementSuperClasses(classType: ClassDefinitionType, superClassTypes: ClassDefinitionType[],  compileErrors: CompileError[], location: string) {
    
    for (const superClassType of superClassTypes) {
        const superSymbols = superClassType.childSymbols();

        for (const superSymbol of superSymbols){
            const subSymbol = classType.resolveSymbol(superSymbol.symbolId, classType);

            if (subSymbol) {
                mustBeOfSymbolType(subSymbol.symbolType, superSymbol.symbolType!, compileErrors, location);
            }
            else {
                compileErrors.push(new CompileError(`${classType.name} must implement ${superClassType.name}.${superSymbol.symbolId}`, location));
            }
        }
    }
}


export function mustBeConcreteClass(classType: ClassDefinitionType, compileErrors: CompileError[], location: string) {
    if (classType.isAbstract) {
        compileErrors.push(new CompileError(`${classType.name} must be concrete to new`, location));
    }
}

export function mustCallExtensionViaQualifier(ft: FunctionType, qualifier: AstNode | undefined, compileErrors: CompileError[], location: string) {
    if (ft.isExtension && qualifier === undefined) {
        compileErrors.push(new CompileError(`Cannot call extension method directly`, location));
    }
}

export function mustMatchParameters(parms: AstNode[], ofType: ISymbolType[], compileErrors: CompileError[], location: string) {
    const maxLen = parms.length > ofType.length ? parms.length : ofType.length;

    for (var i = 0; i < maxLen; i++) {
        const p = parms[i];
        const t = ofType[i];

        if (p === undefined) {
            compileErrors.push(new CompileError(`Missing parameter ${i}`, location));
        }
        else if (t === undefined) {
            compileErrors.push(new CompileError(`Too many parameters ${i}`, location));
        }
        else {
            mustBeCompatibleType(t, p.symbolType!, compileErrors, location);
        }
    }
}


function FailIncompatible(lhs: ISymbolType, rhs: ISymbolType, compileErrors: CompileError[], location: string) {
    compileErrors.push(new CompileError(`Cannot assign ${rhs.name} to ${lhs.name} `, location));
}

function FailUnknown(lhs: AstNode, compileErrors: CompileError[], location: string) {
    compileErrors.push(new CompileError(`Undeclared variable ${lhs}`, location));
}

export function mustBeCompatibleType(lhs: ISymbolType, rhs: ISymbolType, compileErrors: CompileError[], location: string) {
    if (lhs instanceof BooleanType && !(rhs instanceof BooleanType)) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }
    if (lhs instanceof StringType && !(rhs instanceof StringType)) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }
    if (lhs instanceof IntType && !(rhs instanceof IntType)) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }
    if (lhs instanceof NumberType && !(rhs instanceof IntType || rhs instanceof NumberType)) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }
    if (lhs instanceof ListType && lhs.name !== rhs.name) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }
    if (lhs instanceof ArrayType && lhs.name !== rhs.name) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }
    if (lhs instanceof DictionaryType && lhs.name !== rhs.name) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }
    if (lhs instanceof TupleType && lhs.name !== rhs?.name) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }
    if (lhs instanceof IterType && !(rhs instanceof ListType || rhs instanceof ArrayType)) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }
    if (lhs instanceof IterType && (rhs instanceof ListType || rhs instanceof ArrayType)) {
        if (lhs.ofType.name !== rhs.ofType.name) {
            FailIncompatible(lhs, rhs, compileErrors, location);
            return;
        }
    }

    if (lhs instanceof ClassType && !(rhs instanceof ClassType)) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }

    if (lhs instanceof ClassType && rhs instanceof ClassType) {
        if (lhs.className !== rhs.className) {
            // TODO inheritance
            FailIncompatible(lhs, rhs, compileErrors, location);
            return;
        }
    }

}

export function mustBeCompatibleNode(lhs: AstNode, rhs: AstNode, compileErrors: CompileError[], location: string) {
    if (lhs.symbolType instanceof UnknownType || lhs.symbolType === undefined) {
        FailUnknown(lhs, compileErrors, location);
        return;
    }

    if (rhs.symbolType instanceof UnknownType || rhs.symbolType === undefined) {
        FailUnknown(rhs, compileErrors, location);
        return;
    }

    mustBeCompatibleType(lhs.symbolType, rhs.symbolType, compileErrors, location);
}
import { ArrayType } from "../symbols/array-type";
import { BooleanType } from "../symbols/boolean-type";
import { ClassDefinitionType } from "../symbols/class-definition-type";
import { ClassType } from "../symbols/class-type";
import { DictionaryType } from "../symbols/dictionary-type";
import { FunctionType } from "../symbols/function-type";
import { GenericParameterType } from "../symbols/generic-parameter-type";
import { IntType } from "../symbols/int-type";
import { IterType } from "../symbols/iter-type";
import { ListType } from "../symbols/list-type";
import { NumberType } from "../symbols/number-type";
import { StringType } from "../symbols/string-type";
import { ISymbol, SymbolScope } from "../symbols/symbol";
import { ISymbolType } from "../symbols/symbol-type";
import { TupleType } from "../symbols/tuple-type";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { UnknownType } from "../symbols/unknown-type";
import { CompileError } from "./compile-error";
import { Parent } from "./interfaces/parent";
import { AstNode } from "./syntax-nodes/ast-node";
import { VarAsn } from "./syntax-nodes/var-asn";

export function mustBeOfSymbolType(exprType: ISymbolType | undefined, ofType: ISymbolType, compileErrors: CompileError[], location: string) {

    const unknown = exprType?.name === undefined || ofType.name === undefined;
    if (exprType?.name !== ofType.name) {
        compileErrors.push(new CompileError(`Expression must be ${ofType.name}`, location, unknown));
    }
}

export function mustBeOfType(expr: AstNode | undefined, ofType: ISymbolType, compileErrors: CompileError[], location: string) {
    mustBeOfSymbolType(expr?.symbolType, ofType, compileErrors, location);
}

export function mustBeKnownSymbol(symbol: ISymbol, compileErrors: CompileError[], location: string) {
    if (symbol instanceof UnknownSymbol) {
        compileErrors.push(new CompileError(`Undeclared id`, location, true));
    }
}

export function mustBeAbstractClass(classType: ClassDefinitionType, compileErrors: CompileError[], location: string) {
    if (!classType.isAbstract) {
        compileErrors.push(new CompileError(`Superclass ${classType.name} must be abstract`, location, false));
    }
}

export function mustImplementSuperClasses(classType: ClassDefinitionType, superClassTypes: ClassDefinitionType[], compileErrors: CompileError[], location: string) {

    for (const superClassType of superClassTypes) {
        const superSymbols = superClassType.childSymbols();

        for (const superSymbol of superSymbols) {
            const subSymbol = classType.resolveSymbol(superSymbol.symbolId, classType);

            if (subSymbol) {
                mustBeOfSymbolType(subSymbol.symbolType, superSymbol.symbolType!, compileErrors, location);
            }
            else {
                compileErrors.push(new CompileError(`${classType.name} must implement ${superClassType.name}.${superSymbol.symbolId}`, location, false));
            }
        }
    }
}


export function mustBeConcreteClass(classType: ClassDefinitionType, compileErrors: CompileError[], location: string) {
    if (classType.isAbstract) {
        compileErrors.push(new CompileError(`${classType.name} must be concrete to new`, location, false));
    }
}

export function mustCallExtensionViaQualifier(ft: FunctionType, qualifier: AstNode | undefined, compileErrors: CompileError[], location: string) {
    if (ft.isExtension && qualifier === undefined) {
        compileErrors.push(new CompileError(`Cannot call extension method directly`, location, false));
    }
}

export function mustMatchParameters(parms: AstNode[], ofType: ISymbolType[], compileErrors: CompileError[], location: string) {
    const maxLen = parms.length > ofType.length ? parms.length : ofType.length;

    for (var i = 0; i < maxLen; i++) {
        const p = parms[i];
        const t = ofType[i];

        if (p === undefined) {
            compileErrors.push(new CompileError(`Missing parameter ${i}`, location, false));
        }
        else if (t === undefined) {
            compileErrors.push(new CompileError(`Too many parameters ${i}`, location, false));
        }
        else {
            mustBeCompatibleType(t, p.symbolType!, compileErrors, location);
        }
    }
}


function FailIncompatible(lhs: ISymbolType, rhs: ISymbolType, compileErrors: CompileError[], location: string) {
    const unknown = lhs === UnknownType.Instance || rhs === UnknownType.Instance;
    compileErrors.push(new CompileError(`Cannot assign ${rhs.name} to ${lhs.name} `, location, unknown));
}

function FailUnknown(lhs: AstNode, compileErrors: CompileError[], location: string) {
    compileErrors.push(new CompileError(`Undeclared variable ${lhs}`, location, true));
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
    if (lhs instanceof ListType && !(lhs.name === rhs.name || lhs.name === new IterType((lhs as ListType).ofType).name)) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }
    if (lhs instanceof ArrayType && !(lhs.name === rhs.name || lhs.name === new IterType((lhs as ArrayType).ofType).name)) {
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
    if (lhs instanceof IterType && !(rhs instanceof ListType || rhs instanceof ArrayType || rhs instanceof StringType || rhs instanceof IterType)) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }

    if (lhs instanceof IterType && (rhs instanceof ListType || rhs instanceof ArrayType || rhs instanceof IterType)) {
        if (!(lhs.ofType instanceof GenericParameterType || lhs.ofType.name === rhs.ofType.name)) {
            FailIncompatible(lhs, rhs, compileErrors, location);
            return;
        }
    }

    if (lhs instanceof IterType && (rhs instanceof StringType)) {
        if (!(lhs.ofType instanceof StringType)) {
            FailIncompatible(lhs, rhs, compileErrors, location);
            return;
        }
    }

    if (lhs instanceof ClassType && !(rhs instanceof ClassType || rhs instanceof ClassDefinitionType)) {
        FailIncompatible(lhs, rhs, compileErrors, location);
        return;
    }

    if (lhs instanceof ClassType && (rhs instanceof ClassType || rhs instanceof ClassDefinitionType)) {
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

export function mustNotBePropertyOnFunctionMethod(assignable: VarAsn, parent: Parent, compileErrors: CompileError[], location: string) {
    if (parent.constructor.name === "FunctionMethod") {
        const s = assignable.symbolScope;

        if (s !== SymbolScope.local){
            compileErrors.push(new CompileError(`may not mutate non local data in function `, location, false));
        }
    }
}

export function mustNotBeParameter(assignable: VarAsn, compileErrors: CompileError[], location: string) {
    const s = assignable.symbolScope;

    if (s === SymbolScope.parameter) {
        compileErrors.push(new CompileError(`may not mutate parameter`, location, false));
    }
}
import { FrameWithStatements } from "../frames/frame-with-statements";
import { isFrame } from "../frames/helpers";
import { Field } from "../frames/interfaces/field";
import { Frame } from "../frames/interfaces/frame";
import { BooleanType } from "./boolean-type";
import { FloatType } from "./float-type";
import { IHasSymbolType } from "./has-symbol-type";
import { IHasSymbolTypes } from "./has-symbol-types";
import { ISymbol } from "./symbol";
import { IntType } from "./int-type";
import { UnknownType } from "./unknown-type";
import { ParseNode } from "../frames/parse-nodes/parse-node";
import { ISymbolType } from "./symbol-type";

export function isSymbol(s?: any): s is ISymbol {
    return !!s && 'symbolId' in s && 'symbolType' in s;
}

export function isHasSymbolType(s?: any): s is IHasSymbolType {
    return !!s && 'symbolType' in s;
}

export function isHasSymbolTypes(s?: any): s is IHasSymbolTypes {
    return !!s && 'symbolTypes' in s;
}

export function mapSymbolTypes(elements: ParseNode[]) {
    var sts = new Array<ISymbolType>();

    for (const e of elements) {
        if (isHasSymbolType(e)) {
            const st = e.symbolType;
            if (st) {
                sts.push(st);
            }
        }
        if (isHasSymbolTypes(e)) {
            const ss = e.symbolTypes.filter(st => st) as Array<ISymbolType>;
            sts = sts.concat(ss);
        }
    }
    return sts;
}

export function rawSymbolToType(s: string) {
    switch (s) {
        case ">":
        case "<":
        case "<=":
        case ">=":
        case "is":
        case "is not":
        case "and":
        case "or":
        case "xor":
            return BooleanType.Instance;
        case "div":
        case "mod":
            return IntType.Instance;
        case "/":
            return FloatType.Instance;
        case ",":
                return undefined;
        default:
            return UnknownType.Instance;
    }
}
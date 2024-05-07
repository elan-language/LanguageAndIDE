import { BooleanType } from "./boolean-type";
import { FloatType } from "./number-type";
import { ISymbol } from "./symbol";
import { IntType } from "./int-type";
import { UnknownType } from "./unknown-type";

export function isSymbol(s?: any): s is ISymbol {
    return !!s && 'symbolId' in s && 'symbolType' in s;
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
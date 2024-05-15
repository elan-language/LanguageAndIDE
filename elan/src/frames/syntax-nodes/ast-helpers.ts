import { transform, transformMany } from "./ast-visitor";
import { Transforms } from "./transforms";

export function InFunctionScope(start: any): boolean {
    if (start.constructor.name === "GlobalFunction") {
        return true;
    }
    if (start.constructor.name === "FileImpl") {
        return false;
    }
    if ('getParent' in start) {
        return InFunctionScope(start.getParent());
    }
    return false;
}

export function transforms() : Transforms {
    return {
        transform : transform,
        transformMany : transformMany
    };
}

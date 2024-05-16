import { FileImpl } from "../file-impl";
import { GlobalFunction } from "../globals/global-function";
import { transform, transformMany } from "./ast-visitor";
import { Transforms } from "./transforms";

export function InFunctionScope(start: any): boolean {
    if (start instanceof  GlobalFunction) {
        return true;
    }

    if (start instanceof FileImpl) {
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

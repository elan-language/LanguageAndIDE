import { FileImpl } from "../file-impl";
import { FunctionFrame } from "../globals/function-frame";
import { isFrame } from "../helpers";
import { Scope } from "../interfaces/scope";
import { transform, transformMany } from "./ast-visitor";
import { Transforms } from "./transforms";

export function InFunctionScope(start: Scope): boolean {
  if (start instanceof FunctionFrame) {
    return true;
  }

  if (start instanceof FileImpl) {
    return false;
  }

  if (isFrame(start)) {
    return InFunctionScope(start.getParent());
  }

  return false;
}

export function transforms(): Transforms {
  return {
    transform: transform,
    transformMany: transformMany,
  };
}

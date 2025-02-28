import { Class } from "../interfaces/class";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { NullScope } from "./null-scope";
import { isSymbol, symbolMatches } from "./symbol-helpers";
import { SymbolScope } from "./symbol-scope";

export enum ClassSubType {
  concrete,
  abstract,
  interface,
}

export class ClassType implements SymbolType, Scope {
  constructor(
    public readonly className: string,
    public readonly subType: ClassSubType,
    public readonly isNotInheritable: boolean,
    public readonly isImmutable: boolean,
    public readonly inheritsFrom: SymbolType[],
    public scope: Class | NullScope,
  ) {}

  updateScope(scope: Class) {
    this.scope = scope;
  }

  symbolMatches(id: string, all: boolean): ElanSymbol[] {
    const symbols = this.scope!.getChildren().filter((f) => isSymbol(f)) as ElanSymbol[];

    return symbolMatches(id, all, symbols);
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof ClassType) {
      if (otherType.className === this.className) {
        return true;
      }
      return otherType.inheritsFrom.some((c) => this.isAssignableFrom(c));
    }
    return false;
  }

  getParentScope(): Scope {
    return this.scope!;
  }

  childSymbols(): ElanSymbol[] {
    return this.scope!.getChildren().filter((c) => isSymbol(c));
  }

  resolveSymbol(id: string, transforms: Transforms, scope: Scope): ElanSymbol {
    return this.scope.resolveSymbol(id, transforms, scope);
  }

  get name() {
    return `${this.className.trim()}`;
  }

  toString(): string {
    return `${this.className.trim()}`;
  }

  get initialValue() {
    const isStdLib = this.scope.symbolScope === SymbolScope.stdlib;
    const prefix = isStdLib ? "system.initialise(_stdlib." : "";
    const postfix = isStdLib ? ")" : "";
    return `${prefix}${this.className}.emptyInstance()${postfix}`;
  }
}

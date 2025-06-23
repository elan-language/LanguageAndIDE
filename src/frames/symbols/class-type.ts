import { Class } from "../compiler-interfaces/class";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { GenericSymbolType } from "../compiler-interfaces/generic-symbol-type";
import { ReifyableSymbolType } from "../compiler-interfaces/reifyable-symbol-type";
import { Scope } from "../compiler-interfaces/scope";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { TypeOptions } from "../frame-interfaces/type-options";
import { FloatType } from "./float-type";
import { IntType } from "./int-type";
import { NullScope } from "./null-scope";
import { isClassTypeDef, isSymbol, symbolMatches } from "./symbol-helpers";
import { SymbolScope } from "./symbol-scope";

export enum ClassSubType {
  concrete,
  abstract,
  interface,
}

export class ClassType implements ReifyableSymbolType, Scope, GenericSymbolType {
  constructor(
    public className: string,
    public subType: ClassSubType,
    public isNotInheritable: boolean,
    public typeOptions: TypeOptions,
    public inheritsFrom: SymbolType[],
    public scope: Class | NullScope,
  ) {}

  get ofTypes() {
    return isClassTypeDef(this.scope) ? this.scope.ofTypes : [];
  }

  get deprecated() {
    return isClassTypeDef(this.scope) ? this.scope.deprecated : undefined;
  }

  reify(gts: SymbolType[]): ReifyableSymbolType {
    if (isClassTypeDef(this.scope)) {
      const cls = this.scope.updateOfTypes(gts);

      return new ClassType(
        this.className,
        this.subType,
        this.isNotInheritable,
        this.typeOptions,
        this.inheritsFrom,
        cls,
      );
    }

    return this;
  }

  updateFrom(other: ClassType): ClassType {
    this.className = other.className;
    this.isNotInheritable = other.isNotInheritable;
    this.typeOptions = other.typeOptions;
    this.inheritsFrom = other.inheritsFrom;
    this.scope = other.scope;
    return this;
  }

  symbolMatches(id: string, all: boolean): ElanSymbol[] {
    const symbols = this.scope!.getChildren().filter((f) => isSymbol(f)) as ElanSymbol[];

    return symbolMatches(id, all, symbols);
  }

  typeMatch(t1: SymbolType, t2: SymbolType) {
    if (t1 instanceof FloatType && t2 instanceof IntType) {
      return true;
    }

    return t1.name === t2.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof ClassType) {
      if (otherType.className === this.className) {
        if (this.ofTypes.length === otherType.ofTypes.length) {
          return this.ofTypes.length === 0
            ? true
            : this.ofTypes.every((t, i) => this.typeMatch(t, otherType.ofTypes[i]));
        }
        return false;
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

  resolveSymbol(id: string, scope: Scope): ElanSymbol {
    return this.scope.resolveSymbol(id, scope);
  }

  get name() {
    if (this.ofTypes.length === 1) {
      return `${this.className.trim()}<of ${this.ofTypes[0].name}>`;
    }
    if (this.ofTypes.length === 2) {
      return `${this.className.trim()}<of ${this.ofTypes[0].name}, ${this.ofTypes[1].name}>`;
    }

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

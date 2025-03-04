import { Class } from "../interfaces/class";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { ReifyableSymbolType } from "../interfaces/reifyable-symbol-type";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { NullScope } from "./null-scope";
import { isClassTypeDef, isReifyableSymbolType, isSymbol, symbolMatches } from "./symbol-helpers";
import { SymbolScope } from "./symbol-scope";
import { UnknownType } from "./unknown-type";

export enum ClassSubType {
  concrete,
  abstract,
  interface,
}

export class ClassType implements ReifyableSymbolType, Scope {
  constructor(
    public readonly className: string,
    public readonly subType: ClassSubType,
    public readonly isNotInheritable: boolean,
    public readonly isImmutable: boolean,
    public readonly isIndexable: boolean,
    public readonly inheritsFrom: SymbolType[],
    public scope: Class | NullScope,
  ) {}

  get ofType() {
    if (isClassTypeDef(this.scope) && this.scope.ofTypes.length === 1) {
      return this.scope.ofTypes[0];
    }
    return UnknownType.Instance;
  }

  reify(gts: SymbolType[]): ReifyableSymbolType {
    if (isClassTypeDef(this.scope) && this.scope.ofTypes.length === 1 && gts.length === 1) {
      let cls: Class | undefined;

      if (isReifyableSymbolType(this.scope.ofTypes[0])) {
        const t = this.scope.ofTypes[0].reify(gts);
        cls = this.scope.updateOfTypes([t]);
      } else {
        cls = this.scope.updateOfTypes([gts[0]]);
      }

      return new ClassType(
        this.className,
        this.subType,
        this.isNotInheritable,
        this.isImmutable,
        this.isIndexable,
        this.inheritsFrom,
        cls,
      );
    }

    return this;
  }

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
    const ofType = this.ofType;
    if (ofType !== UnknownType.Instance) {
      return `${this.className.trim()}<of ${ofType.name}>`;
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

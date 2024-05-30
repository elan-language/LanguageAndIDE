import { ClassFrame } from "../globals/class-frame";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../syntax-nodes/transforms";
import { ElanSymbol } from "../interfaces/symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { isSymbol } from "./symbol-helpers";
import { UnknownSymbol } from "./unknown-symbol";
import { Parent } from "../interfaces/parent";

export class ClassType implements SymbolType, Scope {
  constructor(
    public readonly className: string,
    public readonly isAbstract: boolean,
    public readonly isImmutable: boolean,
    public readonly inheritsFrom: SymbolType[],
    private readonly scope: ClassFrame,
  ) { }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof ClassType) {
      if (otherType.className === this.className) {
        return true;
      }
      return otherType.inheritsFrom.some(c => this.isAssignableFrom(c));
    }
    return false;
  }

  getParent(): Parent {
    return this.scope as Parent;
  }

  childSymbols() {
    // unknown because of typescript quirk
    return this.scope
      .getChildren()
      .filter((c) => isSymbol(c)) as unknown as ElanSymbol[];
  }

  resolveSymbol(id: string, transforms: Transforms, scope: Scope): ElanSymbol {
    for (const f of this.scope.getChildren()) {
      if (isSymbol(f) && f.symbolId === id) {
        return f;
      }
    }
    return new UnknownSymbol(id);
  }

  get name() {
    return `Class ${this.className.trim()}`;
  }

  toString(): string {
    return `${this.className.trim()}`;
  }
}

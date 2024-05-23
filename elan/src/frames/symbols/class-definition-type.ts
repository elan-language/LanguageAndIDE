import { ClassFrame } from "../globals/class-frame";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../syntax-nodes/transforms";
import { ElanSymbol } from "../interfaces/symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { isSymbol } from "./symbol-helpers";
import { UnknownSymbol } from "./unknown-symbol";
import { Parent } from "../interfaces/parent";

export class ClassDefinitionType implements SymbolType, Scope {
  constructor(
    public className: string,
    public isAbstract: boolean,
    private readonly scope: ClassFrame,
  ) {}
  isImmutable = false;

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

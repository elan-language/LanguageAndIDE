import { SymbolType } from "../interfaces/symbol-type";

export class ClassType implements SymbolType {
  constructor(public className: string) {}
  isImmutable = false;
  
  get name() {
    return `Class ${this.className.trim()}`;
  }

  toString(): string {
    return `${this.className.trim()}`;
  }
}

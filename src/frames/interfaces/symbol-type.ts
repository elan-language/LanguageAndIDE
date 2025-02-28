export interface SymbolType {
  name: string;
  isImmutable: boolean;
  initialValue: string;
  isAssignableFrom(otherType: SymbolType): boolean;
}

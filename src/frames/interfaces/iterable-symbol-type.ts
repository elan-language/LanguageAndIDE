import { GenericSymbolType } from "./generic-symbol-type";

export interface IterableSymbolType extends GenericSymbolType {
  isIterable: boolean;
}

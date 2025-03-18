export interface TypeOptions {
  isImmutable: boolean;
  isAbstract: boolean;
  isIndexable: boolean;
  isDoubleIndexable: boolean;
  isIterable: boolean;
}

export const noTypeOptions: TypeOptions = {
  isImmutable: false,
  isAbstract: false,
  isIndexable: false,
  isDoubleIndexable: false,
  isIterable: false,
} as TypeOptions;

export const immutableTypeOptions: TypeOptions = {
  isImmutable: true,
  isAbstract: false,
  isIndexable: false,
  isDoubleIndexable: false,
  isIterable: false,
} as TypeOptions;

export function getTypeOptions(): TypeOptions {
  return {
    isImmutable: false,
    isAbstract: false,
    isIndexable: false,
    isDoubleIndexable: false,
    isIterable: false,
  };
}

export function isArray(t: TypeOptions) {
  return !t.isImmutable && t.isIndexable && t.isIterable;
}

export function is2DArray(t: TypeOptions) {
  return !t.isImmutable && !t.isIndexable && t.isDoubleIndexable && !t.isIterable;
}

export function isList(t: TypeOptions) {
  return t.isImmutable && t.isIndexable && t.isIterable;
}

export function isDictionary(t: TypeOptions) {
  return !t.isImmutable && t.isIndexable && !t.isIterable;
}

export function isImmutableDictionary(t: TypeOptions) {
  return t.isImmutable && t.isIndexable && !t.isIterable;
}

export function isAnyDictionary(t: TypeOptions) {
  return t.isIndexable && !t.isIterable;
}

export function isRecord(t: TypeOptions) {
  return t.isImmutable && !t.isIndexable && !t.isIterable;
}

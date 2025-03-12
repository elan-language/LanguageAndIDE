
export interface ClassOptions {
  isImmutable: boolean, isAbstract: boolean, isIndexable: boolean, isDoubleIndexable: boolean, isIterable: boolean
}

export const noClassOptions: ClassOptions = {
  isImmutable: false,
  isAbstract: false,
  isIndexable: false,
  isDoubleIndexable: false,
  isIterable: false,
} as ClassOptions;

export const immutableTypeOptions: ClassOptions = {
    isImmutable: true,
    isAbstract: false,
    isIndexable: false,
    isDoubleIndexable: false,
    isIterable: false,
  } as ClassOptions;

export function newTypeOptions() : ClassOptions {
  return {
    isImmutable: false,
    isAbstract: false,
    isIndexable: false,
    isDoubleIndexable: false,
    isIterable: false,
  }
}
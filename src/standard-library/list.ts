import {
  ClassOptions,
  elanClass,
  elanFunction,
  elanGenericParamT1Type,
  elanIntType,
  ElanList,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { hasHiddenType } from "../has-hidden-type";
import { System } from "../system";

@elanClass(ClassOptions.concrete, [ElanT1])
export class List<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new List();
  }

  async _initialise() {
    return this;
  }

  constructor() {
    this.contents = [];
  }

  private contents: T1[];

  private system?: System;

  @elanFunction(["", "index", "value"], FunctionOptions.pure, ElanList(ElanT1))
  withPutAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
    const newList = [...this.contents];
    newList[index] = value;
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanFunction(["", "index", "value"], FunctionOptions.pure, ElanList(ElanT1))
  withInsertAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (this.contents as any).toSpliced(index, 0, value);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanFunction(["", "index"], FunctionOptions.pure, ElanList(ElanT1))
  withRemoveAt(@elanIntType() index: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (this.contents as any).toSpliced(index, 1);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanFunction(["", "value"], FunctionOptions.pure, ElanList(ElanT1))
  withRemoveFirst(@elanGenericParamT1Type() value: T1) {
    let newList = [...this.contents];
    const index = this.system!.elanIndexOf(newList, value);
    if (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
    }
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanFunction(["", "value"], FunctionOptions.pure, ElanList(ElanT1))
  withRemoveAll(@elanGenericParamT1Type() value: T1) {
    let newList = [...this.contents];
    let index = this.system!.elanIndexOf(newList, value);
    while (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
      index = this.system!.elanIndexOf(newList, value);
    }
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }
}

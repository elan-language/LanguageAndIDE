import {
  ClassOptions,
  elanArrayType,
  elanClass,
  elanGenericParamT1Type,
  elanIntType,
  elanProcedure,
  ElanT1,
} from "../elan-type-annotations";
import { System } from "../system";

@elanClass(ClassOptions.concrete, [ElanT1])
export class ElanArray<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ElanArray();
  }

  async _initialise() {
    return this;
  }

  constructor() {
    this.contents = [];
  }

  private contents: T1[];

  private system?: System;

  @elanProcedure(["", "index", "value"])
  putAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
    this.system!.safeArraySet(this.contents, index, value);
  }

  @elanProcedure(["", "column", "row"])
  putAt2D(
    @elanIntType() col: number,
    @elanIntType() row: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    this.system!.safeArraySet(this.contents[col] as T1[], row, value);
  }

  @elanProcedure(["", "index", "value"])
  insertAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
    this.contents.splice(index, 0, value);
  }

  @elanProcedure(["", "index"])
  removeAt(@elanIntType() index: number) {
    this.contents.splice(index, 1);
  }

  @elanProcedure(["", "value"])
  removeFirst(@elanGenericParamT1Type() value: T1) {
    const index = this.system!.elanIndexOf(this.contents, value);
    if (index > -1) {
      this.contents.splice(index, 1);
    }
  }

  @elanProcedure(["", "value"])
  removeAll(@elanGenericParamT1Type() value: T1) {
    let index = this.system!.elanIndexOf(this.contents, value);
    while (index > -1) {
      this.contents.splice(index, 1);
      index = this.system!.elanIndexOf(this.contents, value);
    }
  }

  @elanProcedure(["", "value"])
  append(@elanGenericParamT1Type() value: T1) {
    this.contents.push(value);
  }

  @elanProcedure(["", "other"])
  appendArray(@elanArrayType(ElanT1) listB: T1[]) {
    this.contents.push(...listB);
  }

  @elanProcedure(["", "other"])
  prepend(@elanGenericParamT1Type() value: T1) {
    this.contents.unshift(value);
  }

  @elanProcedure(["", "other"])
  prependArray(@elanArrayType(ElanT1) listB: T1[]) {
    this.contents.unshift(...listB);
  }
}

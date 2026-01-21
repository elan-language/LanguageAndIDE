import {
  ClassOption,
  ElanClass,
  elanClass,
  ElanClassName,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanIntType,
  elanProcedure,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { withPutHelper } from "./data-structure-helpers";
import { ElanRuntimeError } from "./elan-runtime-error";

@elanClass(ClassOption.array, [ElanT1], ["size", "initialValue"], [ElanInt, ElanT1], [], "Array")
export class ElanArray<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ElanArray();
  }

  async _initialise(size: number, value: T1) {
    if (size <= 0) {
      throw new ElanRuntimeError(`Size of Array must be non zero, positive value`);
    }

    if (!(typeof value === "boolean" || typeof value === "string" || typeof value === "number")) {
      throw new ElanRuntimeError(
        `Array must be of Type: Int, Float, String, or Boolean, with matching initial value`,
      );
    }

    const toInit: T1[] = [];
    toInit.length = size;

    for (let i = 0; i < size; i++) {
      toInit[i] = value;
    }
    this.contents = toInit;
    return this;
  }

  constructor(arr?: T1[]) {
    this.contents = arr ? [...arr] : [];
  }

  private contents: T1[];

  private system?: System;

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this.contents.length) {
          return { value: this.contents[index++], done: false };
        } else {
          return { done: true };
        }
      },
    } as { next: () => { value: T1; done: boolean } };
  }

  newArray<T>(newContents: T[]) {
    return this.system!.initialise(new ElanArray(newContents));
  }

  @elanProcedure(["index", "value"])
  put(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
    this.system!.safeListSet(this.contents, index, value);
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(ElanArray))
  withPut(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): ElanArray<T1> {
    return this.newArray(withPutHelper(this.contents, index, value));
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanFunction(["item"], FunctionOptions.pure, ElanInt)
  indexOf(
    @elanGenericParamT1Type()
    item: T1,
  ): number {
    return this.system!.elanIndexOf(this.contents, item);
  }

  @elanFunction(["item"], FunctionOptions.pure)
  contains(@elanGenericParamT1Type() item: T1): boolean {
    return this.indexOf(item) !== -1;
  }

  async asString() {
    const items: string[] = [];
    for (const i of this.contents) {
      const s = await this.system!.asString(i);
      items.push(s);
    }
    return `[${items.join(", ")}]`;
  }

  safeIndex(index: number) {
    const r = this.contents[index];

    if (r === undefined) {
      this.system!.throwRangeError(this.contents, index);
    }

    return r;
  }

  safeSet(index: number, value: T1) {
    this.put(index, value);
  }

  safeSlice(index1: number | undefined, index2: number | undefined) {
    if (index1 && index1 < 0) {
      this.system!.throwRangeError(this.contents, index1);
    }

    if (index2 && index2 < 0) {
      this.system!.throwRangeError(this.contents, index2);
    }

    const r = this.contents.slice(index1, index2);

    return this.system!.initialise(new ElanArray(r));
  }

  equals(other: unknown) {
    if (other instanceof ElanArray) {
      if (this.contents.length === other.contents.length) {
        return this.contents.every((c, i) => this.system!.equals(c, other.contents[i]));
      }
    }
    return false;
  }

  @elanFunction([], FunctionOptions.pure, ElanClassName("ElanSet"))
  asSet() {
    return this.system!.arrayAsSet(this);
  }

  @elanFunction([], FunctionOptions.pure, ElanClassName("List"))
  asList() {
    return this.system!.arrayAsList(this);
  }
}

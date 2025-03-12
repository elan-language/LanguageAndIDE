import {
  ClassOption,
  elanClass,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanIntType,
  elanProcedure,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

@elanClass(ClassOption.array2D, [ElanT1], [], [], [], "Array2D")
export class ElanArray2D<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ElanArray2D();
  }

  async _initialise() {
    return this;
  }

  constructor(arr?: T1[][]) {
    this.contents = arr ? [...arr] : [];
  }

  private contents: T1[][];

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
    };
  }

  @elanProcedure(["column", "row", "value"])
  putAt(
    @elanIntType() col: number,
    @elanIntType() row: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    this.system!.safe2DArraySet(this.contents, col, row, value);
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  async asString() {
    const strContents = [];

    for (const c of this.contents) {
      strContents.push(await this.system?.asString(c));
    }

    return `[${strContents.map((s) => `[${s}]`).join(", ")}]`;
  }

  safeIndex(index1: number, index2?: number) {
    if (index2 === undefined) {
      this.system!.throwRangeError(this.contents, index2);
      return;
    }

    const r = this.contents[index1];

    if (r === undefined) {
      this.system!.throwRangeError(this.contents, index1);
      return;
    }

    const r1 = r[index2];

    if (r1 === undefined) {
      this.system!.throwRangeError(this.contents, index1);
      return;
    }

    return r1 as T1;
  }
}

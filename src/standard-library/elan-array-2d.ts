import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ClassOption,
  ElanClass,
  elanClass,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanIntType,
  elanProcedure,
  ElanT1,
  ElanTuple,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

@elanClass(
  ClassOption.array2D,
  [ElanT1],
  ["columns", "rows", "initialValue"],
  [ElanInt, ElanInt, ElanT1],
  [],
  "Array2D",
)
export class ElanArray2D<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ElanArray2D();
  }

  async _initialise(x: number, y: number, value: T1) {
    if (x <= 0 || y <= 0) {
      throw new ElanRuntimeError(`Each dimension of Array2D must be non zero, positive value`);
    }

    if (!(typeof value === "boolean" || typeof value === "string" || typeof value === "number")) {
      throw new ElanRuntimeError(
        `Array2D must be of Type: Int, Float, String, or Boolean, with matching initial value`,
      );
    }

    const toInit: T1[][] = [];
    toInit.length = x;

    for (let i = 0; i < x; i++) {
      const subArr: T1[] = [];
      subArr.length = y;
      for (let j = 0; j < y; j++) {
        subArr[j] = value;
      }
      toInit[i] = subArr;
    }

    this.contents = toInit;
    return this;
  }

  constructor(arr?: T1[][]) {
    this.contents = arr ? [...arr] : [];
  }

  private contents: T1[][];

  public read(x: number, y: number): T1 {
    return this.contents[x][y];
  }

  private system?: System;

  @elanProcedure(["column", "row", "value"])
  put(@elanIntType() col: number, @elanIntType() row: number, @elanGenericParamT1Type() value: T1) {
    this.system!.safeArray2DSet(this.contents, col, row, value);
  }

  @elanFunction(["column", "row", "value"], FunctionOptions.pure, ElanClass(ElanArray2D))
  withPut(
    @elanIntType() col: number,
    @elanIntType() row: number,
    @elanGenericParamT1Type() value: T1,
  ): ElanArray2D<T1> {
    const newList = [...this.contents];
    this.system!.safeArray2DSet(newList, col, row, value);

    return this.system!.initialise(new ElanArray2D(newList));
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  columns() {
    return this.contents.length;
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  rows() {
    return this.contents[0].length;
  }

  @elanFunction(["item"], FunctionOptions.pure, ElanTuple([ElanInt, ElanInt]))
  indexOf(
    @elanGenericParamT1Type()
    item: T1,
  ): [number, number] {
    return this.system!.tuple(this.system!.elan2DIndexOf(this.contents, item)) as [number, number];
  }

  @elanFunction(["item"], FunctionOptions.pure)
  contains(@elanGenericParamT1Type() item: T1): boolean {
    const [i, _] = this.system!.elan2DIndexOf(this.contents, item);
    return i !== -1;
  }

  async asString() {
    const columns = [];

    for (const column of this.contents) {
      const rows = [];

      for (const row of column) {
        const s = await this.system!.asString(row);
        rows.push(s);
      }

      columns.push(`[${rows.join(", ")}]`);
    }

    return `[${columns.join(", ")}]`;
  }

  async asCloneableObject() {
    return this.contents;
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
      this.system!.throwRangeError(r, index2);
      return;
    }

    return r1 as T1;
  }
}

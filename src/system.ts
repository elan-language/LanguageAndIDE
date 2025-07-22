/* eslint-disable @typescript-eslint/no-explicit-any */
import { AssertOutcome } from "./assert-outcome";
import { ElanInputOutput } from "./elan-input-output";
import { ElanRuntimeError } from "./elan-runtime-error";
import { TestStatus } from "./frames/status-enums";
import { Dictionary } from "./standard-library/dictionary";
import { DictionaryImmutable } from "./standard-library/dictionary-immutable";
import { ElanArray } from "./standard-library/elan-array";
import { ElanSet } from "./standard-library/elan-set";
import { List } from "./standard-library/list";
import { ListImmutable } from "./standard-library/list-immutable";
import { DebugSymbol, WebWorkerBreakpointMessage } from "./web/web-worker-messages";

export class System {
  constructor(public readonly elanInputOutput: ElanInputOutput) {}

  private _stdlib: any;

  set stdlib(stdlib: any) {
    this._stdlib = stdlib;
  }

  // constant immutables
  emptyImmutableListSingleton = this.initialise(new ListImmutable([]));
  emptyDictionaryImmutableSingleton = this.dictionaryImmutable([]);

  emptyRegExpSingleton = /(?:)/;

  emptyRegExp() {
    return this.emptyRegExpSingleton;
  }

  emptyTuple(toInit: any[]) {
    const t = [...toInit];
    return this.tuple(t);
  }

  emptyFunc(rt: any) {
    return () => rt;
  }

  tuple(t: Array<any>) {
    return t;
  }

  listImmutable(t: Array<any>) {
    return this.initialise(new ListImmutable(t));
  }

  dictionary(t: []) {
    return this.initialise(new Dictionary(t));
  }

  dictionaryImmutable(t: []) {
    return this.initialise(new DictionaryImmutable(t));
  }

  list(t: Array<any>) {
    return this.initialise(new List(t));
  }

  initialise<T>(toInit: T): T {
    if ("system" in (toInit as object)) {
      (toInit as any).system = this;
    }

    if ("stdlib" in (toInit as object)) {
      (toInit as any).stdlib = this._stdlib;
    }

    return toInit;
  }

  emptyClass(type: any, properties: [string, any][]) {
    const t = Object.create(type.prototype);

    for (const p of properties) {
      t[p[0]] = p[1];
    }

    return t;
  }

  safeIndex(indexable: any, index1: any, index2?: any | undefined) {
    if (typeof indexable !== "string" && "safeIndex" in indexable) {
      return indexable.safeIndex(index1, index2);
    }

    if (indexable === undefined) {
      throw new ElanRuntimeError(`Out of range index`);
    }

    const r = indexable[index1];

    if (r === undefined) {
      this.throwRangeError(indexable, index1);
    }

    return r;
  }

  safeSlice(indexable: any, index1: number | undefined, index2: number | undefined) {
    if (indexable === undefined) {
      throw new ElanRuntimeError(`Out of range index`);
    }

    if (typeof indexable !== "string" && "safeSlice" in indexable) {
      return indexable.safeSlice(index1, index2);
    }

    if (typeof indexable !== "string") {
      throw new ElanRuntimeError(`Out of range index`);
    }

    if (index1 && index1 < 0) {
      this.throwRangeError(indexable, index1);
    }

    if (index2 && index2 < 0) {
      this.throwRangeError(indexable, index2);
    }

    return indexable.slice(index1, index2);
  }

  throwRangeError(toIndex: any, index: any) {
    const size = toIndex.length;
    if (size !== undefined) {
      throw new ElanRuntimeError(`Out of range index: ${index} size: ${size}`);
    }
    throw new ElanRuntimeError(`No such key: ${index}`);
  }

  throwKeyError(index: any) {
    throw new ElanRuntimeError(`No such key: ${index}`);
  }

  safeListSet<T>(toIndex: T[], index: number, value: T) {
    const size = toIndex.length;
    if (index >= size) {
      throw new ElanRuntimeError(`Out of range index: ${index} size: ${size}`);
    }

    toIndex[index] = value;
  }

  safeArray2DSet<T>(toIndex: T[][], col: number, row: number, value: T) {
    const size = toIndex.length;
    if (col >= size) {
      throw new ElanRuntimeError(`Out of range index: ${col} size: ${size}`);
    }

    this.safeListSet(toIndex[col], row, value);
  }

  async printLine(s: any) {
    const ss = await this._stdlib.asString(s);
    await this.elanInputOutput.printLine(ss);
  }

  async input() {
    return await this.elanInputOutput.readLine();
  }

  equals(i1: any, i2: any) {
    const t = typeof i1;

    if (t === "boolean" || t === "string" || t === "number") {
      return i1 === i2;
    }

    return this.objectEquals(i1, i2); // todo
  }

  objectEquals(o1: any, o2: any) {
    if (o1 === o2) {
      return true;
    }

    if (o1?.constructor?.name !== o2?.constructor?.name) {
      return false;
    }

    if (o1?.constructor?.name === o2?.constructor?.name && o2?.constructor?.name === "Function") {
      return false;
    }

    if ("equals" in o1) {
      return o1.equals(o2);
    }

    const o1items = Object.getOwnPropertyNames(o1);
    const o2items = Object.getOwnPropertyNames(o2);

    if (o1items.length !== o2items.length) {
      return false;
    }

    if (o1items.join() !== o2items.join()) {
      return false;
    }

    for (const i of o1items.filter((i) => !i.startsWith("_"))) {
      if (!this.equals(o1[i], o2[i])) {
        return false;
      }
    }

    return true;
  }

  async assert(
    actualFunc: () => Promise<any>,
    expected: any,
    htmlId: string,
    stdlib: { asString: (a: any) => Promise<string> },
    ignored: boolean,
  ) {
    if (ignored) {
      return new AssertOutcome(TestStatus.ignored, "", "", htmlId);
    }
    try {
      const actual = await actualFunc();
      return await this.doAssert(actual, expected, htmlId, stdlib);
    } catch (err) {
      return await this.doAssert((err as any).message, expected, htmlId, stdlib);
    }
  }

  private async doAssert(
    actual: any,
    expected: any,
    htmlId: string,
    stdlib: { asString: (a: any) => Promise<string> },
  ) {
    if (!this.equals(actual, expected)) {
      return new AssertOutcome(
        TestStatus.fail,
        `${await stdlib.asString(actual)}`,
        `${await stdlib.asString(expected)}`,
        htmlId,
      );
    }
    return new AssertOutcome(
      TestStatus.pass,
      `${await stdlib.asString(actual)}`,
      `${await stdlib.asString(expected)}`,
      htmlId,
    );
  }

  deconstructList<T>(list: List<T> | ListImmutable<T>): [T, List<T> | ListImmutable<T>] {
    return list.deconstructList();
  }

  unhandledExpression(v: any) {
    const s = this._stdlib.asString(v);
    throw new ElanRuntimeError(`'${s}' not covered in switch statement`);
  }

  async runTests(tests: [string, (_outcomes: AssertOutcome[]) => Promise<void>][]) {
    const allOutcomes: [string, AssertOutcome[]][] = [];

    for (const t of tests) {
      const outcomes: AssertOutcome[] = [];
      const testId = t[0];
      try {
        await t[1](outcomes);
      } catch (e) {
        const msg = (e as Error).message || "Test threw error";
        outcomes.push(new AssertOutcome(TestStatus.error, msg, "", "", e as Error));
      }
      allOutcomes.push([testId, outcomes]);
    }

    // clear tests each time or the tests array in the program gets duplicates
    tests.length = 0;

    return allOutcomes;
  }

  injectedProperty(s: string) {
    return s === "system" || s === "stdlib";
  }

  async asCloneableObject(v: any): Promise<unknown> {
    if (typeof v === "boolean" || typeof v === "string" || typeof v === "number") {
      return v;
    }

    if (v instanceof RegExp) {
      return `/${v.source}/`;
    }

    if ("asCloneableObject" in v) {
      return await v.asCloneableObject();
    }

    if (typeof v[Symbol.iterator] === "function") {
      const arr = [];
      for (const o of v) {
        arr.push(await this.asCloneableObject(o));
      }
      return arr;
    }

    const clone = {} as { [index: string]: any };

    const keys = Object.keys(v)
      .map((k) => (k.startsWith("_") ? k.slice(1) : k))
      .filter((k) => !this.injectedProperty(k));

    for (const k of keys) {
      clone[k] = await this.asCloneableObject(v[k]);
    }

    return clone;
  }

  async debugSymbol(id: string, symbol: unknown, typeMap: string): Promise<DebugSymbol | string> {
    const asCloneable = await this.asCloneableObject(symbol);

    try {
      return {
        name: id,
        value: asCloneable,
        typeMap: typeMap,
      };
    } catch (_e) {
      return "error resolving";
    }
  }

  elanIndexOf<T1>(list: T1[], elem: T1) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (this.equals(item, elem)) {
        return i;
      }
    }
    return -1;
  }

  elan2DIndexOf<T1>(list: T1[][], elem: T1): [number, number] {
    for (let i = 0; i < list.length; i++) {
      const subArr = list[i];
      for (let j = 0; j < subArr.length; j++) {
        const item = subArr[j];
        if (this.equals(item, elem)) {
          return [i, j];
        }
      }
    }
    return [-1, -1];
  }

  async asString(a: any) {
    return await this._stdlib.asString(a);
  }

  async breakPoint(
    allScopedSymbols: DebugSymbol[],
    id: string,
    singlestep: boolean,
    pause: boolean,
  ): Promise<boolean> {
    if (singlestep && !pause) {
      return false;
    }

    let paused = true;
    let nextPause = false;

    addEventListener("message", async (e) => {
      if (e.data.type === "resume") {
        paused = false;
      }
      if (e.data.type === "pause") {
        nextPause = true;
      }
    });

    return new Promise<boolean>((rs) => {
      postMessage({
        type: singlestep ? "singlestep" : "breakpoint",
        value: allScopedSymbols,
        pausedAt: id,
      } as WebWorkerBreakpointMessage);

      const timeOut = setInterval(async () => {
        if (!paused) {
          clearInterval(timeOut);
          rs(nextPause);
        }
      }, 1);
    });
  }

  async getPivot<T1>(x: T1, y: T1, z: T1, compare: (a: T1, b: T1) => Promise<number>) {
    if ((await compare(x, y)) < 0) {
      if ((await compare(y, z)) < 0) {
        return y;
      } else if ((await compare(z, x)) < 0) {
        return x;
      } else {
        return z;
      }
    } else if ((await compare(y, z)) > 0) {
      return y;
    } else if ((await compare(z, x)) > 0) {
      return x;
    } else {
      return z;
    }
  }

  // from github https://gist.github.com/kimamula/fa34190db624239111bbe0deba72a6ab
  async quickSort<T1>(
    arr: T1[],
    compare: (a: T1, b: T1) => Promise<number>,
    left = 0,
    right = arr.length - 1,
  ) {
    if (left < right) {
      let i = left,
        j = right,
        tmp;
      const pivot = await this.getPivot(arr[i], arr[i + Math.floor((j - i) / 2)], arr[j], compare);
      while (true) {
        while ((await compare(arr[i], pivot)) < 0) {
          i++;
        }
        while ((await compare(pivot, arr[j])) < 0) {
          j--;
        }
        if (i >= j) {
          break;
        }
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;

        i++;
        j--;
      }
      await this.quickSort(arr, compare, left, i - 1);
      await this.quickSort(arr, compare, j + 1, right);
    }
    return arr;
  }

  listImmutableAsList<T1>(list: ListImmutable<T1>): List<T1> {
    const newList = [...list];
    return this.initialise(new List(newList));
  }

  listImmutableAsSet<T1>(list: ListImmutable<T1>): ElanSet<T1> {
    const newList = [...list];
    return this.initialise(new ElanSet<T1>(newList));
  }

  listImmutableAsArray<T1>(list: ListImmutable<T1>): ElanArray<T1> {
    const newList = [...list];
    return this.initialise(new ElanArray(newList));
  }

  listAsListImmutable<T1>(list: List<T1>): ListImmutable<T1> {
    const newList = [...list];
    return this.initialise(new ListImmutable(newList));
  }

  listAsSet<T1>(list: List<T1>): ElanSet<T1> {
    const newList = [...list];
    return this.initialise(new ElanSet<T1>(newList));
  }

  listAsArray<T1>(list: List<T1>): ElanArray<T1> {
    const newList = [...list];
    return this.initialise(new ElanArray(newList));
  }

  arrayAsListImmutable<T1>(list: ElanArray<T1>): ListImmutable<T1> {
    const newList = [...list];
    return this.initialise(new ListImmutable(newList));
  }

  arrayAsSet<T1>(list: ElanArray<T1>): ElanSet<T1> {
    const newList = [...list];
    return this.initialise(new ElanSet<T1>(newList));
  }

  arrayAsList<T1>(list: ElanArray<T1>): List<T1> {
    const newList = [...list];
    return this.initialise(new List(newList));
  }

  dictionaryAsDictionaryImmutable<T1, T2>(
    dictionary: Dictionary<T1, T2>,
  ): DictionaryImmutable<T1, T2> {
    return this.initialise(new DictionaryImmutable([...dictionary.contents.entries()]));
  }

  dictionaryImmutableAsDictionary<T1, T2>(
    dictionary: DictionaryImmutable<T1, T2>,
  ): Dictionary<T1, T2> {
    return this.initialise(new Dictionary([...dictionary.contents.entries()]));
  }
}

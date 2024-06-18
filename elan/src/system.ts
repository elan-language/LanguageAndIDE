/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElanRuntimeError } from "./elan-runtime-error";
import { ElanInputOutput } from "./elan-input-output";
import { TestStatus } from "./frames/status-enums";
import { hasHiddenType } from "./has-hidden-type";

export class AssertOutcome {
  constructor(
    public readonly status: TestStatus,
    public readonly actual: string,
    public readonly expected: string,
    public readonly htmlId: string,
    public readonly error?: Error,
  ) {}
}

export class System {
  constructor(public readonly elanInputOutput: ElanInputOutput) {}

  // constant immutables
  emptyImmutableListSingleton = this.immutableList([]);
  emptyIterableSingleton = this.iter([]);
  emptyImmutableDictionarySingleton = this.immutableDictionary({});

  emptyIter() {
    return this.emptyIterableSingleton;
  }

  emptyArrayList() {
    return this.literalArray([]);
  }

  emptyDictionary() {
    return this.dictionary({});
  }

  emptyImmutableDictionary() {
    return this.emptyImmutableDictionarySingleton;
  }

  emptyImmutableList() {
    return this.emptyImmutableListSingleton;
  }

  emptyTuple(toInit: any[]) {
    const t = [...toInit];
    return this.tuple(t);
  }

  tuple(t: Array<any>) {
    (t as unknown as hasHiddenType)._type = "Tuple";
    return t;
  }

  immutableList(t: Array<any>) {
    (t as unknown as hasHiddenType)._type = "ImmutableList";
    return t;
  }

  dictionary(t: object) {
    (t as unknown as hasHiddenType)._type = "Dictionary";
    return t;
  }

  immutableDictionary(t: object) {
    (t as unknown as hasHiddenType)._type = "ImmutableDictionary";
    return t;
  }

  literalArray(t: Array<any>) {
    (t as unknown as hasHiddenType)._type = "ArrayList";
    return t;
  }

  iter(t: Array<any>) {
    (t as unknown as hasHiddenType)._type = "Iter";
    return t;
  }

  wrapArray(t: Array<any>) {
    (t as unknown as hasHiddenType)._type = "ArrayList";
    return t;
  }

  array(size1: number, size2?: number) {
    const arr = new Array(size1);
    if (size2) {
      for (let i = 0; i <= size1; i++) {
        const a2 = new Array(size2);
        (<any>a2)._type = "ArrayList";
        arr[i] = a2;
      }
    }
    (arr as unknown as hasHiddenType)._type = "ArrayList";
    return arr;
  }

  initialise(toInit: any, toType?: () => any) {
    if (toType && Array.isArray(toInit) && toInit.length > 0) {
      for (let i = 0; i < toInit.length; i++) {
        if (Array.isArray(toInit[i])) {
          this.initialise(toInit[i], toType);
        } else {
          toInit[i] = toType();
        }
      }
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

  safeIndex(toIndex?: any, index?: any) {
    if (toIndex === undefined) {
      throw new ElanRuntimeError(`Out of range index`);
    }

    const r = toIndex[index];

    if (r === undefined) {
      const size = toIndex.length;
      if (size !== undefined) {
        throw new ElanRuntimeError(`Out of range index: ${index} size: ${size}`);
      }
      throw new ElanRuntimeError(`No such key: ${index}`);
    }

    return r;
  }

  safeSet<T>(toIndex?: T[], index?: number, value?: T) {
    if (toIndex === undefined || index === undefined || value === undefined) {
      throw new ElanRuntimeError(`Out of range index`);
    }

    const size = toIndex.length;
    if (index >= size) {
      throw new ElanRuntimeError(`Out of range index: ${index} size: ${size}`);
    }

    toIndex[index] = value;
  }

  print(s: string) {
    this.elanInputOutput.printLine(s);
  }

  async input() {
    return this.elanInputOutput.readLine();
  }

  getTests(program: any) {
    return Object.getOwnPropertyNames(program)
      .filter((s) => s.startsWith("_test_"))
      .map((f) => program[f]);
  }

  concat<T>(lhs: Array<T> | T, rhs: Array<T> | T) {
    if (Array.isArray(lhs) && Array.isArray(rhs)) {
      return this.immutableList(lhs.concat(rhs));
    }

    if (Array.isArray(lhs)) {
      return this.immutableList(lhs.concat([rhs as T]));
    }

    // if (Array.isArray(rhs)){
    return this.immutableList([lhs as T].concat(rhs));
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

  assert(actual: any, expected: any, htmlId: string, stdlib: { asString: (a: any) => string }) {
    if (!this.equals(actual, expected)) {
      return new AssertOutcome(
        TestStatus.fail,
        `${stdlib.asString(actual)}`,
        `${stdlib.asString(expected)}`,
        htmlId,
      );
    }
    return new AssertOutcome(
      TestStatus.pass,
      `${stdlib.asString(actual)}`,
      `${stdlib.asString(expected)}`,
      htmlId,
    );
  }
}

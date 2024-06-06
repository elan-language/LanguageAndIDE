/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestStatus } from "./frames/status-enums";
import { hasHiddenType } from "./std-lib";

export class AssertOutcome {
  constructor(
    public readonly status: TestStatus,
    public readonly actual: string,
    public readonly expected: string,
    public readonly htmlId: string,
  ) {}
}

export class System {
  private default(type: string) {
    switch (type) {
      case "Int":
        return 0;
      case "Float":
        return 0.0;
      case "Boolean":
        return false;
      case "String":
        return "";
    }
    return undefined;
  }

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
      t[p[0]] = this.default(p[1]);
    }

    return t;
  }

  printer?: (s: string) => void;

  inputter?: () => Promise<string>;

  print(s: string) {
    this.printer!(s);
  }

  async input() {
    return this.inputter!();
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { hasHiddenType } from "./has-hidden-type";

export enum TestStatus {
  error,
  fail,
  pending,
  pass,
  default,
}

export class ElanRuntimeError extends Error {
  constructor(private readonly err: string | Error) {
    super(err instanceof Error ? err.message : err);
  }

  useLine(token: string) {
    return !(
      token.startsWith("System") ||
      token.startsWith("data") ||
      token.startsWith("http") ||
      token.startsWith("async") ||
      token.startsWith("Array")
    );
  }

  updateLine0(l0: string) {
    if (l0.startsWith("RangeError")) {
      return "Error: Stack Overflow";
    }
    return l0;
  }

  get elanStack() {
    const jsStack = this.err instanceof Error ? this.err.stack : this.stack;
    const elanStack: string[] = [];

    if (jsStack) {
      let lines = jsStack.split("\n").map((l) => l.trim());

      if (lines.length > 0) {
        elanStack.push(this.updateLine0(lines[0]));
        lines = lines.slice(1);

        for (const l of lines) {
          const line = l.split(" ");

          if (line.length > 1) {
            let fn = line[1];
            fn = fn === "runTests" ? "test" : fn;

            if (this.useLine(fn)) {
              elanStack.push(`at ${fn}`);
            }
          }
        }
      }
    }

    if (elanStack.length > 0) {
      return elanStack.join("\n");
    }
    return "";
  }
}

export class AssertOutcome {
  constructor(
    public readonly status: TestStatus,
    public readonly actual: string,
    public readonly expected: string,
    public readonly htmlId: string,
    public readonly error?: Error,
  ) {}
}

export class SystemWorker {
  constructor() {}

  // constant immutables
  emptyImmutableListSingleton = this.list([]);
  emptyIterableSingleton = this.iter([]);
  emptyImmutableDictionarySingleton = this.immutableDictionary({});

  emptyIter() {
    return this.emptyIterableSingleton;
  }

  emptyArray() {
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

  emptyFunc(rt: any) {
    return () => rt;
  }

  tuple(t: Array<any>) {
    (t as unknown as hasHiddenType)._type = "Tuple";
    return t;
  }

  list(t: Array<any>) {
    (t as unknown as hasHiddenType)._type = "List";
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
    (t as unknown as hasHiddenType)._type = "Array";
    return t;
  }

  iter(t: Array<any>) {
    (t as unknown as hasHiddenType)._type = "Iterable";
    return t;
  }

  array(t: Array<any>) {
    (t as unknown as hasHiddenType)._type = "Array";
    return t;
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

  safeIndex(indexable: any, index: any) {
    if (indexable === undefined) {
      throw new ElanRuntimeError(`Out of range index`);
    }

    const r = indexable[index];

    if (r === undefined) {
      this.throwRangeError(indexable, index);
    }

    return r;
  }

  safeDictionarySet<T>(toIndex: any, index: any, value: any) {
    const d = this.dictionary(toIndex ?? {}) as any;
    d[index] = value;
  }

  throwRangeError(toIndex: any, index: any) {
    const size = toIndex.length;
    if (size !== undefined) {
      throw new ElanRuntimeError(`Out of range index: ${index} size: ${size}`);
    }
    throw new ElanRuntimeError(`No such key: ${index}`);
  }

  safeArraySet<T>(toIndex: T[], index: number, value: T) {
    const size = toIndex.length;
    if (index >= size) {
      throw new ElanRuntimeError(`Out of range index: ${index} size: ${size}`);
    }

    toIndex[index] = value;
  }

  printLine(s: string) {
    postMessage(s);
  }

  async input(): Promise<string> {
    //return this.elanInputOutput.readLine();
    return undefined as any;
  }

  getTests(program: any) {
    return Object.getOwnPropertyNames(program)
      .filter((s) => s.startsWith("_test_"))
      .map((f) => program[f]);
  }

  concat<T>(lhs: Array<T> | T, rhs: Array<T> | T) {
    if (Array.isArray(lhs) && Array.isArray(rhs)) {
      return this.list(lhs.concat(rhs));
    }

    if (Array.isArray(lhs)) {
      return this.list(lhs.concat([rhs as T]));
    }

    // if (Array.isArray(rhs)){
    return this.list([lhs as T].concat(rhs));
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

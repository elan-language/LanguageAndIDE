export interface hasHiddenType {
  _type: "ImmutableList" | "ArrayList" | "Tuple" | "Iter" | "Dictionary" | "ImmutableDictionary";
}

export class StdLib {
  asString<T>(v: T | T[] | undefined): string {
    if (v === undefined || v === null) {
      throw new Error(`Out of range error`);
    }

    if (typeof v === "boolean") {
      return v ? "true" : "false";
    }

    if (typeof v === "string") {
      return v.toString();
    }

    if (typeof v === "number") {
      return v.toString();
    }

    if (Array.isArray(v)) {
      const type = (v as unknown as hasHiddenType)._type;

      switch (type) {
        case "ImmutableList":
          if (v.length === 0) {
            return "empty ImmutableList";
          }
          return `ImmutableList {${v.map((i) => this.asString(i)).join(", ")}}`;
        case "Tuple":
          return `Tuple (${v.map((i) => this.asString(i)).join(", ")})`;
        case "ArrayList":
          if (v.length === 0) {
            return "empty ArrayList";
          }
          return `ArrayList [${v.map((i) => this.asString(i)).join(", ")}]`;
        case "Iter":
          if (v.length === 0) {
            return "empty Iter";
          }
          return `Iter [${v.map((i) => this.asString(i)).join(", ")}]`;
        default:
          throw new Error("_type not set");
      }
    }

    if (typeof v === "object" && "asString" in v) {
      return (v.asString as () => string)();
    }

    if (typeof v === "object" && v.constructor.name === "Object") {
      const type = (v as unknown as hasHiddenType)._type;
      const [tn, pf, sf] =
        type === "Dictionary" ? ["Dictionary", "[", "]"] : ["ImmutableDictionary", "{", "}"];

      const items = Object.getOwnPropertyNames(v).filter((s) => s !== "_type");
      if (items.length === 0) {
        return `empty ${tn}`;
      }

      const o = v as { [key: string]: object };

      return `${tn} ${pf}${items.map((n) => `${n}:${o[n]}`).join(", ")}${sf}`;
    }

    if (typeof v === "object") {
      return `a ${v.constructor.name}`;
    }

    throw new Error("Not implemented: " + typeof v);
  }

  asArray<T>(list: T[]): T[] {
    const arr = [...list];
    (arr as unknown as hasHiddenType)._type = "ArrayList";
    return arr;
  }

  size<T>(arr: T[], newSize: number): T[] {
    return arr;
  }

  asList<T>(arr: T[]): T[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "ImmutableList";
    return list;
  }

  range(start: number, end: number): number[] {
    const seq = [];
    for (let i = start; i <= end; i++) {
      seq.push(i);
    }
    return seq;
  }

  asIter<T>(arr: T[]): T[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "Iter";
    return list;
  }

  head<T>(arr: T[]): T {
    return arr[0];
  }

  keys<T>(dict: { [key: string]: T }): string[] {
    const lst = Object.getOwnPropertyNames(dict).filter((s) => s !== "_type");
    (lst as unknown as hasHiddenType)._type = "ImmutableList";
    return lst;
  }

  values<T>(dict: { [key: string]: T }): T[] {
    const lst = this.keys(dict).map((k) => dict[k]);
    (lst as unknown as hasHiddenType)._type = "ImmutableList";
    return lst;
  }

  hasKey<T>(dict: { [key: string]: T }, key: string): boolean {
    return this.keys(dict).includes(key);
  }

  removeItem<T>(dict: { [key: string]: T }, key: string) {
    const newDict = { ...dict };
    (newDict as unknown as hasHiddenType)._type = (dict as unknown as hasHiddenType)._type;
    delete newDict[key];
    return newDict;
  }

  removeAt<T>(dict: { [key: string]: T }, key: string) {
    delete dict[key];
  }

  length<T>(coll: string | T[] | { [key: string]: T }) {
    if (typeof coll === "string") {
      return coll.length;
    }
    if (Array.isArray(coll)) {
      return coll.length;
    }
    return this.keys(coll).length;
  }

  isBefore(s1: string, s2: string) {
    return s1 < s2;
  }

  isAfter(s1: string, s2: string) {
    return s1 > s2;
  }

  isAfterOrSameAs(s1: string, s2: string) {
    return s1 > s2 || s1 === s2;
  }

  isBeforeOrSameAs(s1: string, s2: string) {
    return s1 < s2 || s1 === s2;
  }

  get<T>(st: Array<T>, index: number) {
    return st[index];
  }

  getItem<T>(st: { [key: string]: T }, index: string) {
    return st[index];
  }

  getRange<T>(st: Array<T>, index1: number, index2: number) {
    const list = st.slice(index1, index2);
    (list as unknown as hasHiddenType)._type = "ImmutableList";
    return list;
  }

  put<T>(list: Array<T>, index: number, value: T) {
    const newList = [...list];
    newList[index] = value;
    (newList as unknown as hasHiddenType)._type = "ImmutableList";
    return newList;
  }

  putItem<T>(dict: { [key: string]: T }, key: string, value: T) {
    const newDict = { ...dict };
    newDict[key] = value;
    (newDict as unknown as hasHiddenType)._type = "ImmutableDictionary";
    return newDict;
  }

  first<T>(st: Array<T>) {
    return st[0];
  }

  second<T>(st: Array<T>) {
    return st[1];
  }

  indexOf(s1: string, s2: string) {
    return s1.indexOf(s2);
  }
  mod(n: number, d: number) {
    return n % d;
  }

  div(n: number, d: number) {
    return this.floor(n / d);
  }

  floor(n: number) {
    return Math.floor(n);
  }
  ceiling(n: number) {
    const fl = this.floor(n);
    return n > fl ? fl + 1 : fl;
  }
  toPrecision(n: number, digits: number) {
    return n.toPrecision(digits);
  }

  pi = Math.PI;

  sin = Math.sin;

  cos = Math.cos;

  sqrt = Math.sqrt;

  typeAndProperties(o: { [key: string]: object }) {
    const type = o.constructor.name;
    const items = Object.getOwnPropertyNames(o);
    return `${type} [${items.map((n) => `"${n}":${o[n]}`).join(", ")}]`;
  }

  async pause(period: number) {}

  readKey() {
    return 0;
  }

  // Returns an Int between the two inclusive boundaries.
  randomInt(f: number, l: number) {
    return 0;
  }

  // returns a Float in range 0 <= n < 1
  random() {
    return 0;
  }

  filter<T>(source: T[], predicate: (value: T) => boolean) {
    return this.asIter(source.filter(predicate));
  }

  map<T, U>(source: T[], predicate: (value: T) => U) {
    return this.asIter(source.map(predicate));
  }

  reduce<T, U>(source: T[], initValue: U, predicate: (s: U, value: T) => U): U {
    return source.reduce(predicate, initValue);
  }

  max(source: number[]): number {
    return Math.max(...source);
  }

  maxBy<T>(source: T[], predicate: (value: T) => number): T {
    const mm = source.map(predicate);
    const max = Math.max(...mm);
    const i = mm.indexOf(max);
    return source[i];
  }

  min(source: number[]): number {
    return Math.min(...source);
  }

  minBy<T>(source: T[], predicate: (value: T) => number): T {
    const mm = source.map(predicate);
    const max = Math.min(...mm);
    const i = mm.indexOf(max);
    return source[i];
  }

  count<T>(coll: string | T[] | { [key: string]: T }) {
    if (typeof coll === "string") {
      return coll.length;
    }
    if (Array.isArray(coll)) {
      return coll.length;
    }
    return this.keys(coll).length;
  }

  any<T>(source: T[], predicate: (value: T) => boolean) {
    return source.some(predicate);
  }

  groupBy<T>(source: T[], predicate: (value: T) => T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = {} as any;

    for (const i of source) {
      if (result[i]) {
        result[i].push(i);
      } else {
        result[i] = this.asList([i]);
      }
    }
  }

  contains(source: string[], substr: string) {
    return source.includes(substr);
  }
}

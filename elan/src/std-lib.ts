interface hasHiddenType {
  _type: "List" | "Array" | "Tuple" | "Iter";
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
        case "List":
          if (v.length === 0) {
            return "empty List";
          }
          return `List [${v.map((i) => this.asString(i)).join(", ")}]`;
        case "Tuple":
          return `Tuple (${v.map((i) => this.asString(i)).join(", ")})`;
        case "Array":
          if (v.length === 0) {
            return "empty Array";
          }
          return `Array [${v.map((i) => this.asString(i)).join(", ")}]`;
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
      const items = Object.getOwnPropertyNames(v);
      if (items.length === 0) {
        return "empty Dictionary";
      }

      const o = v as { [key: string]: object };

      return `Dictionary [${items.map((n) => `${n}:${o[n]}`).join(", ")}]`;
    }

    if (typeof v === "object") {
      return `a ${v.constructor.name}`;
    }

    throw new Error("Not implemented: " + typeof v);
  }

  asArray<T>(list: T[]): T[] {
    const arr = [...list];
    (arr as unknown as hasHiddenType)._type = "Array";
    return arr;
  }

  asList<T>(arr: T[]): T[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "List";
    return list;
  }

  asIter<T>(arr: T[]): T[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "Iter";
    return list;
  }

  keys<T>(dict: { [key: string]: T }): string[] {
    const lst = Object.getOwnPropertyNames(dict);
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  values<T>(dict: { [key: string]: T }): T[] {
    const lst = this.keys(dict).map((k) => dict[k]);
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  hasKey<T>(dict: { [key: string]: T }, key: string): boolean {
    return this.keys(dict).includes(key);
  }

  setItem<T>(dict: { [key: string]: T }, key: string, value: T) {
    const newDict = { ...dict };
    newDict[key] = value;
    return newDict;
  }

  removeItem<T>(dict: { [key: string]: T }, key: string) {
    const newDict = { ...dict };
    delete newDict[key];
    return newDict;
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

  first<T>(st: Array<T>) {
    return st[0];
  }

  second<T>(st: Array<T>) {
    return st[1];
  }

  indexOf(s1: string, s2: string) {
    return s1.indexOf(s2);
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

  newline = "\n";

  typeAndProperties(o: { [key: string]: object }) {
    const type = o.constructor.name;
    const items = Object.getOwnPropertyNames(o);
    return `${type} [${items.map((n) => `"${n}":${o[n]}`).join(", ")}]`;
  }

  async pause(period: number) {}

  readKey() {
    return 0;
  }

  random(f: number, l: number) {
    return 0;
  }

  filter<T>(source : T[], predicate: (value : T) => boolean ){
    return this.asIter(source.filter(predicate));
  }

  map<T, U>(source : T[], predicate: (value : T) => U ){
    return this.asIter(source.map(predicate));
  }

  reduce<T, U>(source: T[], initValue: U, predicate: (s: U, value: T) => U): U {
    return source.reduce(predicate, initValue);
  }

  max(source: number[]): number {
    return Math.max(...source);
  }

  maxBy<T>(source: T[], predicate: (value : T) => number): T {
    const mm = source.map(predicate);
    const max = Math.max(...mm);
    const i = mm.indexOf(max); 
    return source[i];
  }

  min(source: number[]): number {
    return Math.min(...source);
  }

  minBy<T>(source: T[], predicate: (value : T) => number): T {
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

  any<T>(source : T[], predicate: (value : T) => boolean ){
    return source.some(predicate);
  }

  groupBy<T>(source: T[], predicate: (value: T) => T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = {} as any;

    for (const i of source) {
      if (result[i]) {
        result[i].push(i);
      }
      else {
        result[i] = this.asList([i]);
      }
    }
  }
}

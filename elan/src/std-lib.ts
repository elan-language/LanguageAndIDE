import { integer } from "vscode-languageclient";
import { hasHiddenType } from "./has-hidden-type";
import { System } from "./system";
import { end } from "./test/testHelpers";

type Location = [string, number, number];
type CharMap = Location[];

export class StdLib {
  constructor(private readonly system: System) {}

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

      return `${tn} ${pf}${items.map((n) => `${n}:${this.asString(o[n])}`).join(", ")}${sf}`;
    }

    if (typeof v === "object") {
      return `a ${v.constructor.name}`;
    }

    throw new Error("Not implemented: " + typeof v);
  }

  unicode(n: number): string {
    return String.fromCharCode(n);
  }

  asArrayList<T>(list: T[]): T[] {
    const arr = [...list];
    (arr as unknown as hasHiddenType)._type = "ArrayList";
    return arr;
  }

  size<T>(arr: T[], newSize: number): T[] {
    return arr;
  }

  asImmutableList<T>(arr: T[]): T[] {
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
    return this.system.safeIndex(arr, 0);
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

  withRemoveKey<T>(dict: { [key: string]: T }, key: string) {
    const newDict = { ...dict };
    (newDict as unknown as hasHiddenType)._type = (dict as unknown as hasHiddenType)._type;
    delete newDict[key];
    return newDict;
  }

  removeKey<T>(dict: { [key: string]: T }, key: string) {
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

  substring(s1: string, start: number, end: number) {
    return s1.substring(start, end);
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
    return this.system.safeIndex(st, index);
  }

  getKey<T>(st: { [key: string]: T }, index: string) {
    return this.system.safeIndex(st, index);
  }

  getRange<T>(st: Array<T>, index1: number, index2: number) {
    const list = st.slice(index1, index2);
    (list as unknown as hasHiddenType)._type = "ImmutableList";
    return list;
  }

  with<T>(list: Array<T>, index: number, value: T) {
    const newList = [...list];
    newList[index] = value;
    (newList as unknown as hasHiddenType)._type = "ImmutableList";
    return newList;
  }

  withInsert<T>(list: Array<T>, index: number, value: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 0, value);
    (newList as unknown as hasHiddenType)._type = "ImmutableList";
    return newList;
  }

  insert<T>(list: Array<T>, index: number, value: T) {
    list.splice(index, 0, value);
  }

  withRemove<T>(list: Array<T>, index: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 1);
    (newList as unknown as hasHiddenType)._type = "ImmutableList";
    return newList;
  }

  // custom impl
  elanIndexOf<T>(list: T[], elem: T) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (this.system.equals(item, elem)) {
        return i;
      }
    }
    return -1;
  }

  withRemoveFirst<T>(list: Array<T>, value: T) {
    let newList = [...list];
    const index = this.elanIndexOf(newList, value);
    if (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
    }
    (newList as unknown as hasHiddenType)._type = "ImmutableList";
    return newList;
  }

  withRemoveAll<T>(list: Array<T>, value: T) {
    let newList = [...list];
    let index = this.elanIndexOf(newList, value);
    while (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
      index = this.elanIndexOf(newList, value);
    }
    (newList as unknown as hasHiddenType)._type = "ImmutableList";
    return newList;
  }

  remove<T>(list: Array<T>, index: number) {
    list.splice(index, 1);
  }

  removeFirst<T>(list: Array<T>, value: T) {
    const index = this.elanIndexOf(list, value);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  removeAll<T>(list: Array<T>, value: T) {
    let index = this.elanIndexOf(list, value);
    while (index > -1) {
      list.splice(index, 1);
      index = this.elanIndexOf(list, value);
    }
  }

  add<T>(list: Array<T>, value: T) {
    list.push(value);
  }

  withKey<T>(dict: { [key: string]: T }, key: string, value: T) {
    const newDict = { ...dict };
    newDict[key] = value;
    (newDict as unknown as hasHiddenType)._type = "ImmutableDictionary";
    return newDict;
  }

  first<T>(st: Array<T>) {
    return this.system.safeIndex(st, 0);
  }

  second<T>(st: Array<T>) {
    return this.system.safeIndex(st, 1);
  }

  indexOf(s1: string, s2: string) {
    return s1.indexOf(s2);
  }

  trim(s: string): string {
    return s.trim();
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
  round(n: number, places: number) {
    const shift = 10 ** places;
    return Math.floor(n * shift + 0.5) / shift;
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
    const i = this.elanIndexOf(mm, max);
    return source[i];
  }

  min(source: number[]): number {
    return Math.min(...source);
  }

  minBy<T>(source: T[], predicate: (value: T) => number): T {
    const mm = source.map(predicate);
    const min = Math.min(...mm);
    const i = this.elanIndexOf(mm, min);
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
        result[i] = this.asImmutableList([i]);
      }
    }
  }

  contains(source: string[], substr: string) {
    return source.includes(substr);
  }

  pause(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }

  clock(): number {
    return new Date().getTime();
  }

  random(): number {
    return Math.random();
  }

  randomInt(low: number, high: number): number {
    return Math.floor(Math.random() * high) + low;
  }

  parseAsFloat(s: string): [boolean, number] {
    const f = parseFloat(s);
    if (Number.isFinite(f)) {
      return [true, f];
    }
    return [false, 0];
  }

  parseAsInt(s: string): [boolean, number] {
    const [b, f] = this.parseAsFloat(s);
    return [b, Math.floor(f)];
  }

  clearConsole() {
    this.system.elanInputOutput.clearConsole();
  }
  // charmapped display

  xSize = 40;
  ySize = 30;

  idx(x: number, y: number) {
    return x * this.ySize + y;
  }

  initialisedCharMap(foreground: integer, background: integer) {
    const emptyMap: CharMap = [];
    const emptyLocation: Location = ["", foreground, background];

    for (let x = 0; x < this.xSize; x++) {
      for (let y = 0; y < this.ySize; y++) {
        emptyMap.push(emptyLocation);
      }
    }

    return emptyMap;
  }

  putAt(map: CharMap, x: number, y: number, l: Location): CharMap {
    const newMap = this.system.immutableList([...map]);
    newMap[this.idx(x, y)] = l;
    return newMap;
  }

  getAt(map: CharMap, x: number, y: number) {
    return this.system.safeIndex(map, this.idx(x, y));
  }

  putChar(map: CharMap, x: number, y: number, c: string) {
    const [, f, b] = this.getAt(map, x, y);
    return this.putAt(map, x, y, [c, f, b]);
  }

  getChar(map: CharMap, x: number, y: number) {
    return this.system.safeIndex(this.getAt(map, x, y), 0);
  }

  putForeground(map: CharMap, x: number, y: number, f: number) {
    const [c, , b] = this.getAt(map, x, y);
    return this.putAt(map, x, y, [c, f, b]);
  }

  getForeground(map: CharMap, x: number, y: number) {
    return this.system.safeIndex(this.getAt(map, x, y), 1);
  }

  putBackground(map: CharMap, x: number, y: number, b: number) {
    const [c, f] = this.getAt(map, x, y);
    return this.putAt(map, x, y, [c, f, b]);
  }

  getBackground(map: CharMap, x: number, y: number) {
    return this.system.safeIndex(this.getAt(map, x, y), 2);
  }

  clearGraphics() {
    this.system.elanInputOutput.clearGraphics();
  }

  drawAsGraphics(map: CharMap) {
    let rendered = "";

    for (let y = 0; y < this.ySize; y++) {
      for (let x = 0; x < this.xSize; x++) {
        const [c, f, b] = this.getAt(map, x, y);
        rendered = `${rendered}<div style="color:${this.asHex(f)};background-color:${this.asHex(b)};">${c}</div>`;
      }
    }
    this.system.elanInputOutput.drawGraphics(rendered);
  }

  private asHex(n: number): string {
    const h = "000000" + n.toString(16);
    const h6 = h.substring(h.length - 6);
    return `#${h6}`;
  }

  getKeystroke(): string {
    return this.system.elanInputOutput.getKeystroke();
  }

  getKeystrokeWithModifier() {
    return this.system.tuple(this.system.elanInputOutput.getKeystrokeWithModifier());
  }

  clearKeyBuffer() {
    this.system.elanInputOutput.clearKeyBuffer();
  }

  initialise2DArrayList<T>(toInit: T[][], x: number, y: number, value: T) {
    toInit.length = x;

    for (let i = 0; i < x; i++) {
      const subArr = [];
      for (let j = 0; j < y; j++) {
        subArr[j] = value;
      }
      toInit[i] = subArr;
    }
  }
}

import { integer } from "vscode-languageclient";
import { ElanRuntimeError } from "./elan-runtime-error";
import { hasHiddenType } from "./has-hidden-type";
import { System } from "./system";

type Location = [string, number, number];
type Graphics = Location[];

export class StdLib {
  constructor(private readonly system: System) {}

  isValueType<T>(v: T) {
    return typeof v === "boolean" || typeof v === "string" || typeof v === "number";
  }

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
    (seq as unknown as hasHiddenType)._type = "Iter";
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

  insertAt<T>(list: Array<T>, index: number, value: T) {
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

  removeAt<T>(list: Array<T>, index: number) {
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

  first<T, T1>(st: [T, T1]) : T {
    return this.system.safeIndex(st, 0);
  }

  second<T, T1>(st: [T, T1]) : T1 {
    return this.system.safeIndex(st, 1);
  }

  third<T, T1, T2>(st: [T, T1]) : T2 {
    return this.system.safeIndex(st, 2);
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

  sortBy<T>(source: T[], predicate: (a: T, b: T) => number): T[] {
    const clone = [...source];
    return this.asIter(clone.sort(predicate));
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

  print(s: string) {
    this.system.elanInputOutput.print(s);
  }
  printTab(position: number, s: string) {
    this.system.elanInputOutput.printTab(position, s);
  }

  clearConsole() {
    this.system.elanInputOutput.clearConsole();
  }
  // Graphicsped display

  xSize = 40;
  ySize = 30;

  GraphicsLength = this.xSize * this.ySize;

  idx(x: number, y: number) {
    if (x < 0 || x >= this.xSize || y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`Out of range index`);
    }
    return x * this.ySize + y;
  }

  initialisedGraphics(c: string, foreground: integer, background: integer) {
    const emptyMap: Graphics = [];
    const emptyLocation: Location = this.system.tuple([c, foreground, background]) as Location;
    for (let x = 0; x < this.xSize; x++) {
      for (let y = 0; y < this.ySize; y++) {
        emptyMap.push(emptyLocation);
      }
    }
    return emptyMap;
  }

  ensureInitialised(cm: Graphics): Graphics {
    if (cm.length === this.GraphicsLength) {
      return cm;
    } else {
      return this.initialisedGraphics("", 0, 0xffffff);
    }
  }

  putAt(
    map: Graphics,
    x: number,
    y: number,
    char: string,
    foreground: integer,
    background: integer,
  ): Graphics {
    const cm = this.ensureInitialised(map);
    cm[this.idx(x, y)] = this.system.tuple([char, foreground, background]) as Location;
    return cm;
  }

  getAt(map: Graphics, x: number, y: number) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(cm, this.idx(x, y));
  }

  putChar(map: Graphics, x: number, y: number, c: string) {
    const cm = this.ensureInitialised(map);
    const [, f, b] = this.getAt(cm, x, y);
    return this.putAt(cm, x, y, c[0], f, b);
  }

  putString(
    map: Graphics,
    x: number,
    y: number,
    text: string,
    foreground: number,
    background: number,
  ) {
    let cm = this.ensureInitialised(map);
    for (let i = 0; i < text.length; i++) {
      if (x + i < this.xSize) {
        cm = this.putAt(cm, x + i, y, text[i], foreground, background);
      } else {
        const newX = (x + i) % this.xSize;
        const newY = (y + this.floor((x + i) / this.xSize)) % this.ySize;
        cm = this.putAt(cm, newX, newY, text[i], foreground, background);
      }
    }
    return cm;
  }

  getChar(map: Graphics, x: number, y: number) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getAt(cm, x, y), 0);
  }

  putForeground(map: Graphics, x: number, y: number, f: number) {
    const cm = this.ensureInitialised(map);
    const [c, , b] = this.getAt(map, x, y);
    return this.putAt(cm, x, y, c, f, b);
  }

  getForeground(map: Graphics, x: number, y: number) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getAt(cm, x, y), 1);
  }

  putBackground(map: Graphics, x: number, y: number, b: number) {
    const cm = this.ensureInitialised(map);
    const [c, f] = this.getAt(cm, x, y);
    return this.putAt(cm, x, y, c, f, b);
  }

  getBackground(map: Graphics, x: number, y: number) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getAt(cm, x, y), 2);
  }

  fill(map: Graphics, c: string, f: number, b: number): Graphics {
    return this.initialisedGraphics(c, f, b);
  }

  clearGraphics(map: Graphics) {
    this.system.elanInputOutput.clearGraphics();
  }

  draw(map: Graphics) {
    const cm = this.ensureInitialised(map);
    let rendered = "";

    for (let y = 0; y < this.ySize; y++) {
      for (let x = 0; x < this.xSize; x++) {
        const [c, f, b] = this.getAt(cm, x, y);
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

  getKeystroke(map: Graphics): string {
    return this.system.elanInputOutput.getKeystroke();
  }

  getKeystrokeWithModifier(map: Graphics) {
    return this.system.tuple(this.system.elanInputOutput.getKeystrokeWithModifier());
  }

  clearKeyBuffer(map: Graphics) {
    this.system.elanInputOutput.clearKeyBuffer();
  }

  createArray<T>(x: number, value: T) {
    if (!this.isValueType(value)) {
      throw new ElanRuntimeError(
        `Can only create array with simple value, not: ${this.asString(value)}`,
      );
    }

    const toInit = this.system.array([]);
    toInit.length = x;

    for (let i = 0; i < x; i++) {
      toInit[i] = value;
    }

    return toInit;
  }

  create2DArray<T>(x: number, y: number, value: T) {
    if (!this.isValueType(value)) {
      throw new ElanRuntimeError(
        `Can only initialise array with simple value, not: ${this.asString(value)}`,
      );
    }

    const toInit = this.system.array([]);
    toInit.length = x;

    for (let i = 0; i < x; i++) {
      const subArr = this.system.array([]);
      subArr.length = y;
      for (let j = 0; j < y; j++) {
        subArr[j] = value;
      }
      toInit[i] = subArr;
    }
    return toInit;
  }

  //Input functions
  prompt(prompt: string) {
    this.print(prompt);
  }

  inputString(prompt: string): Promise<string> {
    this.prompt(prompt);
    return this.system.input();
  }

  inputStringWithLimits(prompt: string, minLength: number, maxLength: number): Promise<string> {
    this.prompt(prompt);
    return this.system.input().then((s) => {
      if (s.length < minLength) {
        this.system.printLine(`minimum length ${minLength} characters`);
      } else if (s.length > maxLength) {
        this.system.printLine(`maximum length ${maxLength} characters`);
      } else {
        return s;
      }
      return this.inputStringWithLimits(prompt, minLength, maxLength);
    });
  }

  inputStringFromOptions(prompt: string, options: string[]): Promise<string> {
    this.prompt(prompt);
    return this.system.input().then((s) => {
      if (options.includes(s)) {
        return s;
      } else {
        this.system.printLine(`response must be one of ${options}`);
      }
      return this.inputStringFromOptions(prompt, options);
    });
  }

  inputInt(prompt: string): Promise<number> {
    this.prompt(prompt);
    return this.system.input().then((s) => {
      const [b, i] = this.parseAsInt(s);

      if (b) {
        return i;
      } else {
        this.system.printLine("not an Int");
      }

      return this.inputInt(prompt);
    });
  }

  inputIntBetween(prompt: string, min: number, max: number): Promise<number> {
    this.prompt(prompt);
    return this.system.input().then((s) => {
      const [b, i] = this.parseAsInt(s);
      if (b && i >= min && i <= max) {
        return i;
      } else {
        this.system.printLine(`must be an Int between ${min} and ${max} inclusive`);
      }
      return this.inputIntBetween(prompt, min, max);
    });
  }

  inputFloat(prompt: string): Promise<number> {
    this.prompt(prompt);
    return this.system.input().then((s) => {
      const [b, i] = this.parseAsFloat(s);

      if (b) {
        return i;
      } else {
        this.system.printLine("not a Float");
      }

      return this.inputFloat(prompt);
    });
  }

  inputFloatBetween(prompt: string, min: number, max: number): Promise<number> {
    this.prompt(prompt);
    return this.system.input().then((s) => {
      const [b, i] = this.parseAsFloat(s);
      if (b && i >= min && i <= max) {
        return i;
      } else {
        this.system.printLine(`must be a Float between ${min} and ${max} inclusive`);
      }
      return this.inputFloatBetween(prompt, min, max);
    });
  }
  //Math
  pi = Math.PI;

  abs = Math.abs;
  // Returns the absolute value of the input.

  acos = Math.acos;
  // Returns the arccosine of the input.

  acosDeg(n: number) {
    return this.radToDeg(this.acos(n));
  }

  asin = Math.asin;
  // Returns the arcsine of the input.

  asinDeg(n: number) {
    return this.radToDeg(this.asin(n));
  }

  atan = Math.atan;
  // Returns the arctangent of the input.

  atanDeg(n: number) {
    return this.radToDeg(this.atan(n));
  }

  cos = Math.cos;
  // Returns the cosine of the input.

  cosDeg(n: number) {
    return this.cos(this.degToRad(n));
  }

  exp = Math.exp;
  // Returns ex, where x is the argument, and e is Euler's number (2.718…, the base of the natural logarithm).

  logE = Math.log;
  // Returns the natural logarithm (㏒e; also, ㏑) of the input.

  log10 = Math.log10;
  // Returns the base-10 logarithm of the input.

  log2 = Math.log2;
  // Returns the base-2 logarithm of the input.

  sin = Math.sin;
  // Returns the sine of the input.

  sinDeg(n: number) {
    return this.sin(this.degToRad(n));
  }
  sqrt = Math.sqrt;
  // Returns the positive square root of the input.

  tan = Math.tan;
  // Returns the tangent of the input.

  tanDeg(n: number) {
    return this.tan(this.degToRad(n));
  }

  degToRad(d: number) {
    return (d * this.pi) / 180;
  }
  radToDeg(r: number) {
    return (r / this.pi) * 180;
  }
}

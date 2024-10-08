import "reflect-metadata";
import { ElanRuntimeError } from "./elan-runtime-error";
import {
  ElanFunctionDescriptor,
  elanIgnore,
  elanMethod,
  elanType,
  ElanTypeDescriptor,
} from "./elan-type-annotations";
import { hasHiddenType } from "./has-hidden-type";
import { StubInputOutput } from "./stub-input-output";
import { System } from "./system";

type Location = [string, number, number];
type BlockGraphics = Location[];
type File = [number, string, number]; // open/closed, read/write, contents, pointer

export class StdLib {
  constructor() {
    this.system = new System(new StubInputOutput());
  }

  system: System;

  @elanIgnore
  isValueType<T>(v: T) {
    return typeof v === "boolean" || typeof v === "string" || typeof v === "number";
  }

  @elanIgnore
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

    if (v instanceof RegExp) {
      return "A Regex";
    }

    if (Array.isArray(v)) {
      const type = (v as unknown as hasHiddenType)._type;

      switch (type) {
        case "List":
          return `{${v.map((i) => this.asString(i)).join(", ")}}`;
        case "Tuple":
          return `(${v.map((i) => this.asString(i)).join(", ")})`;
        case "Array":
          return `[${v.map((i) => this.asString(i)).join(", ")}]`;
        case "Iterable":
          return `an Iterable`;
        default:
          return v.toString();
      }
    }

    if (typeof v === "object" && "asString" in v) {
      return (v.asString as () => string)();
    }

    if (typeof v === "object" && v.constructor.name === "Object") {
      const type = (v as unknown as hasHiddenType)._type;
      const [pf, sf] = type === "Dictionary" ? ["[", "]"] : ["{", "}"];

      const items = Object.getOwnPropertyNames(v).filter((s) => s !== "_type");
      const o = v as { [key: string]: object };
      return `${pf}${items.map((n) => `${n}:${this.asString(o[n])}`).join(", ")}${sf}`;
    }

    if (typeof v === "object") {
      return `a ${v.constructor.name}`;
    }

    if (typeof v === "function") {
      return `function ${v.name}`;
    }

    throw new Error("Not implemented: " + typeof v);
  }

  @elanMethod(new ElanFunctionDescriptor())
  stringForUnicode(@elanType(new ElanTypeDescriptor("Int")) n: number): string {
    return String.fromCharCode(n);
  }

  @elanIgnore
  asUnicode(s: string): number {
    return s.charCodeAt(0);
  }

  @elanIgnore
  asArray<T>(list: T[]): T[] {
    const arr = [...list];
    (arr as unknown as hasHiddenType)._type = "Array";
    return arr;
  }

  @elanIgnore
  asList<T>(arr: T[]): T[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "List";
    return list;
  }

  @elanIgnore
  range(start: number, end: number): number[] {
    const seq = [];
    for (let i = start; i <= end; i++) {
      seq.push(i);
    }
    (seq as unknown as hasHiddenType)._type = "Iterable";
    return seq;
  }

  @elanIgnore
  asIter<T>(arr: T[]): T[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "Iterable";
    return list as T[];
  }

  @elanIgnore
  head<T>(arr: T[]): T {
    return this.system.safeIndex(arr, 0);
  }

  @elanIgnore
  keys<T>(dict: { [key: string]: T }): string[] {
    const lst = Object.getOwnPropertyNames(dict).filter((s) => s !== "_type");
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanIgnore
  values<T>(dict: { [key: string]: T }): T[] {
    const lst = this.keys(dict).map((k) => dict[k]);
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanIgnore
  hasKey<T>(dict: { [key: string]: T }, key: string): boolean {
    return this.keys(dict).includes(key);
  }

  @elanIgnore
  withRemoveAtKey<T>(dict: { [key: string]: T }, key: string) {
    const newDict = { ...dict };
    (newDict as unknown as hasHiddenType)._type = (dict as unknown as hasHiddenType)._type;
    delete newDict[key];
    return newDict;
  }

  @elanIgnore
  removeAtKey<T>(dict: { [key: string]: T }, key: string) {
    delete dict[key];
  }

  @elanIgnore
  length<T>(coll: string | T[] | { [key: string]: T }) {
    if (typeof coll === "string") {
      return coll.length;
    }
    if (Array.isArray(coll)) {
      return coll.length;
    }
    return this.keys(coll).length;
  }

  @elanIgnore
  upperCase(s1: string): string {
    return s1.toUpperCase();
  }

  @elanIgnore
  lowerCase(s1: string): string {
    return s1.toLowerCase();
  }

  @elanIgnore
  isBefore(s1: string, s2: string) {
    return s1 < s2;
  }

  @elanIgnore
  isAfter(s1: string, s2: string) {
    return s1 > s2;
  }

  @elanIgnore
  isAfterOrSameAs(s1: string, s2: string) {
    return s1 > s2 || s1 === s2;
  }

  @elanIgnore
  isBeforeOrSameAs(s1: string, s2: string) {
    return s1 < s2 || s1 === s2;
  }

  @elanIgnore
  withPutAt<T>(list: Array<T>, index: number, value: T) {
    const newList = [...list];
    newList[index] = value;
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanIgnore
  putAt<T>(list: Array<T>, index: number, value: T) {
    this.system.safeArraySet(list, index, value);
  }

  @elanIgnore
  putAt2D<T>(list: Array<Array<T>>, col: number, row: number, value: T) {
    this.system.safeArraySet(list[col], row, value);
  }

  @elanIgnore
  putAtKey<T>(dict: { [key: string]: T }, key: string, value: T) {
    this.system.safeDictionarySet(dict, key, value);
  }

  @elanIgnore
  withInsert<T>(list: Array<T>, index: number, value: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 0, value);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanIgnore
  insertAt<T>(list: Array<T>, index: number, value: T) {
    list.splice(index, 0, value);
  }

  // custom impl
  @elanIgnore
  elanIndexOf<T>(list: T[], elem: T) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (this.system.equals(item, elem)) {
        return i;
      }
    }
    return -1;
  }

  @elanIgnore
  withRemoveAt<T>(list: Array<T>, index: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 1);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanIgnore
  withRemoveFirst<T>(list: Array<T>, value: T) {
    let newList = [...list];
    const index = this.elanIndexOf(newList, value);
    if (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
    }
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanIgnore
  withRemoveAll<T>(list: Array<T>, value: T) {
    let newList = [...list];
    let index = this.elanIndexOf(newList, value);
    while (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
      index = this.elanIndexOf(newList, value);
    }
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanIgnore
  removeAt<T>(list: Array<T>, index: number) {
    list.splice(index, 1);
  }

  @elanIgnore
  removeFirst<T>(list: Array<T>, value: T) {
    const index = this.elanIndexOf(list, value);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  @elanIgnore
  removeAll<T>(list: Array<T>, value: T) {
    let index = this.elanIndexOf(list, value);
    while (index > -1) {
      list.splice(index, 1);
      index = this.elanIndexOf(list, value);
    }
  }

  @elanIgnore
  append<T>(list: Array<T>, value: T) {
    list.push(value);
  }

  @elanIgnore
  appendList<T>(list: Array<T>, listB: Array<T>) {
    list.push(...listB);
  }

  @elanIgnore
  prepend<T>(list: Array<T>, value: T) {
    list.unshift(value);
  }

  @elanIgnore
  prependList<T>(list: Array<T>, listB: Array<T>) {
    list.unshift(...listB);
  }

  @elanIgnore
  withPutAtKey<T>(dict: { [key: string]: T }, key: string, value: T) {
    const newDict = { ...dict };
    newDict[key] = value;
    (newDict as unknown as hasHiddenType)._type = "ImmutableDictionary";
    return newDict;
  }

  @elanIgnore
  first<T, T1>(st: [T, T1]): T {
    return this.system.safeIndex(st, 0);
  }

  @elanIgnore
  second<T, T1>(st: [T, T1]): T1 {
    return this.system.safeIndex(st, 1);
  }

  @elanIgnore
  third<T, T1, T2>(st: [T, T1, T2]): T2 {
    return this.system.safeIndex(st, 2);
  }

  @elanIgnore
  indexOf(s1: string, s2: string) {
    return s1.indexOf(s2);
  }

  @elanIgnore
  trim(s: string): string {
    return s.trim();
  }

  @elanIgnore
  floor(n: number) {
    return Math.floor(n);
  }

  @elanIgnore
  round(n: number, places: number) {
    const shift = 10 ** places;
    return Math.floor(n * shift + 0.5) / shift;
  }

  @elanIgnore
  ceiling(n: number) {
    const fl = this.floor(n);
    return n > fl ? fl + 1 : fl;
  }

  @elanIgnore
  typeAndProperties(o: { [key: string]: object }) {
    const type = o.constructor.name;
    const items = Object.getOwnPropertyNames(o);
    return `${type} [${items.map((n) => `"${n}":${o[n]}`).join(", ")}]`;
  }

  @elanIgnore
  filter<T>(source: T[] | string, predicate: (value: T | string) => boolean): (T | string)[] {
    const list = typeof source === "string" ? source.split("") : [...source];
    return this.asIter(list.filter(predicate));
  }

  @elanIgnore
  map<T, U>(source: T[] | string, predicate: (value: T | string) => U) {
    const list = typeof source === "string" ? source.split("") : [...source];
    return this.asIter(list.map(predicate));
  }

  @elanIgnore
  reduce<T, U>(source: T[] | string, initValue: U, predicate: (s: U, value: T | string) => U): U {
    const list = typeof source === "string" ? source.split("") : [...source];
    return list.reduce(predicate, initValue);
  }

  @elanIgnore
  max(source: number[]): number {
    return Math.max(...source);
  }

  @elanIgnore
  maxBy<T>(source: T[], predicate: (value: T) => number): T {
    const mm = source.map(predicate);
    const max = Math.max(...mm);
    const i = this.elanIndexOf(mm, max);
    return source[i];
  }

  @elanIgnore
  min(source: number[]): number {
    return Math.min(...source);
  }

  @elanIgnore
  minBy<T>(source: T[], predicate: (value: T) => number): T {
    const mm = source.map(predicate);
    const min = Math.min(...mm);
    const i = this.elanIndexOf(mm, min);
    return source[i];
  }

  @elanIgnore
  sortBy<T>(source: T[], predicate: (a: T, b: T) => number): T[] {
    const clone = [...source];
    return this.asIter(clone.sort(predicate));
  }

  @elanIgnore
  any<T>(source: T[], predicate: (value: T) => boolean) {
    return source.some(predicate);
  }

  @elanIgnore
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

  @elanIgnore
  contains<T>(source: T[], item: T): boolean {
    return source.includes(item);
  }

  @elanIgnore
  pause(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }

  @elanIgnore
  clock(): number {
    return new Date().getTime();
  }

  @elanIgnore
  random(): number {
    return Math.random();
  }

  @elanIgnore
  randomInt(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low + 1)) + low;
  }

  @elanIgnore
  parseAsFloat(s: string): [boolean, number] {
    const f = parseFloat(s);
    if (Number.isFinite(f)) {
      return [true, f];
    }
    return [false, 0];
  }

  @elanIgnore
  parseAsInt(s: string): [boolean, number] {
    const [b, f] = this.parseAsFloat(s);
    return [b, Math.floor(f)];
  }

  @elanIgnore
  print(s: string) {
    this.system.elanInputOutput.print(s);
  }

  @elanIgnore
  printTab(position: number, s: string) {
    this.system.elanInputOutput.printTab(position, s);
  }

  @elanIgnore
  clearConsole() {
    this.system.elanInputOutput.clearConsole();
  }
  // Graphicsped display

  xSize = 40;
  ySize = 30;

  GraphicsLength = this.xSize * this.ySize;

  @elanIgnore
  idx(x: number, y: number) {
    if (x < 0 || x >= this.xSize || y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`Out of range index`);
    }
    return x * this.ySize + y;
  }

  @elanIgnore
  initialisedGraphics(background: number) {
    const emptyMap: BlockGraphics = [];
    const emptyLocation: Location = this.system.tuple(["", 0x000000, background]) as Location;
    for (let x = 0; x < this.xSize; x++) {
      for (let y = 0; y < this.ySize; y++) {
        emptyMap.push(emptyLocation);
      }
    }
    return emptyMap;
  }

  @elanIgnore
  ensureInitialised(cm: BlockGraphics): BlockGraphics {
    if (cm.length === this.GraphicsLength) {
      return cm;
    } else {
      return this.initialisedGraphics(0xffffff);
    }
  }

  @elanIgnore
  private putDetails(
    map: BlockGraphics,
    x: number,
    y: number,
    char: string,
    foreground: number,
    background: number,
  ): BlockGraphics {
    const cm = this.ensureInitialised(map);
    cm[this.idx(x, y)] = this.system.tuple([char, foreground, background]) as Location;
    return cm;
  }

  @elanIgnore
  private getDetails(map: BlockGraphics, x: number, y: number) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(cm, this.idx(x, y));
  }

  @elanIgnore
  withBlock(map: BlockGraphics, x: number, y: number, b: number) {
    if (x < 0 || x >= this.xSize) {
      throw new ElanRuntimeError(`x value ${x} is outside range 0 to ${this.xSize - 1}`);
    }
    if (y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`y value ${y} is outside of range 0 to ${this.ySize - 1}`);
    }
    const cm = this.ensureInitialised(map);
    const [c, f] = this.getDetails(cm, x, y);
    return this.putDetails(cm, x, y, "", f, b);
  }

  @elanIgnore
  withUnicode(map: BlockGraphics, x: number, y: number, unicode: number, f: number, b: number) {
    if (x < 0 || x >= this.xSize) {
      throw new ElanRuntimeError(`x value ${x} is outside range 0 to ${this.xSize - 1}`);
    }
    if (y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`y value ${y} is outside of range 0 to ${this.ySize - 1}`);
    }
    const cm = this.ensureInitialised(map);
    const str = String.fromCharCode(unicode);
    return this.putDetails(cm, x, y, str, f, b);
  }

  @elanIgnore
  withText(
    map: BlockGraphics,
    x: number,
    y: number,
    text: string,
    foreground: number,
    background: number,
  ) {
    if (x < 0 || x >= this.xSize) {
      throw new ElanRuntimeError(`x value ${x} is outside range 0 to ${this.xSize - 1}`);
    }
    if (y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`y value ${y} is outside of range 0 to ${this.ySize - 1}`);
    }
    let cm = this.ensureInitialised(map);
    for (let i = 0; i < text.length; i++) {
      if (x + i < this.xSize) {
        cm = this.putDetails(cm, x + i, y, text[i], foreground, background);
      } else {
        const newX = (x + i) % this.xSize;
        const newY = (y + this.floor((x + i) / this.xSize)) % this.ySize;
        if (newY >= this.ySize) {
          throw new ElanRuntimeError(`'${text} is too long to fit from point ${x},${y} onwards'`);
        }
        cm = this.putDetails(cm, newX, newY, text[i], foreground, background);
      }
    }
    return cm;
  }

  @elanIgnore
  withBackground(map: BlockGraphics, b: number): BlockGraphics {
    return this.initialisedGraphics(b);
  }

  @elanIgnore
  getChar(map: BlockGraphics, x: number, y: number) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getDetails(cm, x, y), 0);
  }

  @elanIgnore
  getForeground(map: BlockGraphics, x: number, y: number) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getDetails(cm, x, y), 1);
  }

  @elanIgnore
  getBackground(map: BlockGraphics, x: number, y: number) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getDetails(cm, x, y), 2);
  }

  @elanIgnore
  clearGraphics(map: BlockGraphics) {
    this.system.elanInputOutput.clearGraphics();
  }

  @elanIgnore
  draw(map: BlockGraphics): Promise<void> {
    const cm = this.ensureInitialised(map);
    let rendered = "";

    for (let y = 0; y < this.ySize; y++) {
      for (let x = 0; x < this.xSize; x++) {
        const [c, f, b] = this.getDetails(cm, x, y);
        rendered = `${rendered}<div style="color:${this.asHex(f)};background-color:${this.asHex(b)};">${c}</div>`;
      }
    }
    this.system.elanInputOutput.drawGraphics(rendered);
    return this.pause(0);
  }

  @elanIgnore
  private asHex(n: number): string {
    const h = "000000" + n.toString(16);
    const h6 = h.substring(h.length - 6);
    return `#${h6}`;
  }

  @elanIgnore
  getKeystroke(map: BlockGraphics): Promise<string> {
    return this.system.elanInputOutput.getKeystroke();
  }

  @elanIgnore
  getKeystrokeWithModifier(map: BlockGraphics): Promise<[string, string]> {
    return this.system.elanInputOutput.getKeystrokeWithModifier();
  }

  @elanIgnore
  clearKeyBuffer(map: BlockGraphics) {
    this.system.elanInputOutput.clearKeyBuffer();
  }

  @elanIgnore
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

  @elanIgnore
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
  @elanIgnore
  prompt(prompt: string) {
    this.print(prompt);
  }

  @elanIgnore
  inputString(prompt: string): Promise<string> {
    this.prompt(prompt);
    return this.system.input();
  }

  @elanIgnore
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

  @elanIgnore
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

  @elanIgnore
  inputInt(prompt: string): Promise<number> {
    this.prompt(prompt);
    return this.system.input().then((s) => {
      const [b, i] = this.parseAsInt(s);

      if (b && i.toString() === s) {
        return i;
      } else {
        this.system.printLine("must be an integer");
      }

      return this.inputInt(prompt);
    });
  }

  @elanIgnore
  inputIntBetween(prompt: string, min: number, max: number): Promise<number> {
    this.prompt(prompt);
    return this.system.input().then((s) => {
      const [b, i] = this.parseAsInt(s);
      if (b && i.toString() === s && i >= min && i <= max) {
        return i;
      } else {
        this.system.printLine(`must be an integer between ${min} and ${max} inclusive`);
      }
      return this.inputIntBetween(prompt, min, max);
    });
  }

  @elanIgnore
  inputFloat(prompt: string): Promise<number> {
    this.prompt(prompt);
    return this.system.input().then((s) => {
      const [b, i] = this.parseAsFloat(s);

      if (b) {
        return i;
      } else {
        this.system.printLine("not a number");
      }

      return this.inputFloat(prompt);
    });
  }

  @elanIgnore
  inputFloatBetween(prompt: string, min: number, max: number): Promise<number> {
    this.prompt(prompt);
    return this.system.input().then((s) => {
      const [b, i] = this.parseAsFloat(s);
      if (b && i >= min && i <= max) {
        return i;
      } else {
        this.system.printLine(`must be a number between ${min} and ${max} inclusive`);
      }
      return this.inputFloatBetween(prompt, min, max);
    });
  }
  //Math
  pi = Math.PI;

  @elanMethod(new ElanFunctionDescriptor())
  abs(x: number): number {
    return Math.abs(x);
  }

  // Returns the absolute value of the input.

  @elanMethod(new ElanFunctionDescriptor())
  acos(x: number): number {
    return Math.acos(x);
  }
  // Returns the arccosine of the input.

  @elanMethod(new ElanFunctionDescriptor())
  acosDeg(n: number): number {
    return this.radToDeg(this.acos(n));
  }

  @elanMethod(new ElanFunctionDescriptor())
  asin(x: number): number {
    return Math.asin(x);
  }
  // Returns the arcsine of the input.

  @elanMethod(new ElanFunctionDescriptor())
  asinDeg(n: number): number {
    return this.radToDeg(this.asin(n));
  }

  @elanMethod(new ElanFunctionDescriptor())
  atan(x: number): number {
    return Math.atan(x);
  }
  // Returns the arctangent of the input.

  @elanMethod(new ElanFunctionDescriptor())
  atanDeg(n: number): number {
    return this.radToDeg(this.atan(n));
  }

  @elanMethod(new ElanFunctionDescriptor())
  cos(x: number): number {
    return Math.cos(x);
  }

  @elanMethod(new ElanFunctionDescriptor())
  cosDeg(n: number): number {
    return this.cos(this.degToRad(n));
  }

  @elanMethod(new ElanFunctionDescriptor())
  exp(x: number): number {
    return Math.exp(x);
  }
  // Returns ex, where x is the argument, and e is Euler's number (2.718…, the base of the natural logarithm).

  @elanMethod(new ElanFunctionDescriptor())
  logE(x: number): number {
    return Math.log(x);
  }
  // Returns the natural logarithm (㏒e; also, ㏑) of the input.

  @elanMethod(new ElanFunctionDescriptor())
  log10(x: number): number {
    return Math.log10(x);
  }
  // Returns the base-10 logarithm of the input.

  // Returns the base-2 logarithm of the input.

  @elanMethod(new ElanFunctionDescriptor())
  log2(x: number): number {
    return Math.log2(x);
  }

  @elanMethod(new ElanFunctionDescriptor())
  sin(x: number): number {
    return Math.sin(x);
  }
  // Returns the sine of the input.

  @elanMethod(new ElanFunctionDescriptor())
  sinDeg(n: number): number {
    return this.sin(this.degToRad(n));
  }

  @elanMethod(new ElanFunctionDescriptor())
  sqrt(x: number): number {
    return Math.sqrt(x);
  }
  // Returns the positive square root of the input.

  @elanMethod(new ElanFunctionDescriptor())
  tan(x: number): number {
    return Math.tan(x);
  }
  // Returns the tangent of the input.

  @elanMethod(new ElanFunctionDescriptor())
  tanDeg(n: number): number {
    return this.tan(this.degToRad(n));
  }

  @elanMethod(new ElanFunctionDescriptor())
  degToRad(d: number): number {
    return (d * this.pi) / 180;
  }

  @elanMethod(new ElanFunctionDescriptor())
  radToDeg(r: number): number {
    return (r / this.pi) * 180;
  }

  // Functional random
  // Credit for source of algorithm: https://www.codeproject.com/Articles/25172/Simple-Random-Number-Generation
  @elanIgnore
  next(current: [number, number]): [number, number] {
    const u = current[0];
    const v = current[1];
    const u2 = 36969 * this.lo16(u) + u / 65536;
    const v2 = 18000 * this.lo16(v) + v / 65536;
    return [u2, v2];
  }

  @elanIgnore
  value(current: [number, number]): number {
    const u = current[0];
    const v = current[1];
    return this.lo32(this.lo32(u * 65536) + v + 1) * 2.328306435454494e-10;
  }

  @elanIgnore
  lo32(n: number): number {
    return n % 4294967296;
  }

  @elanIgnore
  lo16(n: number): number {
    return n % 65536;
  }

  @elanIgnore
  hi16(n: number): number {
    return this.lo16(n / 65536);
  }

  @elanIgnore
  valueInt(current: [number, number], min: number, max: number): number {
    const float = this.value(current);
    return Math.floor(float * (max - min + 1) + min);
  }

  @elanIgnore
  firstRandomInFixedSequence(): [number, number] {
    return [521288629, 362436069];
  }

  @elanIgnore
  firstRandom(): [number, number] {
    const c = this.clock();
    return [this.hi16(c), this.lo16(c)];
  }
  // Standard colours

  black = 0x000000;
  grey = 0x808080;
  white = 0xffffff;
  red = 0xff0000;
  green = 0x008000;
  blue = 0x0000ff;
  yellow = 0xffff00;
  brown = 0xa52a2a;

  @elanIgnore
  bitAnd(a: number, b: number): number {
    return a & b;
  }

  @elanIgnore
  bitOr(a: number, b: number): number {
    return a | b;
  }

  @elanIgnore
  bitXor(a: number, b: number): number {
    return a ^ b;
  }

  @elanIgnore
  bitNot(a: number): number {
    return ~a;
  }

  @elanIgnore
  bitShiftL(a: number, shift: number): number {
    return a << shift;
  }

  @elanIgnore
  bitShiftR(a: number, shift: number): number {
    return a >>> shift;
  }

  @elanIgnore
  asBinary(a: number): string {
    return a.toString(2);
  }

  @elanIgnore
  matchesRegex(a: string, r: RegExp): boolean {
    return r.test(a);
  }
  //File operations
  @elanIgnore
  openRead(contents: string): File {
    return [1, contents, 0];
  }

  @elanIgnore
  readLine(file: File): string {
    const status = file[0];
    const contents = file[1];
    const pointer = file[2];
    if (status === 0) {
      throw new Error("File is not open");
    }
    if (status === 2) {
      throw new Error("File is open for writing, not reading");
    }
    let newline = contents.indexOf("\n", pointer);
    if (newline === -1) {
      newline = contents.length;
    }
    const line = contents.substring(pointer, newline);
    file[2] = newline + 1;
    return line;
  }

  @elanIgnore
  endOfFile(file: File): boolean {
    return file[2] >= file[1].length - 1;
  }

  @elanIgnore
  close(file: File): void {
    //Does nothing for now.
  }
}

import "reflect-metadata";
import { ElanCompilerError } from "./elan-compiler-error";
import { ElanRuntimeError } from "./elan-runtime-error";
import {
  ElanAbstractDictionary,
  ElanArray,
  elanArrayType,
  ElanBoolean,
  elanConstant,
  ElanDictionary,
  ElanFloat,
  ElanFunc,
  elanFunction,
  ElanImmutableDictionary,
  ElanInt,
  elanIntType,
  ElanIterable,
  elanIterableType,
  ElanList,
  elanListType,
  elanProcedure,
  ElanString,
  ElanT,
  ElanT1,
  ElanT2,
  ElanTU,
  ElanTuple,
  elanType,
  FunctionOptions,
  ProcedureOptions,
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

  // types

  @elanConstant(ElanList(ElanTuple([ElanString, ElanInt, ElanInt])))
  BlockGraphics = "";

  @elanConstant(ElanTuple([ElanInt, ElanInt]))
  Random = "";

  // Standard colours

  @elanConstant(ElanInt) black = 0x000000;
  @elanConstant(ElanInt) grey = 0x808080;
  @elanConstant(ElanInt) white = 0xffffff;
  @elanConstant(ElanInt) red = 0xff0000;
  @elanConstant(ElanInt) green = 0x008000;
  @elanConstant(ElanInt) blue = 0x0000ff;
  @elanConstant(ElanInt) yellow = 0xffff00;
  @elanConstant(ElanInt) brown = 0xa52a2a;

  private isValueType<T>(v: T) {
    return typeof v === "boolean" || typeof v === "string" || typeof v === "number";
  }

  @elanFunction(FunctionOptions.pureExtension)
  asString<T>(@elanType(ElanT) v: T | T[] | undefined): string {
    if (v === undefined || v === null) {
      throw new ElanRuntimeError(`Out of range error`);
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

    throw new ElanCompilerError("Not implemented: " + typeof v);
  }

  @elanFunction()
  stringForUnicode(@elanIntType() n: number): string {
    return String.fromCharCode(n);
  }

  @elanFunction(FunctionOptions.pureExtension)
  asUnicode(s: string): number {
    return s.charCodeAt(0);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanArray(ElanT))
  asArray<T>(@elanIterableType(ElanT) list: T[]): T[] {
    const arr = [...list];
    (arr as unknown as hasHiddenType)._type = "Array";
    return arr;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT))
  asList<T>(@elanIterableType(ElanT) arr: T[]): T[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "List";
    return list;
  }

  @elanFunction(FunctionOptions.pure, ElanIterable(ElanInt))
  range(@elanIntType() start: number, @elanIntType() end: number): number[] {
    const seq = [];
    for (let i = start; i <= end; i++) {
      seq.push(i);
    }
    (seq as unknown as hasHiddenType)._type = "Iterable";
    return seq;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanIterable(ElanT))
  asIter<T>(@elanIterableType(ElanT) arr: T[]): T[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "Iterable";
    return list as T[];
  }

  @elanFunction(FunctionOptions.pureExtension, ElanT)
  head<T>(@elanIterableType(ElanT) arr: T[]): T {
    return this.system.safeIndex(arr, 0);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT1))
  keys<T>(
    @elanType(ElanAbstractDictionary(ElanT1, ElanT2))
    dict: {
      [key: string]: T;
    },
  ): string[] {
    const lst = Object.getOwnPropertyNames(dict).filter((s) => s !== "_type");
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT2))
  values<T>(
    @elanType(ElanAbstractDictionary(ElanT1, ElanT2))
    dict: {
      [key: string]: T;
    },
  ): T[] {
    const lst = this.keys(dict).map((k) => dict[k]);
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanBoolean)
  hasKey<T>(
    @elanType(ElanAbstractDictionary(ElanT1, ElanT2))
    dict: { [key: string]: T },
    @elanType(ElanT1) key: string,
  ): boolean {
    return this.keys(dict).includes(key);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanImmutableDictionary(ElanT1, ElanT2))
  withRemoveAtKey<T>(
    @elanType(ElanImmutableDictionary(ElanT1, ElanT2))
    dict: { [key: string]: T },
    @elanType(ElanT1) key: string,
  ) {
    const newDict = { ...dict };
    (newDict as unknown as hasHiddenType)._type = (dict as unknown as hasHiddenType)._type;
    delete newDict[key];
    return newDict;
  }

  @elanProcedure(ProcedureOptions.extension)
  removeAtKey<T>(
    @elanType(ElanDictionary(ElanT1, ElanT2))
    dict: { [key: string]: T },
    @elanType(ElanT1) key: string,
  ) {
    delete dict[key];
  }

  @elanFunction(FunctionOptions.pureExtension, ElanInt)
  length<T>(
    @elanIterableType(ElanT)
    coll: string | T[] | { [key: string]: T },
  ) {
    if (typeof coll === "string") {
      return coll.length;
    }
    if (Array.isArray(coll)) {
      return coll.length;
    }
    return this.keys(coll).length;
  }

  @elanFunction(FunctionOptions.pureExtension)
  upperCase(s1: string): string {
    return s1.toUpperCase();
  }

  @elanFunction(FunctionOptions.pureExtension)
  lowerCase(s1: string): string {
    return s1.toLowerCase();
  }

  @elanFunction()
  isBefore(s1: string, s2: string): boolean {
    return s1 < s2;
  }

  @elanFunction()
  isAfter(s1: string, s2: string): boolean {
    return s1 > s2;
  }

  @elanFunction()
  isAfterOrSameAs(s1: string, s2: string): boolean {
    return s1 > s2 || s1 === s2;
  }

  @elanFunction()
  isBeforeOrSameAs(s1: string, s2: string): boolean {
    return s1 < s2 || s1 === s2;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT))
  withPutAt<T>(
    @elanListType(ElanT) list: Array<T>,
    @elanIntType() index: number,
    @elanType(ElanT) value: T,
  ) {
    const newList = [...list];
    newList[index] = value;
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanProcedure(ProcedureOptions.extension)
  putAt<T>(
    @elanArrayType(ElanT) list: Array<T>,
    @elanIntType() index: number,
    @elanType(ElanT) value: T,
  ) {
    this.system.safeArraySet(list, index, value);
  }

  @elanProcedure(ProcedureOptions.extension)
  putAt2D<T>(
    @elanArrayType(ElanArray(ElanT))
    list: Array<Array<T>>,
    @elanIntType() col: number,
    @elanIntType() row: number,
    @elanType(ElanT) value: T,
  ) {
    this.system.safeArraySet(list[col], row, value);
  }

  @elanProcedure(ProcedureOptions.extension)
  putAtKey<T>(
    @elanType(ElanDictionary(ElanT1, ElanT2))
    dict: { [key: string]: T },
    @elanType(ElanT1) key: string,
    @elanType(ElanT2) value: T,
  ) {
    this.system.safeDictionarySet(dict, key, value);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT))
  withInsert<T>(
    @elanListType(ElanT) list: Array<T>,
    @elanIntType() index: number,
    @elanType(ElanT) value: T,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 0, value);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanProcedure(ProcedureOptions.extension)
  insertAt<T>(
    @elanArrayType(ElanT) list: Array<T>,
    @elanIntType() index: number,
    @elanType(ElanT) value: T,
  ) {
    list.splice(index, 0, value);
  }

  // custom impl
  private elanIndexOf<T>(list: T[], elem: T) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (this.system.equals(item, elem)) {
        return i;
      }
    }
    return -1;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT))
  withRemoveAt<T>(@elanListType(ElanT) list: Array<T>, @elanIntType() index: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 1);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT))
  withRemoveFirst<T>(@elanListType(ElanT) list: Array<T>, @elanType(ElanT) value: T) {
    let newList = [...list];
    const index = this.elanIndexOf(newList, value);
    if (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
    }
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT))
  withRemoveAll<T>(@elanListType(ElanT) list: Array<T>, @elanType(ElanT) value: T) {
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

  @elanProcedure(ProcedureOptions.extension)
  removeAt<T>(@elanArrayType(ElanT) list: Array<T>, @elanIntType() index: number) {
    list.splice(index, 1);
  }

  @elanProcedure(ProcedureOptions.extension)
  removeFirst<T>(@elanArrayType(ElanT) list: Array<T>, @elanType(ElanT) value: T) {
    const index = this.elanIndexOf(list, value);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  @elanProcedure(ProcedureOptions.extension)
  removeAll<T>(@elanArrayType(ElanT) list: Array<T>, @elanType(ElanT) value: T) {
    let index = this.elanIndexOf(list, value);
    while (index > -1) {
      list.splice(index, 1);
      index = this.elanIndexOf(list, value);
    }
  }

  @elanProcedure(ProcedureOptions.extension)
  append<T>(@elanArrayType(ElanT) list: Array<T>, @elanType(ElanT) value: T) {
    list.push(value);
  }

  @elanProcedure(ProcedureOptions.extension)
  appendList<T>(@elanArrayType(ElanT) list: Array<T>, @elanArrayType(ElanT) listB: Array<T>) {
    list.push(...listB);
  }

  @elanProcedure(ProcedureOptions.extension)
  prepend<T>(@elanArrayType(ElanT) list: Array<T>, @elanType(ElanT) value: T) {
    list.unshift(value);
  }

  @elanProcedure(ProcedureOptions.extension)
  prependList<T>(@elanArrayType(ElanT) list: Array<T>, @elanArrayType(ElanT) listB: Array<T>) {
    list.unshift(...listB);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanImmutableDictionary(ElanT1, ElanT2))
  withPutAtKey<T>(
    @elanType(ElanImmutableDictionary(ElanT1, ElanT2))
    dict: { [key: string]: T },
    @elanType(ElanT1) key: string,
    @elanType(ElanT2) value: T,
  ) {
    const newDict = { ...dict };
    newDict[key] = value;
    (newDict as unknown as hasHiddenType)._type = "ImmutableDictionary";
    return newDict;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanInt)
  indexOf(s1: string, s2: string): number {
    return s1.indexOf(s2);
  }

  @elanFunction(FunctionOptions.pureExtension)
  trim(s: string): string {
    return s.trim();
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  floor(n: number) {
    return Math.floor(n);
  }

  @elanFunction()
  round(n: number, @elanIntType() places: number): number {
    const shift = 10 ** places;
    return Math.floor(n * shift + 0.5) / shift;
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  ceiling(n: number): number {
    const fl = this.floor(n);
    return n > fl ? fl + 1 : fl;
  }

  @elanFunction()
  typeAndProperties(@elanType(ElanT) o: { [key: string]: object }): string {
    const type = o.constructor.name;
    const items = Object.getOwnPropertyNames(o);
    return `${type} [${items.map((n) => `"${n}":${o[n]}`).join(", ")}]`;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanIterable(ElanT))
  filter<T>(
    @elanIterableType(ElanT)
    source: T[] | string,
    @elanType(ElanFunc([ElanT], ElanBoolean))
    predicate: (value: T | string) => boolean,
  ): (T | string)[] {
    const list = typeof source === "string" ? source.split("") : [...source];
    return this.asIter(list.filter(predicate));
  }

  @elanFunction(FunctionOptions.pureExtension, ElanIterable(ElanTU))
  map<T, U>(
    @elanIterableType(ElanT)
    source: T[] | string,
    @elanType(ElanFunc([ElanT], ElanTU))
    predicate: (value: T | string) => U,
  ) {
    const list = typeof source === "string" ? source.split("") : [...source];
    return this.asIter(list.map(predicate));
  }

  @elanFunction(FunctionOptions.pureExtension, ElanTU)
  reduce<T, U>(
    @elanIterableType(ElanT)
    source: T[] | string,
    @elanType(ElanTU) initValue: U,
    @elanType(ElanFunc([ElanTU, ElanT], ElanTU))
    predicate: (s: U, value: T | string) => U,
  ): U {
    const list = typeof source === "string" ? source.split("") : [...source];
    return list.reduce(predicate, initValue);
  }

  @elanFunction(FunctionOptions.pureExtension)
  max(@elanIterableType(ElanFloat) source: number[]): number {
    return Math.max(...source);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanT)
  maxBy<T>(
    @elanIterableType(ElanT) source: T[],
    @elanType(ElanFunc([ElanT], ElanFloat))
    predicate: (value: T) => number,
  ): T {
    const mm = source.map(predicate);
    const max = Math.max(...mm);
    const i = this.elanIndexOf(mm, max);
    return source[i];
  }

  @elanFunction(FunctionOptions.pureExtension)
  min(@elanIterableType(ElanFloat) source: number[]): number {
    return Math.min(...source);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanT)
  minBy<T>(
    @elanIterableType(ElanT) source: T[],
    @elanType(ElanFunc([ElanT], ElanFloat))
    predicate: (value: T) => number,
  ): T {
    const mm = source.map(predicate);
    const min = Math.min(...mm);
    const i = this.elanIndexOf(mm, min);
    return source[i];
  }

  @elanFunction(FunctionOptions.pureExtension, ElanIterable(ElanT))
  sortBy<T>(
    @elanIterableType(ElanT) source: T[],
    @elanType(ElanFunc([ElanT, ElanT], ElanInt))
    predicate: (a: T, b: T) => number,
  ): T[] {
    const clone = [...source];
    return this.asIter(clone.sort(predicate));
  }

  @elanFunction(FunctionOptions.pureExtension)
  any<T>(
    @elanIterableType(ElanT) source: T[],
    @elanType(ElanFunc([ElanT], ElanBoolean))
    predicate: (value: T) => boolean,
  ): boolean {
    return source.some(predicate);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanIterable(ElanTU))
  groupBy<T>(
    @elanIterableType(ElanT) source: T[],
    @elanType(ElanFunc([ElanT], ElanTU))
    predicate: (value: T) => T,
  ) {
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

  @elanFunction(FunctionOptions.pureExtension)
  contains<T>(@elanIterableType(ElanT) source: T[], @elanType(ElanT) item: T): boolean {
    return source.includes(item);
  }

  @elanProcedure(ProcedureOptions.async)
  pause(@elanIntType() ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }

  @elanFunction(FunctionOptions.impure, ElanInt)
  clock(): number {
    return new Date().getTime();
  }

  @elanFunction(FunctionOptions.impure)
  random(): number {
    return Math.random();
  }

  @elanFunction(FunctionOptions.impure, ElanInt)
  randomInt(@elanIntType() low: number, @elanIntType() high: number): number {
    return Math.floor(Math.random() * (high - low + 1)) + low;
  }

  @elanFunction(FunctionOptions.pure, ElanTuple([ElanBoolean, ElanFloat]))
  parseAsFloat(s: string): [boolean, number] {
    const f = parseFloat(s);
    if (Number.isFinite(f)) {
      return [true, f];
    }
    return [false, 0];
  }

  @elanFunction(FunctionOptions.pure, ElanTuple([ElanBoolean, ElanInt]))
  parseAsInt(s: string): [boolean, number] {
    const [b, f] = this.parseAsFloat(s);
    return [b, Math.floor(f)];
  }

  @elanProcedure()
  print(s: string) {
    this.system.elanInputOutput.print(s);
  }

  @elanProcedure()
  printTab(@elanIntType() position: number, s: string) {
    this.system.elanInputOutput.printTab(position, s);
  }

  @elanProcedure()
  clearConsole() {
    this.system.elanInputOutput.clearConsole();
  }
  // Graphicsped display

  xSize = 40;
  ySize = 30;

  GraphicsLength = this.xSize * this.ySize;

  private idx(x: number, y: number) {
    if (x < 0 || x >= this.xSize || y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`Out of range index`);
    }
    return x * this.ySize + y;
  }

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

  private ensureInitialised(cm: BlockGraphics): BlockGraphics {
    if (cm.length === this.GraphicsLength) {
      return cm;
    } else {
      return this.initialisedGraphics(0xffffff);
    }
  }

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

  private getDetails(map: BlockGraphics, x: number, y: number) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(cm, this.idx(x, y));
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanTuple([ElanString, ElanInt, ElanInt])))
  withBlock(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
    @elanIntType() x: number,
    @elanIntType() y: number,
    @elanIntType() b: number,
  ) {
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

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanTuple([ElanString, ElanInt, ElanInt])))
  withUnicode(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
    @elanIntType() x: number,
    @elanIntType() y: number,
    @elanIntType() unicode: number,
    @elanIntType() f: number,
    @elanIntType() b: number,
  ) {
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

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanTuple([ElanString, ElanInt, ElanInt])))
  withText(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
    @elanIntType() x: number,
    @elanIntType() y: number,
    text: string,
    @elanIntType() foreground: number,
    @elanIntType() background: number,
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

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanTuple([ElanString, ElanInt, ElanInt])))
  withBackground(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
    @elanIntType() b: number,
  ): BlockGraphics {
    return this.initialisedGraphics(b);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanTuple([ElanString, ElanInt, ElanInt])))
  getChar(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
    @elanIntType() x: number,
    @elanIntType() y: number,
  ) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getDetails(cm, x, y), 0);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanTuple([ElanString, ElanInt, ElanInt])))
  getForeground(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
    @elanIntType() x: number,
    @elanIntType() y: number,
  ) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getDetails(cm, x, y), 1);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanTuple([ElanString, ElanInt, ElanInt])))
  getBackground(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
    @elanIntType() x: number,
    @elanIntType() y: number,
  ) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getDetails(cm, x, y), 2);
  }

  @elanProcedure(ProcedureOptions.extension)
  clearGraphics(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
  ) {
    this.system.elanInputOutput.clearGraphics();
  }

  @elanProcedure(ProcedureOptions.asyncExtension)
  draw(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
  ): Promise<void> {
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

  private asHex(n: number): string {
    const h = "000000" + n.toString(16);
    const h6 = h.substring(h.length - 6);
    return `#${h6}`;
  }

  @elanFunction(FunctionOptions.impureAsyncExtension, ElanString)
  getKeystroke(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
  ): Promise<string> {
    return this.system.elanInputOutput.getKeystroke();
  }

  @elanFunction(FunctionOptions.impureAsyncExtension, ElanTuple([ElanString, ElanString]))
  getKeystrokeWithModifier(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
  ): Promise<[string, string]> {
    return this.system.elanInputOutput.getKeystrokeWithModifier();
  }

  @elanProcedure(ProcedureOptions.extension)
  clearKeyBuffer(
    @elanListType(ElanTuple([ElanString, ElanInt, ElanInt]))
    map: BlockGraphics,
  ) {
    this.system.elanInputOutput.clearKeyBuffer();
  }

  @elanFunction(FunctionOptions.pure, ElanArray(ElanT))
  createArray<T>(@elanIntType() x: number, @elanType(ElanT) value: T) {
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

  @elanFunction(FunctionOptions.pure, ElanArray(ElanArray(ElanT)))
  create2DArray<T>(@elanIntType() x: number, @elanIntType() y: number, @elanType(ElanT) value: T) {
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
  private prompt(prompt: string) {
    this.print(prompt);
  }

  @elanFunction(FunctionOptions.impureAsync, ElanString)
  inputString(prompt: string): Promise<string> {
    this.prompt(prompt);
    return this.system.input();
  }

  @elanFunction(FunctionOptions.impureAsync, ElanString)
  inputStringWithLimits(
    prompt: string,
    @elanIntType() minLength: number,
    @elanIntType() maxLength: number,
  ): Promise<string> {
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

  @elanFunction(FunctionOptions.impureAsync, ElanString)
  inputStringFromOptions(
    prompt: string,
    @elanArrayType(ElanString) options: string[],
  ): Promise<string> {
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

  @elanFunction(FunctionOptions.impureAsync, ElanInt)
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

  @elanFunction(FunctionOptions.impureAsync, ElanInt)
  inputIntBetween(
    prompt: string,
    @elanIntType() min: number,
    @elanIntType() max: number,
  ): Promise<number> {
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

  @elanFunction(FunctionOptions.impureAsync, ElanFloat)
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

  @elanFunction(FunctionOptions.impureAsync, ElanFloat)
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
  @elanConstant() pi: number = Math.PI;

  @elanFunction()
  abs(x: number): number {
    return Math.abs(x);
  }

  // Returns the absolute value of the input.

  @elanFunction()
  acos(x: number): number {
    return Math.acos(x);
  }
  // Returns the arccosine of the input.

  @elanFunction()
  acosDeg(n: number): number {
    return this.radToDeg(this.acos(n));
  }

  @elanFunction()
  asin(x: number): number {
    return Math.asin(x);
  }
  // Returns the arcsine of the input.

  @elanFunction()
  asinDeg(n: number): number {
    return this.radToDeg(this.asin(n));
  }

  @elanFunction()
  atan(x: number): number {
    return Math.atan(x);
  }
  // Returns the arctangent of the input.

  @elanFunction()
  atanDeg(n: number): number {
    return this.radToDeg(this.atan(n));
  }

  @elanFunction()
  cos(x: number): number {
    return Math.cos(x);
  }

  @elanFunction()
  cosDeg(n: number): number {
    return this.cos(this.degToRad(n));
  }

  @elanFunction()
  exp(x: number): number {
    return Math.exp(x);
  }
  // Returns ex, where x is the argument, and e is Euler's number (2.718…, the base of the natural logarithm).

  @elanFunction()
  logE(x: number): number {
    return Math.log(x);
  }
  // Returns the natural logarithm (㏒e; also, ㏑) of the input.

  @elanFunction()
  log10(x: number): number {
    return Math.log10(x);
  }
  // Returns the base-10 logarithm of the input.

  // Returns the base-2 logarithm of the input.

  @elanFunction()
  log2(x: number): number {
    return Math.log2(x);
  }

  @elanFunction()
  sin(x: number): number {
    return Math.sin(x);
  }
  // Returns the sine of the input.

  @elanFunction()
  sinDeg(n: number): number {
    return this.sin(this.degToRad(n));
  }

  @elanFunction()
  sqrt(x: number): number {
    return Math.sqrt(x);
  }
  // Returns the positive square root of the input.

  @elanFunction()
  tan(x: number): number {
    return Math.tan(x);
  }
  // Returns the tangent of the input.

  @elanFunction()
  tanDeg(n: number): number {
    return this.tan(this.degToRad(n));
  }

  @elanFunction()
  degToRad(d: number): number {
    return (d * this.pi) / 180;
  }

  @elanFunction()
  radToDeg(r: number): number {
    return (r / this.pi) * 180;
  }

  // Functional random
  // Credit for source of algorithm: https://www.codeproject.com/Articles/25172/Simple-Random-Number-Generation
  @elanFunction(FunctionOptions.pureExtension, ElanTuple([ElanInt, ElanInt]))
  next(@elanType(ElanTuple([ElanInt, ElanInt])) current: [number, number]): [number, number] {
    const u = current[0];
    const v = current[1];
    const u2 = 36969 * this.lo16(u) + u / 65536;
    const v2 = 18000 * this.lo16(v) + v / 65536;
    return [u2, v2];
  }

  @elanFunction(FunctionOptions.pureExtension, ElanFloat)
  value(@elanType(ElanTuple([ElanInt, ElanInt])) current: [number, number]): number {
    const u = current[0];
    const v = current[1];
    return this.lo32(this.lo32(u * 65536) + v + 1) * 2.328306435454494e-10;
  }

  private lo32(n: number): number {
    return n % 4294967296;
  }

  private lo16(n: number): number {
    return n % 65536;
  }

  private hi16(n: number): number {
    return this.lo16(n / 65536);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanInt)
  valueInt(
    @elanType(ElanTuple([ElanInt, ElanInt])) current: [number, number],
    @elanIntType() min: number,
    @elanIntType() max: number,
  ): number {
    const float = this.value(current);
    return Math.floor(float * (max - min + 1) + min);
  }

  @elanFunction(FunctionOptions.impure, ElanTuple([ElanInt, ElanInt]))
  firstRandomInFixedSequence(): [number, number] {
    return [521288629, 362436069];
  }

  @elanFunction(FunctionOptions.impure, ElanTuple([ElanInt, ElanInt]))
  firstRandom(): [number, number] {
    const c = this.clock();
    return [this.hi16(c), this.lo16(c)];
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  bitAnd(@elanIntType() a: number, @elanIntType() b: number): number {
    return a & b;
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  bitOr(@elanIntType() a: number, @elanIntType() b: number): number {
    return a | b;
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  bitXor(@elanIntType() a: number, @elanIntType() b: number): number {
    return a ^ b;
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  bitNot(@elanIntType() a: number): number {
    return ~a;
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  bitShiftL(@elanIntType() a: number, @elanIntType() shift: number): number {
    return a << shift;
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  bitShiftR(@elanIntType() a: number, @elanIntType() shift: number): number {
    return a >>> shift;
  }

  @elanFunction(FunctionOptions.pureExtension)
  asBinary(@elanIntType() a: number): string {
    return a.toString(2);
  }

  @elanFunction(FunctionOptions.pureExtension)
  matchesRegex(a: string, r: RegExp): boolean {
    return r.test(a);
  }
  //File operations
  @elanFunction(FunctionOptions.impureAsync, ElanTuple([ElanInt, ElanString, ElanInt]))
  openRead(contents: string): File {
    return [1, contents, 0];
  }

  @elanFunction(FunctionOptions.impureAsyncExtension)
  readLine(@elanType(ElanTuple([ElanInt, ElanString, ElanInt])) file: File): string {
    const status = file[0];
    const contents = file[1];
    const pointer = file[2];
    if (status === 0) {
      throw new ElanRuntimeError("File is not open");
    }
    if (status === 2) {
      throw new ElanRuntimeError("File is open for writing, not reading");
    }
    let newline = contents.indexOf("\n", pointer);
    if (newline === -1) {
      newline = contents.length;
    }
    const line = contents.substring(pointer, newline);
    file[2] = newline + 1;
    return line;
  }

  @elanFunction(FunctionOptions.pureExtension)
  endOfFile(@elanType(ElanTuple([ElanInt, ElanString, ElanInt])) file: File): boolean {
    return file[2] >= file[1].length - 1;
  }

  @elanProcedure(ProcedureOptions.asyncExtension)
  close(@elanType(ElanTuple([ElanInt, ElanString, ElanInt])) file: File): void {
    //Does nothing for now.
  }
}

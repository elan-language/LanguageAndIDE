import "reflect-metadata";
import { ElanCompilerError } from "../elan-compiler-error";
import { ElanRuntimeError } from "../elan-runtime-error";
import {
  elanAbstractDictionaryType,
  ElanArray,
  elanArrayType,
  ElanBoolean,
  ElanClass,
  elanClassExport,
  elanClassType,
  elanConstant,
  elanDictionaryType,
  ElanFloat,
  elanFunction,
  elanFuncType,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  ElanImmutableDictionary,
  elanImmutableDictionaryType,
  ElanInt,
  elanIntType,
  ElanIterable,
  elanIterableType,
  ElanList,
  elanListType,
  elanProcedure,
  ElanString,
  ElanT1,
  ElanT2,
  ElanTuple,
  FunctionOptions,
  ProcedureOptions,
} from "../elan-type-annotations";
import { hasHiddenType } from "../has-hidden-type";
import { StubInputOutput } from "../stub-input-output";
import { System } from "../system";
import { BaseVG } from "./base-vg";
import { BlockGraphics } from "./block-graphics";
import { CircleVG } from "./circle-vg";
import { GraphicsBase } from "./graphics-base";
import { LineVG } from "./line-vg";
import { Queue } from "./queue";
import { Random } from "./random";
import { RectangleVG } from "./rectangle-vg";
import { ElanSet } from "./set";
import { Stack } from "./stack";
import { TextFileReader } from "./text-file-reader";
import { TextFileWriter } from "./text-file-writer";
import { VectorGraphics } from "./vector-graphics";

export class StdLib {
  constructor() {
    this.system = new System(new StubInputOutput());
  }

  system: System;

  // types
  @elanClassExport(TextFileReader)
  TextFileReader = TextFileReader;

  @elanClassExport(TextFileWriter)
  TextFileWriter = TextFileWriter;

  @elanClassExport(Random)
  Random = Random;

  @elanClassExport(Stack)
  Stack = Stack;

  @elanClassExport(Queue)
  Queue = Queue;

  @elanClassExport(ElanSet)
  Set = ElanSet;

  @elanClassExport(GraphicsBase)
  GraphicsBase = GraphicsBase;

  @elanClassExport(BlockGraphics)
  BlockGraphics = BlockGraphics;

  @elanClassExport(VectorGraphics)
  VectorGraphics = VectorGraphics;

  @elanClassExport(BaseVG)
  BaseVG = BaseVG;

  @elanClassExport(CircleVG)
  CircleVG = CircleVG;

  @elanClassExport(LineVG)
  LineVG = LineVG;

  @elanClassExport(RectangleVG)
  RectangleVG = RectangleVG;

  // Standard colours

  @elanConstant(ElanInt) black = 0x000000;
  @elanConstant(ElanInt) grey = 0x808080;
  @elanConstant(ElanInt) white = 0xffffff;
  @elanConstant(ElanInt) red = 0xff0000;
  @elanConstant(ElanInt) green = 0x008000;
  @elanConstant(ElanInt) blue = 0x0000ff;
  @elanConstant(ElanInt) yellow = 0xffff00;
  @elanConstant(ElanInt) brown = 0xa52a2a;

  @elanConstant()
  pi: number = Math.PI;

  private isValueType<T1>(v: T1) {
    return typeof v === "boolean" || typeof v === "string" || typeof v === "number";
  }

  @elanFunction(FunctionOptions.pureExtension)
  asString<T1>(@elanGenericParamT1Type() v: T1 | T1[] | undefined): string {
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

  @elanFunction(FunctionOptions.pureExtension, ElanArray(ElanT1))
  asArray<T1>(@elanIterableType(ElanT1) list: T1[]): T1[] {
    const arr = [...list];
    (arr as unknown as hasHiddenType)._type = "Array";
    return arr;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT1))
  asList<T1>(@elanIterableType(ElanT1) arr: T1[]): T1[] {
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

  @elanFunction(FunctionOptions.pureExtension, ElanIterable(ElanT1))
  asIter<T1>(@elanIterableType(ElanT1) arr: T1[]): T1[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "Iterable";
    return list as T1[];
  }

  @elanFunction(FunctionOptions.pureExtension, ElanT1)
  head<T1>(@elanIterableType(ElanT1) arr: T1[]): T1 {
    return this.system.safeIndex(arr, 0);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT1))
  keys<T1, T2>(
    @elanAbstractDictionaryType(ElanT1, ElanT2)
    dict: {
      [key: string]: T1;
    },
  ): string[] {
    const lst = Object.getOwnPropertyNames(dict).filter((s) => s !== "_type");
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT2))
  values<T1>(
    @elanAbstractDictionaryType(ElanT1, ElanT2)
    dict: {
      [key: string]: T1;
    },
  ): T1[] {
    const lst = this.keys(dict).map((k) => dict[k]);
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanBoolean)
  hasKey<T1>(
    @elanAbstractDictionaryType(ElanT1, ElanT2)
    dict: { [key: string]: T1 },
    @elanGenericParamT1Type() key: string,
  ): boolean {
    return this.keys(dict).includes(key);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanImmutableDictionary(ElanT1, ElanT2))
  withRemoveAtKey<T1>(
    @elanImmutableDictionaryType(ElanT1, ElanT2)
    dict: { [key: string]: T1 },
    @elanGenericParamT1Type() key: string,
  ) {
    const newDict = { ...dict };
    (newDict as unknown as hasHiddenType)._type = (dict as unknown as hasHiddenType)._type;
    delete newDict[key];
    return newDict;
  }

  @elanProcedure(ProcedureOptions.extension)
  removeAtKey<T1>(
    @elanDictionaryType(ElanT1, ElanT2)
    dict: { [key: string]: T1 },
    @elanGenericParamT1Type() key: string,
  ) {
    delete dict[key];
  }

  @elanFunction(FunctionOptions.pureExtension, ElanInt)
  length<T1>(
    @elanIterableType(ElanT1)
    coll: string | T1[] | { [key: string]: T1 },
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

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT1))
  withPutAt<T1>(
    @elanListType(ElanT1) list: T1[],
    @elanIntType() index: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    const newList = [...list];
    newList[index] = value;
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanProcedure(ProcedureOptions.extension)
  putAt<T1>(
    @elanArrayType(ElanT1) list: T1[],
    @elanIntType() index: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    this.system.safeArraySet(list, index, value);
  }

  @elanProcedure(ProcedureOptions.extension)
  putAt2D<T1>(
    @elanArrayType(ElanArray(ElanT1))
    list: T1[][],
    @elanIntType() col: number,
    @elanIntType() row: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    this.system.safeArraySet(list[col], row, value);
  }

  @elanProcedure(ProcedureOptions.extension)
  putAtKey<T1>(
    @elanDictionaryType(ElanT1, ElanT2)
    dict: { [key: string]: T1 },
    @elanGenericParamT1Type() key: string,
    @elanGenericParamT2Type() value: T1,
  ) {
    this.system.safeDictionarySet(dict, key, value);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT1))
  withInsert<T1>(
    @elanListType(ElanT1) list: T1[],
    @elanIntType() index: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 0, value);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanProcedure(ProcedureOptions.extension)
  insertAt<T1>(
    @elanArrayType(ElanT1) list: T1[],
    @elanIntType() index: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    list.splice(index, 0, value);
  }

  // custom impl
  private elanIndexOf<T1>(list: T1[], elem: T1) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (this.system.equals(item, elem)) {
        return i;
      }
    }
    return -1;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT1))
  withRemoveAt<T1>(@elanListType(ElanT1) list: T1[], @elanIntType() index: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 1);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT1))
  withRemoveFirst<T1>(@elanListType(ElanT1) list: T1[], @elanGenericParamT1Type() value: T1) {
    let newList = [...list];
    const index = this.elanIndexOf(newList, value);
    if (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
    }
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanList(ElanT1))
  withRemoveAll<T1>(@elanListType(ElanT1) list: T1[], @elanGenericParamT1Type() value: T1) {
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
  removeAt<T1>(@elanArrayType(ElanT1) list: T1[], @elanIntType() index: number) {
    list.splice(index, 1);
  }

  @elanProcedure(ProcedureOptions.extension)
  removeFirst<T1>(@elanArrayType(ElanT1) list: T1[], @elanGenericParamT1Type() value: T1) {
    const index = this.elanIndexOf(list, value);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  @elanProcedure(ProcedureOptions.extension)
  removeAll<T1>(@elanArrayType(ElanT1) list: T1[], @elanGenericParamT1Type() value: T1) {
    let index = this.elanIndexOf(list, value);
    while (index > -1) {
      list.splice(index, 1);
      index = this.elanIndexOf(list, value);
    }
  }

  @elanProcedure(ProcedureOptions.extension)
  append<T1>(@elanArrayType(ElanT1) list: T1[], @elanGenericParamT1Type() value: T1) {
    list.push(value);
  }

  @elanProcedure(ProcedureOptions.extension)
  appendList<T1>(@elanArrayType(ElanT1) list: T1[], @elanArrayType(ElanT1) listB: T1[]) {
    list.push(...listB);
  }

  @elanProcedure(ProcedureOptions.extension)
  prepend<T1>(@elanArrayType(ElanT1) list: T1[], @elanGenericParamT1Type() value: T1) {
    list.unshift(value);
  }

  @elanProcedure(ProcedureOptions.extension)
  prependList<T1>(@elanArrayType(ElanT1) list: T1[], @elanArrayType(ElanT1) listB: T1[]) {
    list.unshift(...listB);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanImmutableDictionary(ElanT1, ElanT2))
  withPutAtKey<T1>(
    @elanImmutableDictionaryType(ElanT1, ElanT2)
    dict: { [key: string]: T1 },
    @elanGenericParamT1Type() key: string,
    @elanGenericParamT2Type() value: T1,
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
  typeAndProperties(@elanGenericParamT1Type() o: { [key: string]: object }): string {
    const type = o.constructor.name;
    const items = Object.getOwnPropertyNames(o);
    return `${type} [${items.map((n) => `"${n}":${o[n]}`).join(", ")}]`;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanIterable(ElanT1))
  filter<T1>(
    @elanIterableType(ElanT1)
    source: T1[] | string,
    @elanFuncType([ElanT1], ElanBoolean)
    predicate: (value: T1 | string) => boolean,
  ): (T1 | string)[] {
    const list = typeof source === "string" ? source.split("") : [...source];
    return this.asIter(list.filter(predicate));
  }

  @elanFunction(FunctionOptions.pureExtension, ElanIterable(ElanT2))
  map<T1, T2>(
    @elanIterableType(ElanT1)
    source: T1[] | string,
    @elanFuncType([ElanT1], ElanT2)
    predicate: (value: T1 | string) => T2,
  ) {
    const list = typeof source === "string" ? source.split("") : [...source];
    return this.asIter(list.map(predicate));
  }

  @elanFunction(FunctionOptions.pureExtension, ElanT2)
  reduce<T1, T2>(
    @elanIterableType(ElanT1)
    source: T1[] | string,
    @elanGenericParamT2Type() initValue: T2,
    @elanFuncType([ElanT2, ElanT1], ElanT2)
    predicate: (s: T2, value: T1 | string) => T2,
  ): T2 {
    const list = typeof source === "string" ? source.split("") : [...source];
    return list.reduce(predicate, initValue);
  }

  @elanFunction(FunctionOptions.pureExtension)
  max(@elanIterableType(ElanFloat) source: number[]): number {
    return Math.max(...source);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanT1)
  maxBy<T1>(
    @elanIterableType(ElanT1) source: T1[],
    @elanFuncType([ElanT1], ElanFloat)
    predicate: (value: T1) => number,
  ): T1 {
    const mm = source.map(predicate);
    const max = Math.max(...mm);
    const i = this.elanIndexOf(mm, max);
    return source[i];
  }

  @elanFunction(FunctionOptions.pureExtension)
  min(@elanIterableType(ElanFloat) source: number[]): number {
    return Math.min(...source);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanT1)
  minBy<T1>(
    @elanIterableType(ElanT1) source: T1[],
    @elanFuncType([ElanT1], ElanFloat)
    predicate: (value: T1) => number,
  ): T1 {
    const mm = source.map(predicate);
    const min = Math.min(...mm);
    const i = this.elanIndexOf(mm, min);
    return source[i];
  }

  @elanFunction(FunctionOptions.pureExtension, ElanIterable(ElanT1))
  sortBy<T1>(
    @elanIterableType(ElanT1) source: T1[],
    @elanFuncType([ElanT1, ElanT1], ElanInt)
    predicate: (a: T1, b: T1) => number,
  ): T1[] {
    const clone = [...source];
    return this.asIter(clone.sort(predicate));
  }

  @elanFunction(FunctionOptions.pureExtension)
  any<T1>(
    @elanIterableType(ElanT1) source: T1[],
    @elanFuncType([ElanT1], ElanBoolean)
    predicate: (value: T1) => boolean,
  ): boolean {
    return source.some(predicate);
  }

  @elanFunction(FunctionOptions.pureExtension, ElanIterable(ElanT2))
  groupBy<T1>(
    @elanIterableType(ElanT1) source: T1[],
    @elanFuncType([ElanT1], ElanT2)
    predicate: (value: T1) => T1,
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
  contains<T1>(
    @elanIterableType(ElanT1) source: T1[],
    @elanGenericParamT1Type() item: T1,
  ): boolean {
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

  @elanFunction(FunctionOptions.pure, ElanArray(ElanT1))
  createArray<T1>(@elanIntType() x: number, @elanGenericParamT1Type() value: T1) {
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

  @elanFunction(FunctionOptions.pure, ElanArray(ElanArray(ElanT1)))
  create2DArray<T1>(
    @elanIntType() x: number,
    @elanIntType() y: number,
    @elanGenericParamT1Type() value: T1,
  ) {
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
    return a >>> shift; // >>> is unsigned version of >>
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
  @elanFunction(FunctionOptions.impureAsync, ElanClass(TextFileReader))
  openFileForReading(): Promise<TextFileReader> {
    return this.system.elanInputOutput.readFile().then(
      (s) => {
        const tf = this.system.initialise(new TextFileReader());
        tf.status = 1;
        tf.content = s ? s.split("\n") : [];
        return tf;
      },
      (e) => {
        throw new ElanRuntimeError(e);
      },
    );
  }

  @elanFunction(FunctionOptions.pure, ElanClass(TextFileWriter))
  createFileForWriting(fileName: string): TextFileWriter {
    const tf = this.system.initialise(new TextFileWriter());
    tf.fileName = fileName;
    tf.status = 1;
    return tf;
  }

  // Graphics
  @elanProcedure(ProcedureOptions.extension)
  clearGraphics(@elanClassType(GraphicsBase) g: GraphicsBase) {
    this.system!.elanInputOutput.clearGraphics();
  }

  @elanFunction(FunctionOptions.impureAsyncExtension, ElanString)
  getKeystroke(@elanClassType(GraphicsBase) g: GraphicsBase): Promise<string> {
    return this.system!.elanInputOutput.getKeystroke();
  }

  @elanFunction(FunctionOptions.impureAsyncExtension, ElanTuple([ElanString, ElanString]))
  getKeystrokeWithModifier(
    @elanClassType(GraphicsBase) g: GraphicsBase,
  ): Promise<[string, string]> {
    return this.system!.elanInputOutput.getKeystrokeWithModifier();
  }

  @elanProcedure(ProcedureOptions.extension)
  clearKeyBuffer(@elanClassType(GraphicsBase) g: GraphicsBase) {
    this.system!.elanInputOutput.clearKeyBuffer();
  }

  @elanProcedure(ProcedureOptions.asyncExtension)
  display(@elanClassType(GraphicsBase) g: GraphicsBase): Promise<void> {
    const html = g.asHtml();
    this.system!.elanInputOutput.drawGraphics(html);
    return this.pause(0);
  }
}

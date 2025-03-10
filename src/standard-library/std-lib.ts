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
  ElanDictionaryImmutable,
  elanDictionaryImmutableType,
  elanDictionaryType,
  ElanFloat,
  elanFunction,
  elanFuncType,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  ElanInt,
  elanIntType,
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
import { Turtle } from "./turtle";
import { VectorGraphics } from "./vector-graphics";

async function getPivot<T1>(x: T1, y: T1, z: T1, compare: (a: T1, b: T1) => Promise<number>) {
  if ((await compare(x, y)) < 0) {
    if ((await compare(y, z)) < 0) {
      return y;
    } else if ((await compare(z, x)) < 0) {
      return x;
    } else {
      return z;
    }
  } else if ((await compare(y, z)) > 0) {
    return y;
  } else if ((await compare(z, x)) > 0) {
    return x;
  } else {
    return z;
  }
}

// from github https://gist.github.com/kimamula/fa34190db624239111bbe0deba72a6ab
async function quickSort<T1>(
  arr: T1[],
  compare: (a: T1, b: T1) => Promise<number>,
  left = 0,
  right = arr.length - 1,
) {
  if (left < right) {
    let i = left,
      j = right,
      tmp;
    const pivot = await getPivot(arr[i], arr[i + Math.floor((j - i) / 2)], arr[j], compare);
    while (true) {
      while ((await compare(arr[i], pivot)) < 0) {
        i++;
      }
      while ((await compare(pivot, arr[j])) < 0) {
        j--;
      }
      if (i >= j) {
        break;
      }
      tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;

      i++;
      j--;
    }
    await quickSort(arr, compare, left, i - 1);
    await quickSort(arr, compare, j + 1, right);
  }
  return arr;
}

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

  @elanClassExport(BlockGraphics)
  BlockGraphics = BlockGraphics;

  @elanClassExport(Turtle)
  Turtle = Turtle;

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

  @elanConstant(ElanBoolean) true = true;
  @elanConstant(ElanBoolean) false = false;

  @elanConstant() pi: number = Math.PI;

  @elanConstant(ElanString) quotes = `"`;
  @elanConstant(ElanString) openBrace = `{`;
  @elanConstant(ElanString) closeBrace = `}`;

  private isValueType<T1>(v: T1) {
    return typeof v === "boolean" || typeof v === "string" || typeof v === "number";
  }

  @elanFunction([], FunctionOptions.pureAsyncExtension, ElanString)
  async asString<T1>(@elanGenericParamT1Type() v: T1 | T1[] | undefined): Promise<string> {
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
      return "A RegExp";
    }

    async function convertList<T>(v: T[], stdlib: StdLib) {
      const items: string[] = [];

      for (const i of v) {
        const s = await stdlib.asString(i);
        items.push(s);
      }

      return items.join(", ");
    }

    if (Array.isArray(v)) {
      const type = (v as unknown as hasHiddenType)._type;
      let items: string = "";

      switch (type) {
        case "List":
          items = await convertList(v, this);
          return `{${items}}`;
        case "Tuple":
          items = await convertList(v, this);
          return `tuple(${items})`;
        case "Array":
          items = await convertList(v, this);
          return `[${items}]`;
        case "Iterable":
          return `an Iterable`;
        default:
          return v.toString();
      }
    }

    if (typeof v === "object" && "asString" in v) {
      return await (v.asString as () => Promise<string>)();
    }

    async function convertDict(o: { [key: string]: object }, names: string[], stdlib: StdLib) {
      const items: string[] = [];

      for (const n of names) {
        const s = await stdlib.asString(o[n]);
        items.push(`${n}:${s}`);
      }

      return items.join(", ");
    }

    if (typeof v === "object" && v.constructor.name === "Object") {
      const type = (v as unknown as hasHiddenType)._type;
      const [pf, sf] = type === "Dictionary" ? ["[", "]"] : ["{", "}"];

      const items = Object.getOwnPropertyNames(v).filter((s) => s !== "_type");
      const o = v as { [key: string]: object };
      const dict = await convertDict(o, items, this);
      return `${pf}${dict}${sf}`;
    }

    if (typeof v === "object") {
      return `a ${v.constructor.name}`;
    }

    if (typeof v === "function") {
      return `function ${v.name}`;
    }

    throw new ElanCompilerError("Not implemented: " + typeof v);
  }

  @elanFunction(["value"])
  unicode(@elanIntType() n: number): string {
    return String.fromCharCode(n);
  }

  @elanFunction(["character"], FunctionOptions.pureExtension, ElanInt)
  asUnicode(s: string): number {
    return s.charCodeAt(0);
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanArray(ElanT1))
  asArray<T1>(@elanIterableType(ElanT1) list: T1[]): T1[] {
    const arr = [...list];
    (arr as unknown as hasHiddenType)._type = "Array";
    return arr;
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanList(ElanT1))
  asList<T1>(@elanIterableType(ElanT1) arr: T1[]): T1[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "List";
    return list;
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanClass(ElanSet))
  asSet<T1>(@elanIterableType(ElanT1) arr: T1[]): ElanSet<T1> {
    const set = this.system.initialise(new ElanSet<T1>());
    return set.addFromArray(arr);
  }

  @elanFunction(["start", "end"], FunctionOptions.pure, ElanList(ElanInt))
  range(@elanIntType() start: number, @elanIntType() end: number): number[] {
    const seq = [];
    for (let i = start; i <= end; i++) {
      seq.push(i);
    }
    (seq as unknown as hasHiddenType)._type = "Iterable";
    return seq;
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanT1)
  head<T1>(@elanIterableType(ElanT1) arr: T1[]): T1 {
    return this.system.safeIndex(arr, 0);
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanList(ElanT1))
  keys<T1>(
    @elanAbstractDictionaryType(ElanT1, ElanT2)
    dict: {
      [key: string]: T1;
    },
  ): string[] {
    const lst = Object.getOwnPropertyNames(dict).filter((s) => s !== "_type");
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanList(ElanT2))
  values<T1>(
    @elanAbstractDictionaryType(ElanT1, ElanT2)
    dict: {
      [key: string]: T1;
    },
  ): T1[] {
    const lst = this.keys(dict).map((k) => dict[k]);
    (lst as unknown as hasHiddenType)._type = `List`;
    return lst;
  }

  @elanFunction(["key"], FunctionOptions.pureExtension, ElanBoolean)
  hasKey<T1>(
    @elanAbstractDictionaryType(ElanT1, ElanT2)
    dict: { [key: string]: T1 },
    @elanGenericParamT1Type() key: string,
  ): boolean {
    return this.keys(dict).includes(key);
  }

  @elanFunction(["key"], FunctionOptions.pureExtension, ElanDictionaryImmutable(ElanT1, ElanT2))
  withRemoveAtKey<T1>(
    @elanDictionaryImmutableType(ElanT1, ElanT2)
    dict: { [key: string]: T1 },
    @elanGenericParamT1Type() key: string,
  ) {
    const newDict = { ...dict };
    (newDict as unknown as hasHiddenType)._type = (dict as unknown as hasHiddenType)._type;
    delete newDict[key];
    return newDict;
  }

  @elanProcedure(["key"], ProcedureOptions.extension)
  removeAtKey<T1>(
    @elanDictionaryType(ElanT1, ElanT2)
    dict: { [key: string]: T1 },
    @elanGenericParamT1Type() key: string,
  ) {
    delete dict[key];
  }

  @elanFunction(["match", "replacement"], FunctionOptions.pureExtension)
  replace(s1: string, match: string, replacement: string): string {
    return s1.replaceAll(match, replacement);
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanInt)
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

  @elanFunction([], FunctionOptions.pureExtension)
  upperCase(s1: string): string {
    return s1.toUpperCase();
  }

  @elanFunction([], FunctionOptions.pureExtension)
  lowerCase(s1: string): string {
    return s1.toLowerCase();
  }

  @elanFunction(["other"], FunctionOptions.pureExtension)
  isBefore(s1: string, s2: string): boolean {
    return s1 < s2;
  }

  @elanFunction(["other"], FunctionOptions.pureExtension)
  isAfter(s1: string, s2: string): boolean {
    return s1 > s2;
  }

  @elanFunction(["other"], FunctionOptions.pureExtension)
  isAfterOrSameAs(s1: string, s2: string): boolean {
    return s1 > s2 || s1 === s2;
  }

  @elanFunction(["", "other"], FunctionOptions.pureExtension)
  isBeforeOrSameAs(s1: string, s2: string): boolean {
    return s1 < s2 || s1 === s2;
  }

  @elanFunction(["", "index", "value"], FunctionOptions.pureExtension, ElanList(ElanT1))
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

  @elanProcedure(["", "index", "value"], ProcedureOptions.extension)
  putAt<T1>(
    @elanArrayType(ElanT1) list: T1[],
    @elanIntType() index: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    this.system.safeArraySet(list, index, value);
  }

  @elanProcedure(["", "column", "row"], ProcedureOptions.extension)
  putAt2D<T1>(
    @elanArrayType(ElanArray(ElanT1))
    list: T1[][],
    @elanIntType() col: number,
    @elanIntType() row: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    this.system.safeArraySet(list[col], row, value);
  }

  @elanProcedure(["", "key", "value"], ProcedureOptions.extension)
  putAtKey<T1>(
    @elanDictionaryType(ElanT1, ElanT2)
    dict: { [key: string]: T1 },
    @elanGenericParamT1Type() key: string,
    @elanGenericParamT2Type() value: T1,
  ) {
    this.system.safeDictionarySet(dict, key, value);
  }

  @elanFunction(["", "index", "value"], FunctionOptions.pureExtension, ElanList(ElanT1))
  withInsertAt<T1>(
    @elanListType(ElanT1) list: T1[],
    @elanIntType() index: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 0, value);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanProcedure(["", "index", "value"], ProcedureOptions.extension)
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

  @elanFunction(["", "index"], FunctionOptions.pureExtension, ElanList(ElanT1))
  withRemoveAt<T1>(@elanListType(ElanT1) list: T1[], @elanIntType() index: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 1);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanFunction(["", "value"], FunctionOptions.pureExtension, ElanList(ElanT1))
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

  @elanFunction(["", "value"], FunctionOptions.pureExtension, ElanList(ElanT1))
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

  @elanProcedure(["", "index"], ProcedureOptions.extension)
  removeAt<T1>(@elanArrayType(ElanT1) list: T1[], @elanIntType() index: number) {
    list.splice(index, 1);
  }

  @elanProcedure(["", "value"], ProcedureOptions.extension)
  removeFirst<T1>(@elanArrayType(ElanT1) list: T1[], @elanGenericParamT1Type() value: T1) {
    const index = this.elanIndexOf(list, value);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  @elanProcedure(["", "value"], ProcedureOptions.extension)
  removeAll<T1>(@elanArrayType(ElanT1) list: T1[], @elanGenericParamT1Type() value: T1) {
    let index = this.elanIndexOf(list, value);
    while (index > -1) {
      list.splice(index, 1);
      index = this.elanIndexOf(list, value);
    }
  }

  @elanProcedure(["", "value"], ProcedureOptions.extension)
  append<T1>(@elanArrayType(ElanT1) list: T1[], @elanGenericParamT1Type() value: T1) {
    list.push(value);
  }

  @elanProcedure(["", "other"], ProcedureOptions.extension)
  appendArray<T1>(@elanArrayType(ElanT1) list: T1[], @elanArrayType(ElanT1) listB: T1[]) {
    list.push(...listB);
  }

  @elanProcedure(["", "other"], ProcedureOptions.extension)
  prepend<T1>(@elanArrayType(ElanT1) list: T1[], @elanGenericParamT1Type() value: T1) {
    list.unshift(value);
  }

  @elanProcedure(["", "other"], ProcedureOptions.extension)
  prependArray<T1>(@elanArrayType(ElanT1) list: T1[], @elanArrayType(ElanT1) listB: T1[]) {
    list.unshift(...listB);
  }

  @elanFunction(
    ["", "key", "value"],
    FunctionOptions.pureExtension,
    ElanDictionaryImmutable(ElanT1, ElanT2),
  )
  withPutAtKey<T1>(
    @elanDictionaryImmutableType(ElanT1, ElanT2)
    dict: { [key: string]: T1 },
    @elanGenericParamT1Type() key: string,
    @elanGenericParamT2Type() value: T1,
  ) {
    const newDict = { ...dict };
    newDict[key] = value;
    (newDict as unknown as hasHiddenType)._type = "DictionaryImmutable";
    return newDict;
  }

  @elanFunction(["", "targetString"], FunctionOptions.pureExtension, ElanInt)
  indexOf(s1: string, s2: string): number {
    return s1.indexOf(s2);
  }

  @elanFunction(["", "item"], FunctionOptions.pureExtension, ElanInt)
  indexOfItem<T1>(
    @elanIterableType(ElanT1)
    source: T1[],
    @elanGenericParamT1Type()
    item: T1,
  ): number {
    return this.elanIndexOf(source, item);
  }

  @elanFunction([], FunctionOptions.pureExtension)
  trim(s: string): string {
    return s.trim();
  }

  @elanFunction(["", "separator"], FunctionOptions.pureExtension, ElanList(ElanString))
  split(s: string, separator: string): string[] {
    return this.asList(s.split(separator));
  }

  @elanFunction(["", "separator"], FunctionOptions.pureExtension)
  join(@elanIterableType(ElanString) list: string[], separator: string): string {
    return list.join(separator);
  }

  @elanFunction(["number"], FunctionOptions.pureExtension, ElanInt)
  floor(n: number) {
    return Math.floor(n);
  }

  @elanFunction(["number"], FunctionOptions.pureExtension, ElanBoolean)
  isNaN(n: number) {
    return isNaN(n);
  }

  @elanFunction(["number"], FunctionOptions.pureExtension, ElanBoolean)
  isInfinite(n: number) {
    return n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY;
  }

  @elanFunction(["number", "decimalPlaces"], FunctionOptions.pureExtension)
  round(n: number, @elanIntType() places: number): number {
    const shift = 10 ** places;
    return Math.floor(n * shift + 0.5) / shift;
  }

  @elanFunction(["number"], FunctionOptions.pureExtension, ElanInt)
  ceiling(n: number): number {
    const fl = this.floor(n);
    return n > fl ? fl + 1 : fl;
  }

  @elanFunction(["", "lambdaOrFunctionRef"], FunctionOptions.pureAsyncExtension, ElanList(ElanT1))
  async filter<T1>(
    @elanIterableType(ElanT1)
    source: T1[] | string,
    @elanFuncType([ElanT1], ElanBoolean)
    predicate: (value: T1 | string) => Promise<boolean>,
  ): Promise<(T1 | string)[]> {
    const list = typeof source === "string" ? source.split("") : [...source];
    //return this.asList(list.filter(predicate));

    const asyncFilter = async (
      list: string[] | T1[],
      predicate: (value: T1 | string) => Promise<boolean>,
    ) => {
      const results = await Promise.all(list.map(predicate));

      return list.filter((_v, index) => results[index]);
    };

    const result = await asyncFilter(list, predicate);

    return this.asList(result);
  }

  @elanFunction(["", "lambdaOrFunctionRef"], FunctionOptions.pureAsyncExtension, ElanList(ElanT2))
  async map<T1, T2>(
    @elanIterableType(ElanT1)
    source: T1[] | string,
    @elanFuncType([ElanT1], ElanT2)
    predicate: (value: T1 | string) => Promise<T2>,
  ) {
    const list = typeof source === "string" ? source.split("") : [...source];

    const results = await Promise.all(list.map(predicate));

    return this.asList(results);
  }

  @elanFunction(
    ["", "initialValue", "lambdaOrFunctionRef"],
    FunctionOptions.pureAsyncExtension,
    ElanT2,
  )
  async reduce<T1, T2>(
    @elanIterableType(ElanT1)
    source: T1[] | string,
    @elanGenericParamT2Type() initValue: T2,
    @elanFuncType([ElanT2, ElanT1], ElanT2)
    predicate: (s: T2, value: T1 | string) => Promise<T2>,
  ): Promise<T2> {
    const list = typeof source === "string" ? source.split("") : [...source];

    let acc: T2 = initValue;

    for (const i of list) {
      acc = await predicate(acc, i);
    }

    return acc;
  }

  @elanFunction([], FunctionOptions.pureExtension)
  max(@elanIterableType(ElanFloat) source: number[]): number {
    return Math.max(...source);
  }

  @elanFunction(["", "lambdaOrFunctionRef"], FunctionOptions.pureAsyncExtension, ElanT1)
  async maxBy<T1>(
    @elanIterableType(ElanT1) source: T1[],
    @elanFuncType([ElanT1], ElanFloat)
    predicate: (value: T1) => Promise<number>,
  ): Promise<T1> {
    const mm = await this.map(source, predicate as (value: string | T1) => Promise<number>);
    const max = Math.max(...mm);
    const i = this.elanIndexOf(mm, max);
    return source[i];
  }

  @elanFunction([], FunctionOptions.pureExtension)
  min(@elanIterableType(ElanFloat) source: number[]): number {
    return Math.min(...source);
  }

  @elanFunction(["", "lambdaOrFunctionRef"], FunctionOptions.pureAsyncExtension, ElanT1)
  async minBy<T1>(
    @elanIterableType(ElanT1) source: T1[],
    @elanFuncType([ElanT1], ElanFloat)
    predicate: (value: T1) => Promise<number>,
  ): Promise<T1> {
    const mm = await this.map(source, predicate as (value: string | T1) => Promise<number>);
    const min = Math.min(...mm);
    const i = this.elanIndexOf(mm, min);
    return source[i];
  }

  @elanFunction(["", "lambdaOrFunctionRef"], FunctionOptions.pureAsyncExtension, ElanList(ElanT1))
  async sortBy<T1>(
    @elanIterableType(ElanT1) source: T1[],
    @elanFuncType([ElanT1, ElanT1], ElanInt)
    predicate: (a: T1, b: T1) => Promise<number>,
  ): Promise<T1[]> {
    const clone = [...source];
    return this.asList(await quickSort(clone, predicate));
  }

  @elanFunction(["", "item"], FunctionOptions.pureExtension)
  contains<T1>(
    @elanIterableType(ElanT1) source: T1[],
    @elanGenericParamT1Type() item: T1,
  ): boolean {
    return source.includes(item);
  }

  @elanProcedure(["milliseconds"], ProcedureOptions.async)
  pause(@elanIntType() ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }

  @elanFunction([], FunctionOptions.impure, ElanInt)
  clock(): number {
    return new Date().getTime();
  }

  @elanFunction([], FunctionOptions.impure)
  random(): number {
    return Math.random();
  }

  @elanFunction(["low", "high"], FunctionOptions.impure, ElanInt)
  randomInt(@elanIntType() low: number, @elanIntType() high: number): number {
    return Math.floor(Math.random() * (high - low + 1)) + low;
  }

  @elanFunction(["string"], FunctionOptions.pure, ElanTuple([ElanBoolean, ElanFloat]))
  parseAsFloat(s: string): [boolean, number] {
    const f = parseFloat(s);
    if (Number.isFinite(f)) {
      return this.system.tuple([true, f]) as [boolean, number];
    }
    return this.system.tuple([false, 0]) as [boolean, number];
  }

  @elanFunction(["string"], FunctionOptions.pure, ElanTuple([ElanBoolean, ElanInt]))
  parseAsInt(s: string): [boolean, number] {
    const [b, f] = this.parseAsFloat(s);
    const i = Math.floor(f);
    if (b && f === i) {
      return this.system.tuple([b, i]) as [boolean, number];
    }
    return this.system.tuple([false, 0]) as [boolean, number];
  }

  @elanProcedure(["text"], ProcedureOptions.async)
  async printLine(s: string) {
    await this.system.elanInputOutput.print(`${s}\n`);
  }

  @elanProcedure(["text"], ProcedureOptions.async)
  async printNoLine(s: string) {
    await this.system.elanInputOutput.print(s);
  }

  @elanProcedure(["position", "text"], ProcedureOptions.async)
  async printTab(@elanIntType() position: number, s: string) {
    await this.system.elanInputOutput.printTab(position, s);
  }

  @elanProcedure([], ProcedureOptions.async)
  async clearPrintedText() {
    await this.system.elanInputOutput.clearPrintedText();
  }

  @elanFunction(["size", "initialValue"], FunctionOptions.pure, ElanArray(ElanT1))
  createArray<T1>(@elanIntType() x: number, @elanGenericParamT1Type() value: T1) {
    if (!this.isValueType(value)) {
      throw new ElanRuntimeError(`Can only create array with simple value`);
    }

    const toInit = this.system.array([]);
    toInit.length = x;

    for (let i = 0; i < x; i++) {
      toInit[i] = value;
    }

    return toInit;
  }

  @elanFunction(
    ["columns", "rows", "initialValue"],
    FunctionOptions.pure,
    ElanArray(ElanArray(ElanT1)),
  )
  createArray2D<T1>(
    @elanIntType() x: number,
    @elanIntType() y: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    if (!this.isValueType(value)) {
      throw new ElanRuntimeError(`Can only initialise array with simple value`);
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
  private async prompt(prompt: string) {
    await this.printLine(prompt);
  }

  @elanFunction(["prompt"], FunctionOptions.impureAsync, ElanString)
  async inputString(prompt: string): Promise<string> {
    await this.prompt(prompt);
    return await this.system.input();
  }

  @elanFunction(["prompt", "minLength", "maxLength"], FunctionOptions.impureAsync, ElanString)
  async inputStringWithLimits(
    prompt: string,
    @elanIntType() minLength: number,
    @elanIntType() maxLength: number,
  ): Promise<string> {
    const s = await this.inputString(prompt);

    if (s.length < minLength) {
      await this.prompt(`minimum length ${minLength} characters`);
    } else if (s.length > maxLength) {
      await this.prompt(`maximum length ${maxLength} characters`);
    } else {
      return s;
    }
    return await this.inputStringWithLimits(prompt, minLength, maxLength);
  }

  @elanFunction(["prompt", "options"], FunctionOptions.impureAsync, ElanString)
  async inputStringFromOptions(
    prompt: string,
    @elanArrayType(ElanString) options: string[],
  ): Promise<string> {
    const s = await this.inputString(prompt);

    if (options.includes(s)) {
      return s;
    }
    await this.prompt(`response must be one of ${options}`);
    return await this.inputStringFromOptions(prompt, options);
  }

  @elanFunction(["prompt"], FunctionOptions.impureAsync, ElanInt)
  async inputInt(prompt: string): Promise<number> {
    const s = await this.inputString(prompt);
    const [b, i] = this.parseAsInt(s);

    if (b && i.toString() === s) {
      return i;
    }

    await this.prompt("must be an integer");
    return await this.inputInt(prompt);
  }

  @elanFunction(["prompt", "minValue", "maxValue"], FunctionOptions.impureAsync, ElanInt)
  async inputIntBetween(
    prompt: string,
    @elanIntType() min: number,
    @elanIntType() max: number,
  ): Promise<number> {
    const s = await this.inputString(prompt);
    const [b, i] = this.parseAsInt(s);

    if (b && i.toString() === s && i >= min && i <= max) {
      return i;
    }

    await this.prompt(`must be an integer between ${min} and ${max} inclusive`);

    return await this.inputIntBetween(prompt, min, max);
  }

  @elanFunction(["prompt"], FunctionOptions.impureAsync, ElanFloat)
  async inputFloat(prompt: string): Promise<number> {
    const s = await this.inputString(prompt);
    const [b, i] = this.parseAsFloat(s);

    if (b) {
      return i;
    }

    await this.prompt("not a number");
    return await this.inputFloat(prompt);
  }

  @elanFunction(["prompt", "minValue", "maxValue"], FunctionOptions.impureAsync, ElanFloat)
  async inputFloatBetween(prompt: string, min: number, max: number): Promise<number> {
    const s = await this.inputString(prompt);

    const [b, i] = this.parseAsFloat(s);
    if (b && i >= min && i <= max) {
      return i;
    }

    await this.prompt(`must be a number between ${min} and ${max} inclusive`);
    return await this.inputFloatBetween(prompt, min, max);
  }
  //Math

  @elanFunction(["number"])
  abs(x: number): number {
    return Math.abs(x);
  }

  // Returns the absolute value of the input.

  @elanFunction(["value"])
  acos(x: number): number {
    return Math.acos(x);
  }
  // Returns the arccosine of the input.

  @elanFunction(["value"])
  acosDeg(n: number): number {
    return this.radToDeg(this.acos(n));
  }

  @elanFunction(["value"])
  asin(x: number): number {
    return Math.asin(x);
  }
  // Returns the arcsine of the input.

  @elanFunction(["value"])
  asinDeg(n: number): number {
    return this.radToDeg(this.asin(n));
  }

  @elanFunction(["value"])
  atan(x: number): number {
    return Math.atan(x);
  }
  // Returns the arctangent of the input.

  @elanFunction(["value"])
  atanDeg(n: number): number {
    return this.radToDeg(this.atan(n));
  }

  @elanFunction(["radians"])
  cos(x: number): number {
    return Math.cos(x);
  }

  @elanFunction(["degrees"])
  cosDeg(n: number): number {
    return this.cos(this.degToRad(n));
  }

  @elanFunction(["x"])
  exp(x: number): number {
    return Math.exp(x);
  }
  // Returns ex, where x is the argument, and e is Euler's number (2.718…, the base of the natural logarithm).

  @elanFunction(["number"])
  logE(x: number): number {
    return Math.log(x);
  }
  // Returns the natural logarithm (㏒e; also, ㏑) of the input.

  @elanFunction(["number"])
  log10(x: number): number {
    return Math.log10(x);
  }
  // Returns the base-10 logarithm of the input.

  // Returns the base-2 logarithm of the input.

  @elanFunction(["number"])
  log2(x: number): number {
    return Math.log2(x);
  }

  @elanFunction(["radians"])
  sin(x: number): number {
    return Math.sin(x);
  }
  // Returns the sine of the input.

  @elanFunction(["degrees"])
  sinDeg(n: number): number {
    return this.sin(this.degToRad(n));
  }

  @elanFunction(["number"])
  sqrt(x: number): number {
    return Math.sqrt(x);
  }
  // Returns the positive square root of the input.

  @elanFunction(["radians"])
  tan(x: number): number {
    return Math.tan(x);
  }
  // Returns the tangent of the input.

  @elanFunction(["degrees"])
  tanDeg(n: number): number {
    return this.tan(this.degToRad(n));
  }

  @elanFunction(["degrees"])
  degToRad(d: number): number {
    return (d * this.pi) / 180;
  }

  @elanFunction(["radians"])
  radToDeg(r: number): number {
    return (r / this.pi) * 180;
  }

  @elanFunction(["a", "b"], FunctionOptions.pure, ElanInt)
  bitAnd(@elanIntType() a: number, @elanIntType() b: number): number {
    return a & b;
  }

  @elanFunction(["a", "b"], FunctionOptions.pure, ElanInt)
  bitOr(@elanIntType() a: number, @elanIntType() b: number): number {
    return a | b;
  }

  @elanFunction(["a", "b"], FunctionOptions.pure, ElanInt)
  bitXor(@elanIntType() a: number, @elanIntType() b: number): number {
    return a ^ b;
  }

  @elanFunction(["a"], FunctionOptions.pure, ElanInt)
  bitNot(@elanIntType() a: number): number {
    return ~a;
  }

  @elanFunction(["a"], FunctionOptions.pure, ElanInt)
  bitShiftL(@elanIntType() a: number, @elanIntType() shift: number): number {
    return a << shift;
  }

  @elanFunction(["a"], FunctionOptions.pure, ElanInt)
  bitShiftR(@elanIntType() a: number, @elanIntType() shift: number): number {
    return a >>> shift; // >>> is unsigned version of >>
  }

  @elanFunction([], FunctionOptions.pureExtension)
  asBinary(@elanIntType() a: number): string {
    return a.toString(2);
  }

  @elanFunction(["", "regExp"], FunctionOptions.pureExtension)
  matchesRegExp(a: string, r: RegExp): boolean {
    return r.test(a);
  }

  @elanFunction([], FunctionOptions.pureExtension)
  asRegExp(pattern: string): RegExp {
    return new RegExp(pattern, "");
  }
  /*   @elanFunction(["", "flags"], FunctionOptions.pureExtension)
  asRegExpWithFlags(pattern: string, flags: string): RegExp {
    return new RegExp(pattern, flags);
  } */

  //File operations
  @elanFunction([], FunctionOptions.impureAsync, ElanClass(TextFileReader))
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

  @elanFunction(["fileName"], FunctionOptions.pure, ElanClass(TextFileWriter))
  createFileForWriting(fileName: string): TextFileWriter {
    const tf = this.system.initialise(new TextFileWriter());
    tf.fileName = fileName;
    tf.status = 1;
    return tf;
  }

  // Graphics

  @elanProcedure([], ProcedureOptions.async)
  async waitForAnyKey() {
    return await this.system.elanInputOutput.waitForAnyKey();
  }

  @elanFunction([], FunctionOptions.impureAsync, ElanString)
  async getKey(): Promise<string> {
    return await this.system!.elanInputOutput.getKey();
  }

  @elanFunction([], FunctionOptions.impureAsync, ElanTuple([ElanString, ElanString]))
  async getKeyWithModifier(): Promise<[string, string]> {
    return await this.system!.elanInputOutput.getKeyWithModifier();
  }

  @elanProcedure([], ProcedureOptions.asyncExtension)
  async clearKeyBuffer(@elanClassType(GraphicsBase) _g: GraphicsBase) {
    await this.system!.elanInputOutput.clearKeyBuffer();
  }
}

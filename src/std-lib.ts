import "reflect-metadata";
import { ElanRuntimeError } from "./elan-runtime-error";
import {
  elanConstant,
  ElanFloat,
  ElanFunctionDescriptor,
  ElanFuncTypeDescriptor,
  ElanGenericTypeDescriptor,
  ElanInt,
  elanIntType,
  elanMethod,
  ElanProcedureDescriptor,
  ElanString,
  ElanTupleTypeDescriptor,
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

  // Standard colours

  @elanConstant(ElanInt)
  black = 0x000000;
  grey = 0x808080;
  white = 0xffffff;
  red = 0xff0000;
  green = 0x008000;
  blue = 0x0000ff;
  yellow = 0xffff00;
  brown = 0xa52a2a;

  private isValueType<T>(v: T) {
    return typeof v === "boolean" || typeof v === "string" || typeof v === "number";
  }

  @elanMethod(new ElanFunctionDescriptor(true))
  asString<T>(@elanType(new ElanGenericTypeDescriptor("T")) v: T | T[] | undefined): string {
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
  stringForUnicode(@elanIntType() n: number): string {
    return String.fromCharCode(n);
  }

  @elanMethod(new ElanFunctionDescriptor(true))
  asUnicode(s: string): number {
    return s.charCodeAt(0);
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T")),
    ),
  )
  asArray<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T"))) list: T[],
  ): T[] {
    const arr = [...list];
    (arr as unknown as hasHiddenType)._type = "Array";
    return arr;
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T")),
    ),
  )
  asList<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T"))) arr: T[],
  ): T[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "List";
    return list;
  }

  @elanMethod(
    new ElanFunctionDescriptor(false, true, false, new ElanTypeDescriptor("Iterable", ElanInt)),
  )
  range(@elanIntType() start: number, @elanIntType() end: number): number[] {
    const seq = [];
    for (let i = start; i <= end; i++) {
      seq.push(i);
    }
    (seq as unknown as hasHiddenType)._type = "Iterable";
    return seq;
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T")),
    ),
  )
  asIter<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T"))) arr: T[],
  ): T[] {
    const list = [...arr];
    (list as unknown as hasHiddenType)._type = "Iterable";
    return list as T[];
  }

  @elanMethod(new ElanFunctionDescriptor(true, true, false, new ElanGenericTypeDescriptor("T")))
  head<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T"))) arr: T[],
  ): T {
    return this.system.safeIndex(arr, 0);
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T1")),
    ),
  )
  keys<T>(
    @elanType(
      new ElanTypeDescriptor(
        "AbstractDictionary",
        new ElanGenericTypeDescriptor("T1"),
        new ElanGenericTypeDescriptor("T2"),
      ),
    )
    dict: {
      [key: string]: T;
    },
  ): string[] {
    const lst = Object.getOwnPropertyNames(dict).filter((s) => s !== "_type");
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T2")),
    ),
  )
  values<T>(
    @elanType(
      new ElanTypeDescriptor(
        "AbstractDictionary",
        new ElanGenericTypeDescriptor("T1"),
        new ElanGenericTypeDescriptor("T2"),
      ),
    )
    dict: {
      [key: string]: T;
    },
  ): T[] {
    const lst = this.keys(dict).map((k) => dict[k]);
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanMethod(new ElanFunctionDescriptor(true, true, false, new ElanTypeDescriptor("Boolean")))
  hasKey<T>(
    @elanType(
      new ElanTypeDescriptor(
        "AbstractDictionary",
        new ElanGenericTypeDescriptor("T1"),
        new ElanGenericTypeDescriptor("T2"),
      ),
    )
    dict: { [key: string]: T },
    @elanType(new ElanGenericTypeDescriptor("T1")) key: string,
  ): boolean {
    return this.keys(dict).includes(key);
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor(
        "ImmutableDictionary",
        new ElanGenericTypeDescriptor("T1"),
        new ElanGenericTypeDescriptor("T2"),
      ),
    ),
  )
  withRemoveAtKey<T>(
    @elanType(
      new ElanTypeDescriptor(
        "ImmutableDictionary",
        new ElanGenericTypeDescriptor("T1"),
        new ElanGenericTypeDescriptor("T2"),
      ),
    )
    dict: { [key: string]: T },
    @elanType(new ElanGenericTypeDescriptor("T1")) key: string,
  ) {
    const newDict = { ...dict };
    (newDict as unknown as hasHiddenType)._type = (dict as unknown as hasHiddenType)._type;
    delete newDict[key];
    return newDict;
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  removeAtKey<T>(
    @elanType(
      new ElanTypeDescriptor(
        "Dictionary",
        new ElanGenericTypeDescriptor("T1"),
        new ElanGenericTypeDescriptor("T2"),
      ),
    )
    dict: { [key: string]: T },
    @elanType(new ElanGenericTypeDescriptor("T1")) key: string,
  ) {
    delete dict[key];
  }

  @elanMethod(new ElanFunctionDescriptor(true, true, false, ElanInt))
  length<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T")))
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

  @elanMethod(new ElanFunctionDescriptor(true))
  upperCase(s1: string): string {
    return s1.toUpperCase();
  }

  @elanMethod(new ElanFunctionDescriptor(true))
  lowerCase(s1: string): string {
    return s1.toLowerCase();
  }

  @elanMethod(new ElanFunctionDescriptor())
  isBefore(s1: string, s2: string): boolean {
    return s1 < s2;
  }

  @elanMethod(new ElanFunctionDescriptor())
  isAfter(s1: string, s2: string): boolean {
    return s1 > s2;
  }

  @elanMethod(new ElanFunctionDescriptor())
  isAfterOrSameAs(s1: string, s2: string): boolean {
    return s1 > s2 || s1 === s2;
  }

  @elanMethod(new ElanFunctionDescriptor())
  isBeforeOrSameAs(s1: string, s2: string): boolean {
    return s1 < s2 || s1 === s2;
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T")),
    ),
  )
  withPutAt<T>(
    @elanType(new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanIntType() index: number,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
  ) {
    const newList = [...list];
    newList[index] = value;
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  putAt<T>(
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanIntType() index: number,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
  ) {
    this.system.safeArraySet(list, index, value);
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  putAt2D<T>(
    @elanType(
      new ElanTypeDescriptor(
        "Array",
        new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T")),
      ),
    )
    list: Array<Array<T>>,
    @elanIntType() col: number,
    @elanIntType() row: number,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
  ) {
    this.system.safeArraySet(list[col], row, value);
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  putAtKey<T>(
    @elanType(
      new ElanTypeDescriptor(
        "Dictionary",
        new ElanGenericTypeDescriptor("T1"),
        new ElanGenericTypeDescriptor("T2"),
      ),
    )
    dict: { [key: string]: T },
    @elanType(new ElanGenericTypeDescriptor("T1")) key: string,
    @elanType(new ElanGenericTypeDescriptor("T2")) value: T,
  ) {
    this.system.safeDictionarySet(dict, key, value);
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T")),
    ),
  )
  withInsert<T>(
    @elanType(new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanIntType() index: number,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 0, value);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  insertAt<T>(
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanIntType() index: number,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
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

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T")),
    ),
  )
  withRemoveAt<T>(
    @elanType(new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanIntType() index: number,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (list as any).toSpliced(index, 1);
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T")),
    ),
  )
  withRemoveFirst<T>(
    @elanType(new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
  ) {
    let newList = [...list];
    const index = this.elanIndexOf(newList, value);
    if (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
    }
    (newList as unknown as hasHiddenType)._type = "List";
    return newList;
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T")),
    ),
  )
  withRemoveAll<T>(
    @elanType(new ElanTypeDescriptor("List", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
  ) {
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

  @elanMethod(new ElanProcedureDescriptor(true))
  removeAt<T>(
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanIntType() index: number,
  ) {
    list.splice(index, 1);
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  removeFirst<T>(
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
  ) {
    const index = this.elanIndexOf(list, value);
    if (index > -1) {
      list.splice(index, 1);
    }
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  removeAll<T>(
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
  ) {
    let index = this.elanIndexOf(list, value);
    while (index > -1) {
      list.splice(index, 1);
      index = this.elanIndexOf(list, value);
    }
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  append<T>(
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
  ) {
    list.push(value);
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  appendList<T>(
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) listB: Array<T>,
  ) {
    list.push(...listB);
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  prepend<T>(
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
  ) {
    list.unshift(value);
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  prependList<T>(
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) list: Array<T>,
    @elanType(new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T"))) listB: Array<T>,
  ) {
    list.unshift(...listB);
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor(
        "ImmutableDictionary",
        new ElanGenericTypeDescriptor("T1"),
        new ElanGenericTypeDescriptor("T2"),
      ),
    ),
  )
  withPutAtKey<T>(
    @elanType(
      new ElanTypeDescriptor(
        "ImmutableDictionary",
        new ElanGenericTypeDescriptor("T1"),
        new ElanGenericTypeDescriptor("T2"),
      ),
    )
    dict: { [key: string]: T },
    @elanType(new ElanGenericTypeDescriptor("T1")) key: string,
    @elanType(new ElanGenericTypeDescriptor("T2")) value: T,
  ) {
    const newDict = { ...dict };
    newDict[key] = value;
    (newDict as unknown as hasHiddenType)._type = "ImmutableDictionary";
    return newDict;
  }

  @elanMethod(new ElanFunctionDescriptor(true, true, false, ElanInt))
  indexOf(s1: string, s2: string): number {
    return s1.indexOf(s2);
  }

  @elanMethod(new ElanFunctionDescriptor(true))
  trim(s: string): string {
    return s.trim();
  }

  @elanMethod(new ElanFunctionDescriptor(false, true, false, ElanInt))
  floor(n: number) {
    return Math.floor(n);
  }

  @elanMethod(new ElanFunctionDescriptor())
  round(n: number, @elanIntType() places: number): number {
    const shift = 10 ** places;
    return Math.floor(n * shift + 0.5) / shift;
  }

  @elanMethod(new ElanFunctionDescriptor(false, true, false, ElanInt))
  ceiling(n: number): number {
    const fl = this.floor(n);
    return n > fl ? fl + 1 : fl;
  }

  @elanMethod(new ElanFunctionDescriptor())
  typeAndProperties(
    @elanType(new ElanGenericTypeDescriptor("T")) o: { [key: string]: object },
  ): string {
    const type = o.constructor.name;
    const items = Object.getOwnPropertyNames(o);
    return `${type} [${items.map((n) => `"${n}":${o[n]}`).join(", ")}]`;
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T")),
    ),
  )
  filter<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T")))
    source: T[] | string,
    @elanType(
      new ElanFuncTypeDescriptor(
        [new ElanGenericTypeDescriptor("T")],
        new ElanTypeDescriptor("Boolean"),
      ),
    )
    predicate: (value: T | string) => boolean,
  ): (T | string)[] {
    const list = typeof source === "string" ? source.split("") : [...source];
    return this.asIter(list.filter(predicate));
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("U")),
    ),
  )
  map<T, U>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T")))
    source: T[] | string,
    @elanType(
      new ElanFuncTypeDescriptor(
        [new ElanGenericTypeDescriptor("T")],
        new ElanGenericTypeDescriptor("U"),
      ),
    )
    predicate: (value: T | string) => U,
  ) {
    const list = typeof source === "string" ? source.split("") : [...source];
    return this.asIter(list.map(predicate));
  }

  @elanMethod(new ElanFunctionDescriptor(true, true, false, new ElanGenericTypeDescriptor("U")))
  reduce<T, U>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T")))
    source: T[] | string,
    @elanType(new ElanGenericTypeDescriptor("U")) initValue: U,
    @elanType(
      new ElanFuncTypeDescriptor(
        [new ElanGenericTypeDescriptor("U"), new ElanGenericTypeDescriptor("T")],
        new ElanGenericTypeDescriptor("U"),
      ),
    )
    predicate: (s: U, value: T | string) => U,
  ): U {
    const list = typeof source === "string" ? source.split("") : [...source];
    return list.reduce(predicate, initValue);
  }

  @elanMethod(new ElanFunctionDescriptor(true))
  max(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanTypeDescriptor("Float"))) source: number[],
  ): number {
    return Math.max(...source);
  }

  @elanMethod(new ElanFunctionDescriptor(true, true, false, new ElanGenericTypeDescriptor("T")))
  maxBy<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T"))) source: T[],
    @elanType(
      new ElanFuncTypeDescriptor(
        [new ElanGenericTypeDescriptor("T")],
        new ElanTypeDescriptor("Float"),
      ),
    )
    predicate: (value: T) => number,
  ): T {
    const mm = source.map(predicate);
    const max = Math.max(...mm);
    const i = this.elanIndexOf(mm, max);
    return source[i];
  }

  @elanMethod(new ElanFunctionDescriptor(true))
  min(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanTypeDescriptor("Float"))) source: number[],
  ): number {
    return Math.min(...source);
  }

  @elanMethod(new ElanFunctionDescriptor(true, true, false, new ElanGenericTypeDescriptor("T")))
  minBy<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T"))) source: T[],
    @elanType(
      new ElanFuncTypeDescriptor(
        [new ElanGenericTypeDescriptor("T")],
        new ElanTypeDescriptor("Float"),
      ),
    )
    predicate: (value: T) => number,
  ): T {
    const mm = source.map(predicate);
    const min = Math.min(...mm);
    const i = this.elanIndexOf(mm, min);
    return source[i];
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T")),
    ),
  )
  sortBy<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T"))) source: T[],
    @elanType(
      new ElanFuncTypeDescriptor(
        [new ElanGenericTypeDescriptor("T"), new ElanGenericTypeDescriptor("T")],
        ElanInt,
      ),
    )
    predicate: (a: T, b: T) => number,
  ): T[] {
    const clone = [...source];
    return this.asIter(clone.sort(predicate));
  }

  @elanMethod(new ElanFunctionDescriptor(true))
  any<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T"))) source: T[],
    @elanType(
      new ElanFuncTypeDescriptor(
        [new ElanGenericTypeDescriptor("T")],
        new ElanTypeDescriptor("Boolean"),
      ),
    )
    predicate: (value: T) => boolean,
  ): boolean {
    return source.some(predicate);
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("U")),
    ),
  )
  groupBy<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T"))) source: T[],
    @elanType(
      new ElanFuncTypeDescriptor(
        [new ElanGenericTypeDescriptor("T")],
        new ElanGenericTypeDescriptor("U"),
      ),
    )
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

  @elanMethod(new ElanFunctionDescriptor(true))
  contains<T>(
    @elanType(new ElanTypeDescriptor("Iterable", new ElanGenericTypeDescriptor("T"))) source: T[],
    @elanType(new ElanGenericTypeDescriptor("T")) item: T,
  ): boolean {
    return source.includes(item);
  }

  @elanMethod(new ElanProcedureDescriptor(false, true))
  pause(@elanType(new ElanGenericTypeDescriptor("Int")) ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }

  @elanMethod(new ElanFunctionDescriptor(false, false, false, ElanInt))
  clock(): number {
    return new Date().getTime();
  }

  @elanMethod(new ElanFunctionDescriptor(false, false))
  random(): number {
    return Math.random();
  }

  @elanMethod(new ElanFunctionDescriptor(false, false, false, ElanInt))
  randomInt(@elanIntType() low: number, @elanIntType() high: number): number {
    return Math.floor(Math.random() * (high - low + 1)) + low;
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      false,
      true,
      false,
      new ElanTupleTypeDescriptor([
        new ElanTypeDescriptor("Boolean"),
        new ElanTypeDescriptor("Float"),
      ]),
    ),
  )
  parseAsFloat(s: string): [boolean, number] {
    const f = parseFloat(s);
    if (Number.isFinite(f)) {
      return [true, f];
    }
    return [false, 0];
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      false,
      true,
      false,
      new ElanTupleTypeDescriptor([new ElanTypeDescriptor("Boolean"), ElanInt]),
    ),
  )
  parseAsInt(s: string): [boolean, number] {
    const [b, f] = this.parseAsFloat(s);
    return [b, Math.floor(f)];
  }

  @elanMethod(new ElanProcedureDescriptor())
  print(s: string) {
    this.system.elanInputOutput.print(s);
  }

  @elanMethod(new ElanProcedureDescriptor())
  printTab(@elanIntType() position: number, s: string) {
    this.system.elanInputOutput.printTab(position, s);
  }

  @elanMethod(new ElanProcedureDescriptor())
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

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    ),
  )
  withBlock(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
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

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    ),
  )
  withUnicode(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
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

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    ),
  )
  withText(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
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

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    ),
  )
  withBackground(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
    map: BlockGraphics,
    @elanIntType() b: number,
  ): BlockGraphics {
    return this.initialisedGraphics(b);
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    ),
  )
  getChar(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
    map: BlockGraphics,
    @elanIntType() x: number,
    @elanIntType() y: number,
  ) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getDetails(cm, x, y), 0);
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    ),
  )
  getForeground(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
    map: BlockGraphics,
    @elanIntType() x: number,
    @elanIntType() y: number,
  ) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getDetails(cm, x, y), 1);
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      true,
      false,
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    ),
  )
  getBackground(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
    map: BlockGraphics,
    @elanIntType() x: number,
    @elanIntType() y: number,
  ) {
    const cm = this.ensureInitialised(map);
    return this.system.safeIndex(this.getDetails(cm, x, y), 2);
  }

  @elanMethod(new ElanProcedureDescriptor(true))
  clearGraphics(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
    map: BlockGraphics,
  ) {
    this.system.elanInputOutput.clearGraphics();
  }

  @elanMethod(new ElanProcedureDescriptor(true, true))
  draw(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
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

  @elanMethod(new ElanFunctionDescriptor(true, false, true, ElanString))
  getKeystroke(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
    map: BlockGraphics,
  ): Promise<string> {
    return this.system.elanInputOutput.getKeystroke();
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      true,
      false,
      true,
      new ElanTupleTypeDescriptor([ElanString, ElanString]),
    ),
  )
  getKeystrokeWithModifier(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
    map: BlockGraphics,
  ): Promise<[string, string]> {
    return this.system.elanInputOutput.getKeystrokeWithModifier();
  }

  @elanMethod(new ElanProcedureDescriptor(true, false))
  clearKeyBuffer(
    @elanType(
      new ElanTypeDescriptor("List", new ElanTupleTypeDescriptor([ElanString, ElanInt, ElanInt])),
    )
    map: BlockGraphics,
  ) {
    this.system.elanInputOutput.clearKeyBuffer();
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      false,
      true,
      false,
      new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T")),
    ),
  )
  createArray<T>(@elanIntType() x: number, @elanType(new ElanGenericTypeDescriptor("T")) value: T) {
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

  @elanMethod(
    new ElanFunctionDescriptor(
      false,
      true,
      false,
      new ElanTypeDescriptor(
        "Array",
        new ElanTypeDescriptor("Array", new ElanGenericTypeDescriptor("T")),
      ),
    ),
  )
  create2DArray<T>(
    @elanIntType() x: number,
    @elanIntType() y: number,
    @elanType(new ElanGenericTypeDescriptor("T")) value: T,
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

  @elanMethod(new ElanFunctionDescriptor(false, false, true, ElanString))
  inputString(prompt: string): Promise<string> {
    this.prompt(prompt);
    return this.system.input();
  }

  @elanMethod(new ElanFunctionDescriptor(false, false, true, ElanString))
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

  @elanMethod(new ElanFunctionDescriptor(false, false, true, ElanString))
  inputStringFromOptions(
    prompt: string,
    @elanType(new ElanTypeDescriptor("Array", ElanString)) options: string[],
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

  @elanMethod(new ElanFunctionDescriptor(false, false, true, ElanInt))
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

  @elanMethod(new ElanFunctionDescriptor(false, false, true, ElanInt))
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

  @elanMethod(new ElanFunctionDescriptor(false, false, true, ElanFloat))
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

  @elanMethod(new ElanFunctionDescriptor(false, false, true, ElanFloat))
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
  @elanMethod(
    new ElanFunctionDescriptor(true, true, false, new ElanTupleTypeDescriptor([ElanInt, ElanInt])),
  )
  next(
    @elanType(new ElanTupleTypeDescriptor([ElanInt, ElanInt])) current: [number, number],
  ): [number, number] {
    const u = current[0];
    const v = current[1];
    const u2 = 36969 * this.lo16(u) + u / 65536;
    const v2 = 18000 * this.lo16(v) + v / 65536;
    return [u2, v2];
  }

  @elanMethod(new ElanFunctionDescriptor(true, true, false, ElanFloat))
  value(
    @elanType(new ElanTupleTypeDescriptor([ElanInt, ElanInt])) current: [number, number],
  ): number {
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

  @elanMethod(new ElanFunctionDescriptor(true, true, false, ElanInt))
  valueInt(
    @elanType(new ElanTupleTypeDescriptor([ElanInt, ElanInt])) current: [number, number],
    @elanIntType() min: number,
    @elanIntType() max: number,
  ): number {
    const float = this.value(current);
    return Math.floor(float * (max - min + 1) + min);
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      false,
      false,
      false,
      new ElanTupleTypeDescriptor([ElanInt, ElanInt]),
    ),
  )
  firstRandomInFixedSequence(): [number, number] {
    return [521288629, 362436069];
  }

  @elanMethod(
    new ElanFunctionDescriptor(
      false,
      false,
      false,
      new ElanTupleTypeDescriptor([ElanInt, ElanInt]),
    ),
  )
  firstRandom(): [number, number] {
    const c = this.clock();
    return [this.hi16(c), this.lo16(c)];
  }

  @elanMethod(new ElanFunctionDescriptor(false, true, false, ElanInt))
  bitAnd(@elanIntType() a: number, @elanIntType() b: number): number {
    return a & b;
  }

  @elanMethod(new ElanFunctionDescriptor(false, true, false, ElanInt))
  bitOr(@elanIntType() a: number, @elanIntType() b: number): number {
    return a | b;
  }

  @elanMethod(new ElanFunctionDescriptor(false, true, false, ElanInt))
  bitXor(@elanIntType() a: number, @elanIntType() b: number): number {
    return a ^ b;
  }

  @elanMethod(new ElanFunctionDescriptor(false, true, false, ElanInt))
  bitNot(@elanIntType() a: number): number {
    return ~a;
  }

  @elanMethod(new ElanFunctionDescriptor(false, true, false, ElanInt))
  bitShiftL(@elanIntType() a: number, @elanIntType() shift: number): number {
    return a << shift;
  }

  @elanMethod(new ElanFunctionDescriptor(false, true, false, ElanInt))
  bitShiftR(@elanIntType() a: number, @elanIntType() shift: number): number {
    return a >>> shift;
  }

  @elanMethod(new ElanFunctionDescriptor(true))
  asBinary(@elanIntType() a: number): string {
    return a.toString(2);
  }

  @elanMethod(new ElanFunctionDescriptor(true))
  matchesRegex(a: string, r: RegExp): boolean {
    return r.test(a);
  }
  //File operations
  @elanMethod(
    new ElanFunctionDescriptor(
      false,
      false,
      true,
      new ElanTupleTypeDescriptor([ElanInt, ElanString, ElanInt]),
    ),
  )
  openRead(contents: string): File {
    return [1, contents, 0];
  }

  @elanMethod(new ElanFunctionDescriptor(true, false, true))
  readLine(
    @elanType(new ElanTupleTypeDescriptor([ElanInt, ElanString, ElanInt])) file: File,
  ): string {
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

  @elanMethod(new ElanFunctionDescriptor(true, true))
  endOfFile(
    @elanType(new ElanTupleTypeDescriptor([ElanInt, ElanString, ElanInt])) file: File,
  ): boolean {
    return file[2] >= file[1].length - 1;
  }

  @elanMethod(new ElanProcedureDescriptor(true, true))
  close(@elanType(new ElanTupleTypeDescriptor([ElanInt, ElanString, ElanInt])) file: File): void {
    //Does nothing for now.
  }
}

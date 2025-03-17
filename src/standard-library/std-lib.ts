import "reflect-metadata";
import { ElanCompilerError } from "../elan-compiler-error";
import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ElanBoolean,
  ElanClass,
  elanClassExport,
  elanClassType,
  elanConstant,
  ElanFloat,
  elanFunction,
  elanFuncType,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  ElanInt,
  elanIntType,
  elanProcedure,
  ElanString,
  elanStringType,
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
import { ElanArray } from "./elan-array";
import { ElanArray2D } from "./elan-array-2d";
import { GraphicsBase } from "./graphics-base";
import { LineVG } from "./line-vg";
import { List } from "./list";
import { Queue } from "./queue";
import { Random } from "./random";
import { RectangleVG } from "./rectangle-vg";
import { ElanSet } from "./set";
import { Stack } from "./stack";
import { TextFileReader } from "./text-file-reader";
import { TextFileWriter } from "./text-file-writer";
import { Turtle } from "./turtle";
import { VectorGraphics } from "./vector-graphics";
import { Dictionary } from "./dictionary";
import { DictionaryImmutable } from "./dictionary-immutable";

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

  @elanClassExport(ElanArray)
  Array = ElanArray;

  @elanClassExport(ElanArray2D)
  Array2D = ElanArray2D;

  @elanClassExport(List)
  List = List;

  @elanClassExport(Dictionary)
  Dictionary = Dictionary;

  @elanClassExport(DictionaryImmutable)
  DictionaryImmutable = DictionaryImmutable;

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
        case "Tuple":
          items = await convertList(v, this);
          return `tuple(${items})`;
        default:
          return await convertList(v, this);
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
      const items = Object.getOwnPropertyNames(v).filter((s) => s !== "_type");
      const o = v as { [key: string]: object };
      const dict = await convertDict(o, items, this);
      return `${dict}`;
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

  @elanFunction(["", "item"], FunctionOptions.pureExtension, ElanInt)
  indexOfItem(
    @elanStringType()
    s: string,
    @elanStringType()
    item: string,
  ): number {
    const ss = s.split("");
    return ss.indexOf(item);
  }

  @elanFunction(["start", "end"], FunctionOptions.pure, ElanClass(List, [ElanInt]))
  range(@elanIntType() start: number, @elanIntType() end: number): List<number> {
    const seq = [];
    for (let i = start; i <= end; i++) {
      seq.push(i);
    }
    return this.system.initialise(new List(seq));
  }

  @elanFunction(["match", "replacement"], FunctionOptions.pureExtension)
  replace(s1: string, match: string, replacement: string): string {
    return s1.replaceAll(match, replacement);
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanInt)
  length(coll: string) {
    return coll.length;
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

  @elanFunction(["", "targetString"], FunctionOptions.pureExtension, ElanInt)
  indexOf(s1: string, s2: string): number {
    return s1.indexOf(s2);
  }

  @elanFunction([], FunctionOptions.pureExtension)
  trim(s: string): string {
    return s.trim();
  }

  @elanFunction(["", "separator"], FunctionOptions.pureExtension, ElanClass(List))
  split(s: string, separator: string): List<string> {
    return this.system.initialise(new List(s.split(separator)));
  }

  @elanFunction(["", "separator"], FunctionOptions.pureExtension)
  join(@elanClassType(List, [ElanString]) list: List<string>, separator: string): string {
    return [...list].join(separator);
  }

  @elanFunction(["", "separator"], FunctionOptions.pureExtension)
  joinArray(@elanClassType(ElanArray, [ElanString]) list: List<string>, separator: string): string {
    return [...list].join(separator);
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

  @elanFunction(["", "lambdaOrFunctionRef"], FunctionOptions.pureAsyncExtension, ElanClass(List))
  async filter(
    @elanStringType()
    source: string,
    @elanFuncType([ElanString], ElanBoolean)
    predicate: (value: string) => Promise<boolean>,
  ): Promise<List<string>> {
    const list = source.split("");

    const asyncFilter = async (list: string[], predicate: (value: string) => Promise<boolean>) => {
      const results = await Promise.all(list.map(predicate));

      return list.filter((_v, index) => results[index]);
    };

    const result = await asyncFilter(list, predicate);

    return this.system.initialise(new List(result));
  }

  @elanFunction(["", "lambdaOrFunctionRef"], FunctionOptions.pureAsyncExtension, ElanClass(List))
  async map(
    @elanStringType()
    source: string,
    @elanFuncType([ElanString], ElanString)
    predicate: (value: string) => Promise<string>,
  ) {
    const list = source.split("");

    const results = await Promise.all(list.map(predicate));

    return this.system.initialise(new List(results));
  }

  @elanFunction(
    ["", "initialValue", "lambdaOrFunctionRef"],
    FunctionOptions.pureAsyncExtension,
    ElanT2,
  )
  async reduce<T2>(
    @elanStringType()
    source: string,
    @elanGenericParamT2Type() initValue: T2,
    @elanFuncType([ElanT2, ElanString], ElanT2)
    predicate: (s: T2, value: string) => Promise<T2>,
  ): Promise<T2> {
    const list = typeof source === "string" ? source.split("") : [...source];

    let acc: T2 = initValue;

    for (const i of list) {
      acc = await predicate(acc, i);
    }

    return acc;
  }

  @elanFunction([], FunctionOptions.pureExtension)
  max(@elanClassType(List, [ElanFloat]) source: List<number>): number {
    return Math.max(...source);
  }

  @elanFunction([], FunctionOptions.pureExtension)
  min(@elanClassType(List, [ElanFloat]) source: List<number>): number {
    return Math.min(...source);
  }

  @elanFunction(["", "lambdaOrFunctionRef"], FunctionOptions.pureAsyncExtension, ElanClass(List))
  async sortBy(
    source: string,
    @elanFuncType([ElanString, ElanString], ElanInt)
    predicate: (a: string, b: string) => Promise<number>,
  ): Promise<List<string>> {
    const clone = [...source];
    const results = await this.system.quickSort(clone, predicate);
    return this.system!.initialise(new List<string>(results));
  }

  @elanFunction(["", "item"], FunctionOptions.pureExtension)
  contains(source: string, item: string): boolean {
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

  @elanFunction(["size", "initialValue"], FunctionOptions.pure, ElanClass(ElanArray))
  createArray<T1>(@elanIntType() x: number, @elanGenericParamT1Type() value: T1) {
    if (!this.isValueType(value)) {
      throw new ElanRuntimeError(`Can only create array with simple value`);
    }

    const toInit = [];

    for (let i = 0; i < x; i++) {
      toInit[i] = value;
    }

    return this.system.initialise(new ElanArray<T1>(toInit));
  }

  @elanFunction(["columns", "rows", "initialValue"], FunctionOptions.pure, ElanClass(ElanArray2D))
  createArray2D<T1>(
    @elanIntType() x: number,
    @elanIntType() y: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    if (!this.isValueType(value)) {
      throw new ElanRuntimeError(`Can only initialise array with simple value`);
    }

    const toInit: T1[][] = [];
    toInit.length = x;

    for (let i = 0; i < x; i++) {
      const subArr: T1[] = [];
      subArr.length = y;
      for (let j = 0; j < y; j++) {
        subArr[j] = value;
      }
      toInit[i] = subArr;
    }

    return this.system.initialise(new ElanArray2D<T1>(toInit));
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
    @elanClassType(ElanArray) options: ElanArray<string>,
  ): Promise<string> {
    const s = await this.inputString(prompt);

    if (options.contains(s)) {
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

  // conversion

  @elanFunction([], FunctionOptions.pureExtension, ElanClass(List))
  arrayAsList<T1>(@elanClassType(ElanArray) arr: ElanArray<T1>): List<T1> {
    const list = [...arr];
    return new List(list);
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanClass(ElanSet))
  arrayAsSet<T1>(@elanClassType(ElanArray) arr: ElanArray<T1>): ElanSet<T1> {
    const set = this.system.initialise(new ElanSet<T1>());
    return set.addFromArray(arr);
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanClass(ElanArray))
  listAsArray<T1>(@elanClassType(List) list: List<T1>): ElanArray<T1> {
    const newList = [...list];
    return this.system.initialise(new ElanArray(newList));
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanClass(ElanSet))
  listAsSet<T1>(@elanClassType(List) arr: List<T1>): ElanSet<T1> {
    const set = this.system.initialise(new ElanSet<T1>());
    return set.addFromArray(this.listAsArray(arr));
  }
}

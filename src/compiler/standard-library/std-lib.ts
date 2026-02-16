import "reflect-metadata";
import { ElanInputOutput } from "../compiler-interfaces/elan-input-output";
import { ElanCompilerError } from "../elan-compiler-error";
import {
  ElanBoolean,
  ElanClass,
  ElanFloat,
  ElanInt,
  ElanString,
  ElanT1Constrained,
  ElanTuple,
  FunctionOptions,
  ProcedureOptions,
  elanAnyType,
  elanClassExport,
  elanClassType,
  elanConstant,
  elanFloatType,
  elanFunction,
  elanGenericParamT1Type,
  elanIntType,
  elanProcedure,
  elanStringType,
} from "../elan-type-annotations";
import { System } from "../system";
import { CircleVG } from "./circle-vg";
import { Dictionary } from "./dictionary";
import { ElanArray2D } from "./elan-array-2d";
import { ElanRuntimeError } from "./elan-runtime-error";
import { ElanSet } from "./elan-set";
import { ImageVG } from "./image-vg";
import { LineVG } from "./line-vg";
import { List } from "./list";
import { Optional } from "./optional";
import { Queue } from "./queue";
import { Random } from "./random";
import { RawVG } from "./raw-vg";
import { RectangleVG } from "./rectangle-vg";
import { Ref } from "./ref";
import { Stack } from "./stack";
import { TextFileReader } from "./text-file-reader";
import { TextFileWriter } from "./text-file-writer";
import { Turtle } from "./turtle";
import { VectorGraphic } from "./vector-graphic";

export class StdLib {
  constructor(io: ElanInputOutput) {
    this.system = new System(io);
  }

  static readonly negatableLitIntOnly = /^\s*-?((0b[0-1]+)|(0x[0-9a-fA-F]+)|([0-9]+))$/;
  static readonly negatableLitFloatOnly = /^\s*-?[0-9]+(\.[0-9]+)?((e|E)[+-]?[0-9]+)?$/;

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

  @elanClassExport(Turtle)
  Turtle = Turtle;

  @elanClassExport(VectorGraphic)
  VectorGraphic = VectorGraphic;

  @elanClassExport(CircleVG)
  CircleVG = CircleVG;

  @elanClassExport(LineVG)
  LineVG = LineVG;

  @elanClassExport(RectangleVG)
  RectangleVG = RectangleVG;

  @elanClassExport(ImageVG)
  ImageVG = ImageVG;

  @elanClassExport(RawVG)
  RawVG = RawVG;

  @elanClassExport(List)
  List = List;

  @elanClassExport(ElanArray2D)
  Array2D = ElanArray2D;

  @elanClassExport(Dictionary)
  Dictionary = Dictionary;

  @elanClassExport(Ref)
  Ref = Ref;

  @elanClassExport(Optional)
  Optional = Optional;

  // Standard colours

  @elanConstant(ElanInt) black = 0x000000;
  @elanConstant(ElanInt) grey = 0x808080;
  @elanConstant(ElanInt) white = 0xffffff;
  @elanConstant(ElanInt) red = 0xff0000;
  @elanConstant(ElanInt) green = 0x008000;
  @elanConstant(ElanInt) blue = 0x0000ff;
  @elanConstant(ElanInt) yellow = 0xffff00;
  @elanConstant(ElanInt) brown = 0xa52a2a;
  @elanConstant(ElanInt) transparent = -1;

  @elanConstant(ElanBoolean) true = true;
  @elanConstant(ElanBoolean) false = false;

  @elanConstant() pi: number = Math.PI;
  @elanConstant(ElanInt) meaningOfLife = 42;

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

    if (Array.isArray(v)) {
      // tuple
      const items: string[] = [];

      for (const i of v) {
        const s = await this.asString(i);
        items.push(s);
      }
      if (items.length < 2) {
        // TODO fix
        // this handles case of outParameter wrapped in array
        // need better fix but for moment just return value;
        return items.join("");
      }

      return `tuple(${items.join(", ")})`;
    }

    if (typeof v === "object" && "asString" in v) {
      return await (v.asString as () => Promise<string>)();
    }

    if (typeof v === "object") {
      return `a ${v.constructor.name}`;
    }

    if (typeof v === "function") {
      return `function ${v.name}`;
    }

    throw new ElanCompilerError("Not implemented: " + typeof v);
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanBoolean)
  isSameValueAs<T1>(
    @elanGenericParamT1Type() v1: T1 | T1[] | undefined,
    @elanGenericParamT1Type() v2: T1 | T1[] | undefined,
  ): boolean {
    return this.system.objectEquals(v1, v2);
  }

  @elanFunction([], FunctionOptions.pureExtension, ElanBoolean)
  isSameReferenceAs<T1>(
    @elanGenericParamT1Type() v1: T1 | T1[] | undefined,
    @elanGenericParamT1Type() v2: T1 | T1[] | undefined,
  ): boolean {
    return v1 === v2;
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
  indexOf(
    @elanStringType()
    s: string,
    @elanStringType()
    item: string,
  ): number {
    return s.indexOf(item);
  }

  @elanFunction(["start", "end", "step"], FunctionOptions.pure, ElanClass(List, [ElanInt]))
  sequence(
    @elanIntType() start: number,
    @elanIntType() end: number,
    @elanIntType() step: number,
  ): List<number> {
    const seq = [];
    if (step === 0) {
      throw new ElanRuntimeError("value for step cannot be zero");
    } else if (step > 0) {
      for (let i = start; i <= end; i = i + step) {
        seq.push(i);
      }
    } else if (step < 0) {
      if (start < end) {
        throw new ElanRuntimeError(
          "Loop will not terminate when start < end start with negative step",
        );
      }
      for (let i = start; i >= end; i = i + step) {
        seq.push(i);
      }
    }
    return this.system.initialise(new List(seq));
  }

  @elanFunction(["instance", "match", "replacement"], FunctionOptions.pureExtension)
  replace(instance: string, match: string, replacement: string): string {
    return instance.replaceAll(match, replacement);
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

  @elanFunction(["instance", "other"], FunctionOptions.pureExtension)
  isBefore(instance: string, other: string): boolean {
    return instance < other;
  }

  @elanFunction(["instance", "other"], FunctionOptions.pureExtension)
  isAfter(instance: string, other: string): boolean {
    return instance > other;
  }

  @elanFunction(["instance", "other"], FunctionOptions.pureExtension)
  isAfterOrSameAs(instance: string, other: string): boolean {
    return instance > other || instance === other;
  }

  @elanFunction(["instance", "other"], FunctionOptions.pureExtension)
  isBeforeOrSameAs(instance: string, other: string): boolean {
    return instance < other || instance === other;
  }

  @elanFunction([], FunctionOptions.pureExtension)
  trim(s: string): string {
    return s.trim();
  }

  @elanFunction(["", "separator"], FunctionOptions.pureExtension, ElanClass(List, [ElanString]))
  split(s: string, separator: string): List<string> {
    return this.system.initialise(new List(s.split(separator)));
  }

  @elanFunction(["number", "number"], FunctionOptions.pure, ElanInt)
  divAsInt(n1: number, n2: number) {
    return Math.floor(n1 / n2);
  }

  @elanFunction(["number", "number"], FunctionOptions.pure, ElanFloat)
  divAsFloat(n1: number, n2: number) {
    return n1 / n2;
  }

  @elanFunction(["number", "number"], FunctionOptions.pure, ElanFloat)
  power(n1: number, n2: number) {
    return Math.pow(n1, n2);
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

  @elanFunction(["listOfFloat"], FunctionOptions.pure, ElanFloat)
  maxFloat(@elanClassType(List, [ElanFloat]) source: List<number>): number {
    return Math.max(...source);
  }

  @elanFunction(["listOfInt"], FunctionOptions.pure, ElanInt)
  maxInt(@elanClassType(List, [ElanInt]) source: List<number>): number {
    return Math.max(...source);
  }

  @elanFunction(["listOfFloat"], FunctionOptions.pure, ElanFloat)
  minFloat(@elanClassType(List, [ElanFloat]) source: List<number>): number {
    return Math.min(...source);
  }

  @elanFunction(["listOfInt"], FunctionOptions.pure, ElanInt)
  minInt(@elanClassType(List, [ElanInt]) source: List<number>): number {
    return Math.min(...source);
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
    if (StdLib.negatableLitFloatOnly.test(s)) {
      const f = parseFloat(s);
      if (Number.isFinite(f)) {
        return this.system.tuple([true, f]) as [boolean, number];
      }
    }
    return this.system.tuple([false, 0]) as [boolean, number];
  }

  @elanFunction(["string"], FunctionOptions.pure, ElanTuple([ElanBoolean, ElanInt]))
  parseAsInt(s: string): [boolean, number] {
    if (StdLib.negatableLitIntOnly.test(s)) {
      const i = parseInt(s);
      if (isFinite(i)) {
        return this.system.tuple([true, i]) as [boolean, number];
      }
    }
    return this.system.tuple([false, 0]) as [boolean, number];
  }

  @elanProcedure(["any"], ProcedureOptions.async)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async print(@elanAnyType() s: any) {
    await this.system.elanInputOutput.print(`${await this.system.asString(s)}\n`);
  }

  @elanProcedure(["any"], ProcedureOptions.async)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async printNoLine(@elanAnyType() s: any) {
    await this.system.elanInputOutput.print(await this.system.asString(s));
  }

  @elanProcedure(["position", "any"], ProcedureOptions.async)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async printTab(@elanIntType() position: number, @elanAnyType() s: any) {
    await this.system.elanInputOutput.printTab(position, await this.system.asString(s));
  }

  @elanProcedure([], ProcedureOptions.async)
  async clearPrintedText() {
    await this.system.elanInputOutput.clearPrintedText();
  }

  @elanProcedure([], ProcedureOptions.async)
  async clearAllDisplays() {
    await this.clearPrintedText();
    await this.clearBlocks();
    await this.clearVectorGraphics();
    await this.clearHtml();
  }

  @elanFunction(["size", "initialValue"], FunctionOptions.pure, ElanClass(List))
  createList<T1>(@elanIntType() x: number, @elanGenericParamT1Type() value: T1) {
    if (!this.isValueType(value)) {
      throw new ElanRuntimeError(`Can only create List with simple value`);
    }

    const toInit = [];

    for (let i = 0; i < x; i++) {
      toInit[i] = value;
    }

    return this.system.initialise(new List<T1>(toInit));
  }

  //Input functions
  private async prompt(prompt: string) {
    await this.print(prompt);
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
    @elanClassType(List, [ElanString]) options: List<string>,
  ): Promise<string> {
    const s = await this.inputString(prompt);

    if (options.contains(s)) {
      return s;
    }
    const valid = await options.asString();
    await this.prompt(`response must be one of ${valid}`);
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

  @elanFunction(["value", "places"], FunctionOptions.pure, ElanInt)
  bitShiftL(@elanIntType() value: number, @elanIntType() shift: number): number {
    return value << shift;
  }

  @elanFunction(["value", "places"], FunctionOptions.pure, ElanInt)
  bitShiftR(@elanIntType() value: number, @elanIntType() places: number): number {
    return value >>> places; // >>> is unsigned version of >>
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
  @elanProcedure(["prompt"], ProcedureOptions.async)
  async pressAnyKeyToContinue(prompt: boolean) {
    if (prompt) {
      await this.prompt("Press any key to continue");
    }
    await this.waitForKey();
    return;
  }

  @elanFunction([], FunctionOptions.impureAsync, ElanString)
  async waitForKey(): Promise<string> {
    return await this.system!.elanInputOutput.waitForKey();
  }

  @elanFunction([], FunctionOptions.impureAsync, ElanString)
  async getKey(): Promise<string> {
    return await this.system!.elanInputOutput.getKey();
  }

  // If any key 0-9 is pressed, returns that integer. If no key, or any other key, is pressed, returns -1
  @elanFunction([], FunctionOptions.impureAsync, ElanInt)
  async getNumericKey(): Promise<number> {
    const key = await this.getKey();
    return key === "" ? -1 : "0123456789".indexOf(key);
  }

  @elanFunction([], FunctionOptions.impureAsync, ElanTuple([ElanString, ElanString]))
  async getKeyWithModifier(): Promise<[string, string]> {
    return await this.system!.elanInputOutput.getKeyWithModifier();
  }

  @elanProcedure([], ProcedureOptions.async)
  async clearKeyBuffer() {
    await this.system!.elanInputOutput.clearKeyBuffer();
  }
  //Block graphics
  @elanFunction([""], FunctionOptions.pureExtension)
  blocksAsHtml(@elanClassType(ElanArray2D, [ElanInt]) blocks: ElanArray2D<number>): string {
    let rendered = ``;

    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 40; x++) {
        const colour = blocks.read(x, y);
        rendered = `${rendered}<div style="background-color:${this.asHex(colour)};"></div>`;
      }
    }
    return rendered;
  }

  private asHex(n: number): string {
    const h = "000000" + n.toString(16);
    const h6 = h.substring(h.length - 6);
    return `#${h6}`;
  }

  @elanProcedure(["blocks"], ProcedureOptions.async)
  async displayBlocks(
    @elanClassType(ElanArray2D, [ElanInt]) blocks: ElanArray2D<number>,
  ): Promise<void> {
    if (blocks.columns() !== 40 || blocks.rows() !== 30) {
      throw new ElanRuntimeError(`argument must be Array2D<of Int> with dimensions 40 x 30`);
    }
    const html = this.blocksAsHtml(blocks);
    return await this.system!.elanInputOutput.drawBlockGraphics(html);
  }

  @elanProcedure([], ProcedureOptions.async)
  async clearBlocks() {
    await this.system!.elanInputOutput.clearBlockGraphics();
  }

  @elanFunction(
    [],
    FunctionOptions.pureAsync,
    ElanClass(List, [ElanT1Constrained(ElanClass(VectorGraphic))]),
  )
  async createListOfVectorGraphics(): Promise<List<VectorGraphic>> {
    return this.system.initialise(await new List<VectorGraphic>()._initialise());
  }

  @elanFunction(["colour"], FunctionOptions.pureAsync, ElanClass(ElanArray2D, [ElanInt]))
  async createBlockGraphics(@elanIntType() colour: number): Promise<ElanArray2D<number>> {
    return this.system.initialise(await new ElanArray2D<number>()._initialise(40, 30, colour));
  }

  @elanFunction([""], FunctionOptions.pureExtension)
  vectorGraphicsAsHtml<T extends VectorGraphic>(
    @elanClassType(List, [ElanT1Constrained(ElanClass(VectorGraphic))]) vgs: List<T>,
  ): string {
    let content = ``;
    for (let i = 0; i < vgs.length(); i++) {
      const vg = vgs.read(i);
      content = content + vg.asSVG() + "\n";
    }
    const html = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">\n${content}</svg>\n`;
    return html;
  }

  @elanProcedure(["listOfVGs"], ProcedureOptions.async)
  async displayVectorGraphics<T extends VectorGraphic>(
    @elanClassType(List, [ElanT1Constrained(ElanClass(VectorGraphic))]) vgs: List<T>,
  ): Promise<void> {
    const html = this.vectorGraphicsAsHtml(vgs);
    return await this.system!.elanInputOutput.drawVectorGraphics(html);
  }

  @elanProcedure([], ProcedureOptions.async)
  async clearVectorGraphics() {
    await this.system!.elanInputOutput.clearVectorGraphics();
  }

  @elanProcedure(["html"], ProcedureOptions.async)
  async displayHtml(html: string): Promise<void> {
    return await this.system!.elanInputOutput.drawHtml(html);
  }

  @elanProcedure([], ProcedureOptions.async)
  async clearHtml(): Promise<void> {
    return await this.system!.elanInputOutput.clearHtml();
  }

  @elanProcedure(["durationMs", "frequencyHz", "volume"], ProcedureOptions.async)
  async tone(
    @elanIntType() duration: number,
    @elanFloatType() frequency: number,
    @elanFloatType() volume: number,
  ) {
    await this.system!.elanInputOutput.tone(duration, frequency, volume);
  }
}

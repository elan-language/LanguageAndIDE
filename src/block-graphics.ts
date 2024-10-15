import { ElanRuntimeError } from "./elan-runtime-error";
import {
  ElanClass,
  elanFunction,
  ElanInt,
  elanIntType,
  elanProcedure,
  ElanString,
  ElanTuple,
  FunctionOptions,
  ProcedureOptions,
} from "./elan-type-annotations";
import { System } from "./system";

export class BlockGraphics {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new BlockGraphics();
  }

  constructor() {
    this.internalRep = this.initialisedGraphics(0xffffff);
  }

  private system?: System;

  private internalRep: [string, number, number][];

  private xSize = 40;
  private ySize = 30;

  GraphicsLength = this.xSize * this.ySize;

  initialisedGraphics(background: number) {
    const emptyMap: [string, number, number][] = [];
    const emptyLocation: [string, number, number] = ["", 0x000000, background];
    for (let x = 0; x < this.xSize; x++) {
      for (let y = 0; y < this.ySize; y++) {
        emptyMap.push(emptyLocation);
      }
    }
    return emptyMap;
  }

  private idx(x: number, y: number) {
    if (x < 0 || x >= this.xSize || y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`Out of range index`);
    }
    return x * this.ySize + y;
  }

  private ensureInitialised() {
    if (this.internalRep.length !== this.GraphicsLength) {
      this.internalRep = this.initialisedGraphics(0xffffff);
    }
  }

  private putDetails(
    x: number,
    y: number,
    char: string,
    foreground: number,
    background: number,
  ): BlockGraphics {
    this.ensureInitialised();
    this.internalRep[this.idx(x, y)] = [char, foreground, background];
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  throwRangeError(toIndex: any, index: any) {
    const size = toIndex.length;
    if (size !== undefined) {
      throw new ElanRuntimeError(`Out of range index: ${index} size: ${size}`);
    }
    throw new ElanRuntimeError(`No such key: ${index}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  safeIndex(indexable: [string, number, number][] | [string, number, number], index: number) {
    if (indexable === undefined) {
      throw new ElanRuntimeError(`Out of range index`);
    }

    const r = indexable[index];

    if (r === undefined) {
      this.throwRangeError(indexable, index);
    }

    return r;
  }

  private getDetails(x: number, y: number): [string, number, number] {
    this.ensureInitialised();
    return this.safeIndex(this.internalRep, this.idx(x, y)) as [string, number, number];
  }

  @elanFunction(FunctionOptions.pure, ElanClass(BlockGraphics))
  withBlock(@elanIntType() x: number, @elanIntType() y: number, @elanIntType() b: number) {
    if (x < 0 || x >= this.xSize) {
      throw new ElanRuntimeError(`x value ${x} is outside range 0 to ${this.xSize - 1}`);
    }
    if (y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`y value ${y} is outside of range 0 to ${this.ySize - 1}`);
    }
    this.ensureInitialised();
    const [c, f] = this.getDetails(x, y);
    return this.putDetails(x, y, "", f, b);
  }

  @elanFunction(FunctionOptions.pure, ElanClass(BlockGraphics))
  withUnicode(
    @elanIntType() x: number,
    @elanIntType() y: number,
    @elanIntType() unicode: number,
    @elanIntType() f: number,
    @elanIntType() b: number,
  ): BlockGraphics {
    if (x < 0 || x >= this.xSize) {
      throw new ElanRuntimeError(`x value ${x} is outside range 0 to ${this.xSize - 1}`);
    }
    if (y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`y value ${y} is outside of range 0 to ${this.ySize - 1}`);
    }
    this.ensureInitialised();
    const str = String.fromCharCode(unicode);
    return this.putDetails(x, y, str, f, b);
  }

  @elanFunction(FunctionOptions.pure, ElanClass(BlockGraphics))
  withText(
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
    this.ensureInitialised();
    for (let i = 0; i < text.length; i++) {
      if (x + i < this.xSize) {
        this.putDetails(x + i, y, text[i], foreground, background);
      } else {
        const newX = (x + i) % this.xSize;
        const newY = (y + Math.floor((x + i) / this.xSize)) % this.ySize;
        if (newY >= this.ySize) {
          throw new ElanRuntimeError(`'${text} is too long to fit from point ${x},${y} onwards'`);
        }
        this.putDetails(newX, newY, text[i], foreground, background);
      }
    }
    return this;
  }

  @elanFunction(FunctionOptions.pureExtension, ElanClass(BlockGraphics))
  withBackground(@elanIntType() b: number): BlockGraphics {
    this.initialisedGraphics(b);
    return this;
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  getChar(@elanIntType() x: number, @elanIntType() y: number) {
    this.ensureInitialised();
    return this.safeIndex(this.getDetails(x, y), 0);
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  getForeground(@elanIntType() x: number, @elanIntType() y: number): number {
    this.ensureInitialised();
    return this.safeIndex(this.getDetails(x, y), 1) as number;
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  getBackground(@elanIntType() x: number, @elanIntType() y: number): number {
    this.ensureInitialised();
    return this.safeIndex(this.getDetails(x, y), 2) as number;
  }

  @elanProcedure()
  clearGraphics() {
    this.system!.elanInputOutput.clearGraphics();
  }

  pause(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }

  @elanProcedure(ProcedureOptions.async)
  draw(): Promise<void> {
    this.ensureInitialised();
    let rendered = "";

    for (let y = 0; y < this.ySize; y++) {
      for (let x = 0; x < this.xSize; x++) {
        const [c, f, b] = this.getDetails(x, y);
        rendered = `${rendered}<div style="color:${this.asHex(f)};background-color:${this.asHex(b)};">${c}</div>`;
      }
    }
    this.system!.elanInputOutput.drawGraphics(rendered);
    return this.pause(0);
  }

  private asHex(n: number): string {
    const h = "000000" + n.toString(16);
    const h6 = h.substring(h.length - 6);
    return `#${h6}`;
  }

  @elanFunction(FunctionOptions.impureAsync, ElanString)
  getKeystroke(): Promise<string> {
    return this.system!.elanInputOutput.getKeystroke();
  }

  @elanFunction(FunctionOptions.impureAsync, ElanTuple([ElanString, ElanString]))
  getKeystrokeWithModifier(): Promise<[string, string]> {
    return this.system!.elanInputOutput.getKeystrokeWithModifier();
  }

  @elanProcedure()
  clearKeyBuffer() {
    this.system!.elanInputOutput.clearKeyBuffer();
  }
}

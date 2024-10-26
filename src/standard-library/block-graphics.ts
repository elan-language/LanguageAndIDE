import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ClassOptions,
  elanClass,
  ElanClass,
  elanFunction,
  elanProcedure,
  ElanInt,
  elanIntType,
  FunctionOptions,
  ProcedureOptions,
  elanClassType,
} from "../elan-type-annotations";
import { System } from "../system";
import { GraphicsBase } from "./graphics-base";

@elanClass(ClassOptions.record, [], [], [ElanClass(GraphicsBase)])
export class BlockGraphics extends GraphicsBase {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new BlockGraphics();
  }

  constructor() {
    super();
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

  private withDetails(
    x: number,
    y: number,
    char: string,
    foreground: number,
    background: number,
  ): BlockGraphics {
    const copy = this.system!.initialise(new BlockGraphics());
    copy.internalRep = this.internalRep;
    copy.internalRep[this.idx(x, y)] = [char, foreground, background];
    return copy;
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
    return this.safeIndex(this.internalRep, this.idx(x, y)) as [string, number, number];
  }

  @elanFunction(FunctionOptions.pure, ElanClass(BlockGraphics))
  withBlock(@elanIntType() x: number, @elanIntType() y: number, @elanIntType() colour: number) {
    if (x < 0 || x >= this.xSize) {
      throw new ElanRuntimeError(`x value ${x} is outside range 0 to ${this.xSize - 1}`);
    }
    if (y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`y value ${y} is outside of range 0 to ${this.ySize - 1}`);
    }
    const [, f] = this.getDetails(x, y);
    return this.withDetails(x, y, "", f, colour);
  }

  @elanFunction(FunctionOptions.pure, ElanClass(BlockGraphics))
  withUnicode(
    @elanIntType() x: number,
    @elanIntType() y: number,
    @elanIntType() unicode: number,
    @elanIntType() foreColour: number,
    @elanIntType() backColour: number,
  ): BlockGraphics {
    if (x < 0 || x >= this.xSize) {
      throw new ElanRuntimeError(`x value ${x} is outside range 0 to ${this.xSize - 1}`);
    }
    if (y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`y value ${y} is outside of range 0 to ${this.ySize - 1}`);
    }
    const str = String.fromCharCode(unicode);
    return this.withDetails(x, y, str, foreColour, backColour);
  }

  @elanFunction(FunctionOptions.pure, ElanClass(BlockGraphics))
  withText(
    @elanIntType() x: number,
    @elanIntType() y: number,
    text: string,
    @elanIntType() foreColour: number,
    @elanIntType() backColour: number,
  ) {
    if (x < 0 || x >= this.xSize) {
      throw new ElanRuntimeError(`x value ${x} is outside range 0 to ${this.xSize - 1}`);
    }
    if (y < 0 || y >= this.ySize) {
      throw new ElanRuntimeError(`y value ${y} is outside of range 0 to ${this.ySize - 1}`);
    }
    for (let i = 0; i < text.length; i++) {
      if (x + i < this.xSize) {
        this.withDetails(x + i, y, text[i], foreColour, backColour);
      } else {
        const newX = (x + i) % this.xSize;
        const newY = (y + Math.floor((x + i) / this.xSize)) % this.ySize;
        if (newY >= this.ySize) {
          throw new ElanRuntimeError(`'${text} is too long to fit from point ${x},${y} onwards'`);
        }
        this.withDetails(newX, newY, text[i], foreColour, backColour);
      }
    }
    return this;
  }

  @elanFunction(FunctionOptions.pure, ElanClass(BlockGraphics))
  withBackground(@elanIntType() colour: number): BlockGraphics {
    const copy = this.system!.initialise(new BlockGraphics());
    copy.internalRep = this.internalRep;
    for (let x = 0; x < this.xSize; x++) {
      for (let y = 0; y < this.ySize; y++) {
        const id = this.idx(x, y);
        const existing = copy.internalRep[id];
        copy.internalRep[id] = [existing[0], existing[1], colour];
      }
    }
    return copy;
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  getChar(@elanIntType() x: number, @elanIntType() y: number) {
    return this.safeIndex(this.getDetails(x, y), 0);
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  getForeground(@elanIntType() x: number, @elanIntType() y: number): number {
    return this.safeIndex(this.getDetails(x, y), 1) as number;
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  getBackground(@elanIntType() x: number, @elanIntType() y: number): number {
    return this.safeIndex(this.getDetails(x, y), 2) as number;
  }

  pause(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }

  @elanFunction(FunctionOptions.pure)
  asHtml(): string {
    let rendered = "";

    for (let y = 0; y < this.ySize; y++) {
      for (let x = 0; x < this.xSize; x++) {
        const [c, f, b] = this.getDetails(x, y);
        rendered = `${rendered}<div style="color:${this.asHex(f)};background-color:${this.asHex(b)};">${c}</div>`;
      }
    }
    return rendered;
  }

  private asHex(n: number): string {
    const h = "000000" + n.toString(16);
    const h6 = h.substring(h.length - 6);
    return `#${h6}`;
  }

  @elanProcedure(ProcedureOptions.async)
  display(): Promise<void> {
    const html = this.asHtml();
    this.system!.elanInputOutput.drawGraphics(html);
    return this.pause(0);
  }
}

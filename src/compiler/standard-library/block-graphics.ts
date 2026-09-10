import {
  ClassOption,
  ElanClass,
  elanClass,
  elanFunction,
  ElanInt,
  elanIntType,
  elanProcedure,
  FunctionOptions,
  ProcedureOptions,
} from "../elan-type-annotations";
import { System } from "../system";

@elanClass(ClassOption.concrete)
export class BlockGraphics {
  // this must = implemented by hand on all stdlib classes
  static emptyInstance() {
    return new BlockGraphics();
  }

  async _initialise() {
    return this;
  }

  constructor(arr?: number[][]) {
    this.blocks = arr ? [...arr] : this.generateSingleColourGrid(0xffffff);
  }

  private blocks: number[][];

  private system?: System;

  private generateSingleColourGrid(colour: number): number[][] {
    const blocks: number[][] = [];
    for (let i = 0; i < 40; i++) {
      const subArr = [];
      for (let j = 0; j < 30; j++) {
        subArr.push(colour);
      }
      blocks.push(subArr);
    }
    return blocks;
  }

  private copyOfContents(): number[][] {
    const blocks: number[][] = [];
    for (let i = 0; i < 40; i++) {
      const subArr = [];
      for (let j = 0; j < 30; j++) {
        subArr.push(this.blocks[i][j]);
      }
      blocks.push(subArr);
    }
    return blocks;
  }

  @elanProcedure([], ProcedureOptions.async)
  async display(): Promise<void> {
    let html = ``;
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 40; x++) {
        //const colour = blocks.read(x, y);
        const colour = this.blocks[x][y];
        html = `${html}<div style="background-color:${this.asHex(colour)};"></div>`;
      }
    }
    return await this.system!.elanInputOutput.drawBlockGraphics(html);
  }

  private asHex(n: number): string {
    const h = "000000" + n.toString(16);
    const h6 = h.substring(h.length - 6);
    return `#${h6}`;
  }

  //Procedures
  @elanProcedure(["col", "row", "colour"])
  put(@elanIntType() x: number, @elanIntType() y: number, @elanIntType() colour: number) {
    this.blocks[x][y] = colour;
  }

  @elanProcedure(["blockNo", "colour"])
  putBlockNo(@elanIntType() sq: number, @elanIntType() colour: number) {
    this.blocks[this.col(sq)][this.row(sq)] = colour;
  }

  @elanProcedure(["colour"])
  colourAll(@elanIntType() colour: number) {
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 40; x++) {
        this.put(x, y, colour);
      }
    }
  }

  //Functions
  @elanFunction(["col", "row"], FunctionOptions.pure, ElanInt)
  get(@elanIntType() x: number, @elanIntType() y: number): number {
    return this.blocks[x][y];
  }

  @elanFunction(["blockNo"], FunctionOptions.pure, ElanInt)
  getBlockNo(@elanIntType() sq: number): number {
    return this.blocks[this.col(sq)][this.row(sq)];
  }

  @elanFunction(["col", "row", "colour"], FunctionOptions.pure, ElanClass(BlockGraphics))
  withPut(
    @elanIntType() x: number,
    @elanIntType() y: number,
    @elanIntType() colour: number,
  ): BlockGraphics {
    const blocks = this.copyOfContents();
    blocks[x][y] = colour;
    return this.system!.initialise(new BlockGraphics(blocks));
  }

  @elanFunction(["blockNo", "colour"], FunctionOptions.pure, ElanClass(BlockGraphics))
  withPutBlockNo(@elanIntType() sq: number, @elanIntType() colour: number): BlockGraphics {
    return this.withPut(this.col(sq), this.row(sq), colour);
  }

  @elanFunction(["colour"], FunctionOptions.pure, ElanClass(BlockGraphics))
  withColourAll(@elanIntType() colour: number): BlockGraphics {
    const blocks = this.generateSingleColourGrid(colour);
    return this.system!.initialise(new BlockGraphics(blocks));
  }

  @elanFunction(["col", "row"], FunctionOptions.pure, ElanInt)
  blockNo(@elanIntType() x: number, @elanIntType() y: number): number {
    return x * 100 + y;
  }

  @elanFunction(["blockNo"], FunctionOptions.pure, ElanInt)
  col(@elanIntType() sq: number): number {
    return Math.floor(sq / 100);
  }

  @elanFunction(["blockNo"], FunctionOptions.pure, ElanInt)
  row(@elanIntType() sq: number): number {
    return sq % 100;
  }
}

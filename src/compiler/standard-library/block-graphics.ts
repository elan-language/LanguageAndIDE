import {
  ClassOption,
  ElanClass,
  elanClass,
  elanFunction,
  ElanInt,
  elanIntType,
  elanProcedure,
  FunctionOptions,
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

  //If out of bounds returns -1
  @elanFunction(["col", "row"], FunctionOptions.pure, ElanInt)
  get(@elanIntType() x: number, @elanIntType() y: number): number {
    return this.blocks[x][y];
  }

  //If out of bounds returns -1
  @elanFunction(["blockNo"], FunctionOptions.pure, ElanInt)
  getBlockNo(@elanIntType() sq: number): number {
    const x = this.row(sq);
    const y = this.row(sq);
    return this.get(x, y);
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

  //If row and/or col is out of range, returns -1
  @elanFunction(["col", "row"], FunctionOptions.pure, ElanInt)
  blockNo(@elanIntType() x: number, @elanIntType() y: number): number {
    let result = y * 40 + x;
    if (x < 0 || x > 39 || y < 0 || y > 29) {
      result = -1;
    }
    return result;
  }

  @elanFunction(["blockNo"], FunctionOptions.pure, ElanInt)
  col(@elanIntType() sq: number): number {
    return sq % 40;
  }

  @elanFunction(["blockNo"], FunctionOptions.pure, ElanInt)
  row(@elanIntType() sq: number): number {
    return Math.floor(sq / 40);
  }
}

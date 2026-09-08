import { ClassOption, elanClass, elanProcedure, ProcedureOptions } from "../elan-type-annotations";
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
    this.blocks = arr ? [...arr] : [];
    const x = 40;
    const y = 30;

    for (let i = 0; i < x; i++) {
      const subArr = [];
      for (let j = 0; j < y; j++) {
        subArr.push(0xffffff);
      }
      this.blocks.push(subArr);
    }
  }

  private blocks: number[][];

  private system?: System;

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
  //setAll(colour)
  //setBlock(x, y, colour)

  //Functions
  //getBlock(x, y) -> colour
}

import {
  ClassOption,
  ElanClass,
  ElanInt,
  FunctionOptions,
  ProcedureOptions,
  elanClass,
  elanClassType,
  elanFunction,
  elanProcedure,
} from "../elan-type-annotations";
import { System } from "../system";
import { GraphicsBase } from "./graphics-base";
import { StdLib } from "./std-lib";
import { VectorGraphic } from "./vector-graphic";

@elanClass(ClassOption.record, [], [], [], [ElanClass(GraphicsBase)])
export class VectorGraphics {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new VectorGraphics();
  }

  async _initialise() {
    return this;
  }

  constructor() {}

  private stdlib!: StdLib; // injected

  private system?: System;

  private internalRep: VectorGraphic[] = [];

  @elanFunction([], FunctionOptions.pure, ElanInt)
  count(): number {
    return this.internalRep.length;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(VectorGraphics))
  add(@elanClassType(VectorGraphic) obj: VectorGraphic): VectorGraphics {
    const copy = this.system!.initialise(new VectorGraphics());
    copy.internalRep = this.internalRep;
    copy.internalRep.push(obj);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(VectorGraphics))
  remove(@elanClassType(VectorGraphic) existing: VectorGraphic): VectorGraphics {
    const copy = this.system!.initialise(new VectorGraphics());
    copy.internalRep = this.internalRep;
    if (copy.internalRep.includes(existing)) {
      const i = copy.internalRep.indexOf(existing);
      //previously copy.internalRep.splice(i, 1) didn't work?
      copy.internalRep = copy.internalRep.slice(0, i).concat(copy.internalRep.slice(i + 1));
    }
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(VectorGraphics))
  removeLast(): VectorGraphics {
    const copy = this.system!.initialise(new VectorGraphics());
    copy.internalRep = this.internalRep.slice(0, this.internalRep.length - 1);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(VectorGraphics))
  replace(
    @elanClassType(VectorGraphic) existing: VectorGraphic,
    @elanClassType(VectorGraphic) replacement: VectorGraphic,
  ): VectorGraphics {
    const copy = this.system!.initialise(new VectorGraphics());
    copy.internalRep = this.internalRep;
    if (copy.internalRep.includes(existing)) {
      const i = copy.internalRep.indexOf(existing);
      copy.internalRep = copy.internalRep
        .slice(0, i)
        .concat([replacement])
        .concat(copy.internalRep.slice(i + 1));
    }
    return copy;
  }

  @elanFunction([], FunctionOptions.pure)
  asHtml(): string {
    const content = this.internalRep.reduce((html, ob) => html + "  " + ob.asHtml() + "\n", "");
    const html = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">\n${content}</svg>\n`;
    return html;
  }

  @elanProcedure([], ProcedureOptions.async)
  async display(): Promise<void> {
    const html = this.asHtml();
    return await this.system!.elanInputOutput.drawVectorGraphics(html);
  }

  @elanProcedure([], ProcedureOptions.async)
  async clearGraphics() {
    await this.system!.elanInputOutput.clearVectorGraphics();
  }
}

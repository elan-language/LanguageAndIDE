import {
  ElanClass,
  elanClassType,
  elanFunction,
  elanProcedure,
  ElanString,
  ElanTuple,
  elanType,
  FunctionOptions,
  ProcedureOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { VGBase } from "./vg-base";

export class VectorGraphics {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new VectorGraphics();
  }

  constructor() {}

  private system?: System;

  private internalRep: VGBase[] = [];

  @elanFunction(FunctionOptions.pure, ElanClass(VectorGraphics))
  add(@elanClassType(VGBase) obj: VGBase): VectorGraphics {
    const copy = this.system!.initialise(new VectorGraphics());
    copy.internalRep = this.internalRep;
    copy.internalRep.push(obj);
    return copy;
  }

  @elanProcedure(ProcedureOptions.async)
  draw(): Promise<void> {
    const html = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">\n${this.internalRep.reduce((html, ob) => html + "  " + ob.renderAsSVG() + "\n", "")}</svg>\n`;
    this.system!.elanInputOutput.drawGraphics(html);
    return this.pause(0);
  }

  pause(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
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

import {
  ClassOptions,
  elanClass,
  ElanClass,
  elanClassType,
  elanFunction,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { BaseVG } from "./base-vg";
import { GraphicsBase } from "./graphics-base";

@elanClass(ClassOptions.record, [], [], [ElanClass(GraphicsBase)])
export class VectorGraphics {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new VectorGraphics();
  }

  constructor() {}

  private system?: System;

  private internalRep: BaseVG[] = [];

  @elanFunction(FunctionOptions.pure, ElanClass(VectorGraphics))
  add(@elanClassType(BaseVG) obj: BaseVG): VectorGraphics {
    const copy = this.system!.initialise(new VectorGraphics());
    copy.internalRep = this.internalRep;
    copy.internalRep.push(obj);
    return copy;
  }

  @elanFunction(FunctionOptions.pure, ElanClass(VectorGraphics))
  replace(
    @elanClassType(BaseVG) existing: BaseVG,
    @elanClassType(BaseVG) replacement: BaseVG,
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

  @elanFunction(FunctionOptions.pure)
  asHtml(): string {
    const content = this.internalRep.reduce((html, ob) => html + "  " + ob.asHtml() + "\n", "");
    const html = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">\n${content}</svg>\n`;
    return html;
  }
}

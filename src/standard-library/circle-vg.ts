import {
  ClassOption,
  ElanClass,
  elanClass,
  elanFunction,
  elanProcedure,
  elanProperty,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { VectorGraphic } from "./vector-graphic";

@elanClass(ClassOption.concrete, [], [], [], [ElanClass(VectorGraphic)])
export class CircleVG extends VectorGraphic {
  static emptyInstance() {
    return new CircleVG();
  }

  async _initialise() {
    return this;
  }

  private system?: System;

  constructor(copy?: CircleVG) {
    super(copy);
    this.cx = copy ? copy.cx : 0;
    this.cy = copy ? copy.cy : 0;
    this.r = copy ? copy.r : 0;
  }

  @elanProperty()
  cx: number = 0;

  @elanProcedure(["radius"])
  setCx(cx: number) {
    this.cx = cx;
  }

  @elanFunction(["cx"], FunctionOptions.pure, ElanClass(CircleVG))
  withCx(cx: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.cx = cx;
    return copy;
  }

  @elanProperty()
  cy: number = 0;

  @elanProcedure(["radius"])
  setCy(cy: number) {
    this.cy = cy;
  }

  @elanFunction(["cy"], FunctionOptions.pure, ElanClass(CircleVG))
  withCy(cy: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.cy = cy;
    return copy;
  }

  @elanProperty()
  r: number = 0;

  @elanProcedure(["radius"])
  setRadius(r: number) {
    this.r = r;
  }

  @elanFunction(["radius"], FunctionOptions.pure, ElanClass(CircleVG))
  withRadius(r: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.r = r;
    return copy;
  }

  asHtml(): string {
    return `<circle cx="${this.cx}%" cy="${this.cy / 0.75}%" r="${this.r * 1.125}%" stroke="${this.strokeAsColour()}" stroke-width="${this.strokeWidthPC()}%" fill="${this.fillAsColour()}" />`;
  }
}

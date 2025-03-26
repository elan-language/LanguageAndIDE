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
    this.centreX = copy ? copy.centreX : 0;
    this.centreY = copy ? copy.centreY : 0;
    this.r = copy ? copy.r : 0;
  }

  @elanProperty()
  centreX: number = 0;

  @elanProcedure(["centreX"])
  setCentreX(centreX: number) {
    this.centreX = centreX;
  }

  @elanFunction(["centreX"], FunctionOptions.pure, ElanClass(CircleVG))
  withCentreX(centreX: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.centreX = centreX;
    return copy;
  }

  @elanProperty()
  centreY: number = 0;

  @elanProcedure(["centreY"])
  setCentreY(centreY: number) {
    this.centreY = centreY;
  }

  @elanFunction(["centreY"], FunctionOptions.pure, ElanClass(CircleVG))
  withCentreY(centreY: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.centreY = centreY;
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
    return `<circle cx="${this.centreX}%" cy="${this.centreY / 0.75}%" r="${this.r * 1.125}%" stroke="${this.strokeAsColour()}" stroke-width="${this.strokeWidthPC()}%" fill="${this.fillAsColour()}" />`;
  }
}

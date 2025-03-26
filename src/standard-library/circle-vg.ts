import {
  ClassOption,
  ElanClass,
  elanClass,
  ElanFloat,
  elanFunction,
  elanProcedure,
  elanProperty,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { VectorGraphic } from "./vector-graphic";

@elanClass(
  ClassOption.concrete,
  [],
  ["centreX", "centreY", "radius"],
  [ElanFloat, ElanFloat, ElanFloat],
  [ElanClass(VectorGraphic)],
)
export class CircleVG extends VectorGraphic {
  static emptyInstance() {
    return new CircleVG();
  }

  async _initialise(centreX: number, centreY: number, radius: number) {
    this.centreX = centreX;
    this.centreY = centreY;
    this.radius = radius;
    return this;
  }

  private system?: System;

  constructor(copy?: CircleVG) {
    super(copy);
    this.centreX = copy ? copy.centreX : 0;
    this.centreY = copy ? copy.centreY : 0;
    this.radius = copy ? copy.radius : 0;
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
  radius: number = 0;

  @elanProcedure(["radius"])
  setRadius(r: number) {
    this.radius = r;
  }

  @elanFunction(["radius"], FunctionOptions.pure, ElanClass(CircleVG))
  withRadius(r: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.radius = r;
    return copy;
  }

  @elanProcedure(["fillColour"])
  setFillColour(fillColour: number) {
    this.fillColour = fillColour;
  }

  @elanFunction(["colour"], FunctionOptions.pure, ElanClass(CircleVG))
  withFillColour(fillColour: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.fillColour = fillColour;
    return copy;
  }

  @elanProcedure(["colour"])
  setStrokeColour(strokeColour: number) {
    this.strokeColour = strokeColour;
  }
  @elanFunction(["colour"], FunctionOptions.pure, ElanClass(CircleVG))
  withStrokeColour(strokeColour: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.strokeColour = strokeColour;
    return copy;
  }

  @elanProcedure(["strokeWidth"])
  setStrokeWidth(strokeWidth: number) {
    this.strokeWidth = strokeWidth;
  }
  @elanFunction(["width"], FunctionOptions.pure, ElanClass(CircleVG))
  withStrokeWidth(strokeWidth: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.strokeWidth = strokeWidth;
    return copy;
  }

  asHtml(): string {
    return `<circle cx="${this.centreX}%" cy="${this.centreY / 0.75}%" r="${this.radius * 1.125}%" ${this.strokeAndFill()}" />`;
  }
}

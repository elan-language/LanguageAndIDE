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
    this.centreX = copy ? copy.centreX : 50;
    this.centreY = copy ? copy.centreY : 37.5;
    this.radius = copy ? copy.radius : 10;
    this.fillColour = copy ? copy.fillColour : 0xffff00;
    this.strokeColour = copy ? copy.strokeColour : 0;
    this.strokeWidth = copy ? copy.strokeWidth : 1;
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
  @elanFunction(["colour"], FunctionOptions.pure, ElanClass(CircleVG))
  withFillColour(fillColour: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.fillColour = fillColour;
    return copy;
  }
  @elanFunction(["colour"], FunctionOptions.pure, ElanClass(CircleVG))
  withStrokeColour(strokeColour: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.strokeColour = strokeColour;
    return copy;
  }
  @elanFunction(["width"], FunctionOptions.pure, ElanClass(CircleVG))
  withStrokeWidth(strokeWidth: number): CircleVG {
    const copy = this.system!.initialise(new CircleVG(this));
    copy.strokeWidth = strokeWidth;
    return copy;
  }

  asSVG(): string {
    return `<circle cx="${this.centreX}%" cy="${this.centreY / 0.75}%" r="${this.radius * 1.125}%" ${this.strokeAsHtml()} ${this.fillAsHtml()}/>`;
  }
}

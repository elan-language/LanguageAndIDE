import { System } from "../../ide/system";
import {
  elanClass,
  ClassOption,
  ElanClass,
  elanProperty,
  elanProcedure,
  elanFunction,
  FunctionOptions,
  ElanInt,
} from "../elan-type-annotations";
import { VectorGraphic } from "./vector-graphic";

@elanClass(ClassOption.record, [], [], [], [ElanClass(VectorGraphic)])
export class RectangleVG extends VectorGraphic {
  static emptyInstance() {
    return new RectangleVG();
  }

  async _initialise() {
    return this;
  }

  private system?: System;

  constructor(copy?: RectangleVG) {
    super();
    this.x = copy ? copy.x : 10;
    this.y = copy ? copy.y : 10;
    this.width = copy ? copy.width : 40;
    this.height = copy ? copy.height : 20;
    this.fillColour = copy ? copy.fillColour : 0xffff00;
    this.strokeColour = copy ? copy.strokeColour : 0;
    this.strokeWidth = copy ? copy.strokeWidth : 1;
  }

  @elanProperty()
  x: number = 0;

  @elanProcedure(["x"])
  setX(x: number) {
    this.x = x;
  }

  @elanFunction(["x"], FunctionOptions.pure, ElanClass(RectangleVG))
  withX(x: number): RectangleVG {
    const copy = this.system!.initialise(new RectangleVG(this));
    copy.x = x;
    return copy;
  }

  @elanProperty()
  y: number = 0;

  @elanProcedure(["y"])
  setY(y: number) {
    this.y = y;
  }

  @elanFunction(["y"], FunctionOptions.pure, ElanClass(RectangleVG))
  withY(y: number): RectangleVG {
    const copy = this.system!.initialise(new RectangleVG(this));
    copy.y = y;
    return copy;
  }

  @elanProperty()
  width: number = 0;

  @elanProcedure(["width"])
  setWidth(width: number) {
    this.width = width;
  }

  @elanFunction(["width"], FunctionOptions.pure, ElanClass(RectangleVG))
  withWidth(width: number): RectangleVG {
    const copy = this.system!.initialise(new RectangleVG(this));
    copy.width = width;
    return copy;
  }

  @elanProperty()
  height: number = 0;

  @elanProcedure(["height"])
  setHeight(height: number) {
    this.height = height;
  }

  @elanFunction(["height"], FunctionOptions.pure, ElanClass(RectangleVG))
  withHeight(height: number): RectangleVG {
    const copy = this.system!.initialise(new RectangleVG(this));
    copy.height = height;
    return copy;
  }

  @elanProperty(ElanInt)
  strokeColour: number = 0;

  @elanProcedure(["colour"])
  setStrokeColour(strokeColour: number) {
    this.strokeColour = strokeColour;
  }
  @elanFunction(["colour"], FunctionOptions.pure, ElanClass(RectangleVG))
  withStrokeColour(strokeColour: number): RectangleVG {
    const copy = this.system!.initialise(new RectangleVG(this));
    copy.strokeColour = strokeColour;
    return copy;
  }
  @elanProperty()
  strokeWidth: number = 0;

  @elanProcedure(["strokeWidth"])
  setStrokeWidth(strokeWidth: number) {
    this.strokeWidth = strokeWidth;
  }
  @elanFunction(["width"], FunctionOptions.pure, ElanClass(RectangleVG))
  withStrokeWidth(strokeWidth: number): RectangleVG {
    const copy = this.system!.initialise(new RectangleVG(this));
    copy.strokeWidth = strokeWidth;
    return copy;
  }
  @elanProperty(ElanInt)
  fillColour: number = 0;

  @elanProcedure(["fillColour"])
  setFillColour(fillColour: number) {
    this.fillColour = fillColour;
  }

  @elanFunction(["colour"], FunctionOptions.pure, ElanClass(RectangleVG))
  withFillColour(fillColour: number): RectangleVG {
    const copy = this.system!.initialise(new RectangleVG(this));
    copy.fillColour = fillColour;
    return copy;
  }

  asSVG(): string {
    return `<rect x="${this.x}%" y="${this.y / 0.75}%" width="${this.width}%" height="${this.height / 0.75}%" ${this.strokeAsHtml(this.strokeWidth, this.strokeColour)} ${this.fillAsHtml(this.fillColour)}/>`;
  }
}

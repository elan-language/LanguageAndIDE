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
  ClassOption.record,
  [],
  ["x", "y", "width", "height", "fillColour", "strokeColour", "strokeWidth"],
  [ElanFloat, ElanFloat, ElanFloat, ElanFloat, ElanFloat, ElanFloat, ElanFloat],
  [ElanClass(VectorGraphic)],
)
export class RectangleVG extends VectorGraphic {
  static emptyInstance() {
    return new RectangleVG();
  }

  async _initialise(
    x: number,
    y: number,
    width: number,
    height: number,
    fillColour: number,
    strokeColour: number,
    strokeWidth: number,
  ) {
    this.fillColour = fillColour;
    this.strokeColour = strokeColour;
    this.strokeWidth = strokeWidth;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  private system?: System;

  constructor(copy?: RectangleVG) {
    super(copy);
    this.x = copy ? copy.x : 0;
    this.y = copy ? copy.y : 0;
    this.width = copy ? copy.width : 0;
    this.height = copy ? copy.height : 0;
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

  @elanFunction(["colour"], FunctionOptions.pure, ElanClass(RectangleVG))
  withFillColour(fillColour: number): RectangleVG {
    const copy = this.system!.initialise(new RectangleVG(this));
    copy.fillColour = fillColour;
    return copy;
  }

  @elanFunction(["colour"], FunctionOptions.pure, ElanClass(RectangleVG))
  withStrokeColour(strokeColour: number): RectangleVG {
    const copy = this.system!.initialise(new RectangleVG(this));
    copy.strokeColour = strokeColour;
    return copy;
  }

  @elanFunction(["width"], FunctionOptions.pure, ElanClass(RectangleVG))
  withStrokeWidth(strokeWidth: number): RectangleVG {
    const copy = this.system!.initialise(new RectangleVG(this));
    copy.strokeWidth = strokeWidth;
    return copy;
  }

  asHtml(): string {
    return `<rect x="${this.x}%" y="${this.y / 0.75}%" width="${this.width}%" height="${this.height / 0.75}%" ${this.strokeAndFill()}" />`;
  }
}

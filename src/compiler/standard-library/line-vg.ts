import {
  ClassOption,
  ElanClass,
  elanClass,
  elanFunction,
  ElanInt,
  elanProcedure,
  elanProperty,
  FunctionOptions,
} from "../../elan-type-annotations";
import { System } from "../../system";
import { VectorGraphic } from "./vector-graphic";

@elanClass(ClassOption.record, [], [], [], [ElanClass(VectorGraphic)])
export class LineVG extends VectorGraphic {
  static emptyInstance() {
    return new LineVG();
  }

  async _initialise() {
    return this;
  }

  private system?: System;

  constructor(copy?: LineVG) {
    super();
    this.x1 = copy ? copy.x1 : 10;
    this.y1 = copy ? copy.y1 : 10;
    this.x2 = copy ? copy.x2 : 70;
    this.y2 = copy ? copy.y2 : 40;
    this.strokeColour = copy ? copy.strokeColour : 0;
    this.strokeWidth = copy ? copy.strokeWidth : 1;
  }

  @elanProperty()
  x1: number = 0;

  @elanProcedure(["x1"])
  setX1(x1: number) {
    this.x1 = x1;
  }

  @elanFunction(["x1"], FunctionOptions.pure, ElanClass(LineVG))
  withX1(x1: number): LineVG {
    const copy = this.system!.initialise(new LineVG(this));
    copy.x1 = x1;
    return copy;
  }

  @elanProperty()
  y1: number = 0;

  @elanProcedure(["y1"])
  setY1(y1: number) {
    this.y1 = y1;
  }

  @elanFunction(["y1"], FunctionOptions.pure, ElanClass(LineVG))
  withY1(y1: number): LineVG {
    const copy = this.system!.initialise(new LineVG(this));
    copy.y1 = y1;
    return copy;
  }

  @elanProperty()
  x2: number = 0;

  @elanProcedure(["x2"])
  setX2(x2: number) {
    this.x2 = x2;
  }

  @elanFunction(["x2"], FunctionOptions.pure, ElanClass(LineVG))
  withX2(x2: number): LineVG {
    const copy = this.system!.initialise(new LineVG(this));
    copy.x2 = x2;
    return copy;
  }

  @elanProperty()
  y2: number = 0;

  @elanProcedure(["x2"])
  setY2(y2: number) {
    this.y2 = y2;
  }

  @elanFunction(["x2"], FunctionOptions.pure, ElanClass(LineVG))
  withY2(y2: number): LineVG {
    const copy = this.system!.initialise(new LineVG(this));
    copy.y2 = y2;
    return copy;
  }
  @elanProperty(ElanInt)
  strokeColour: number = 0;

  @elanProcedure(["colour"])
  setStrokeColour(strokeColour: number) {
    this.strokeColour = strokeColour;
  }
  @elanFunction(["colour"], FunctionOptions.pure, ElanClass(LineVG))
  withStrokeColour(strokeColour: number): LineVG {
    const copy = this.system!.initialise(new LineVG(this));
    copy.strokeColour = strokeColour;
    return copy;
  }
  @elanProperty()
  strokeWidth: number = 0;

  @elanProcedure(["strokeWidth"])
  setStrokeWidth(strokeWidth: number) {
    this.strokeWidth = strokeWidth;
  }
  @elanFunction(["width"], FunctionOptions.pure, ElanClass(LineVG))
  withStrokeWidth(strokeWidth: number): LineVG {
    const copy = this.system!.initialise(new LineVG(this));
    copy.strokeWidth = strokeWidth;
    return copy;
  }

  asSVG(): string {
    return `<line x1="${this.x1}%" y1="${this.y1 / 0.75}%" x2="${this.x2}%" y2="${this.y2 / 0.75}%" ${this.strokeAsHtml(this.strokeWidth, this.strokeColour)}/>`;
  }
}

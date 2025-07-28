import {
  ClassOption,
  elanClass,
  ElanClass,
  elanFloatType,
  elanFunction,
  elanIntType,
  elanProcedure,
  elanProperty,
  FunctionOptions,
  ProcedureOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { CircleVG } from "./circle-vg";
import { GraphicsBase } from "./graphics-base";
import { LineVG } from "./line-vg";
import { List } from "./list";
import { StdLib } from "./std-lib";
import { VectorGraphic } from "./vector-graphic";

@elanClass(ClassOption.concrete, [], [], [], [ElanClass(GraphicsBase)])
export class Turtle extends GraphicsBase {
  // this must = implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Turtle();
  }

  async _initialise() {
    return this;
  }

  private _system?: System;

  set system(value: System) {
    this._system = value;
    this.vg = this._system!.initialise(new List<VectorGraphic>());
  }

  constructor() {
    super();
    this.x = 0;
    this.y = 0;
    this.heading = 0;
    this.pen = true;
    this.shown = true;
    this.colour = 0;
    this.width = 1;
    this.vg = new List<VectorGraphic>(); // replaced by initialised version in set system()
  }

  private reset() {
    this.x = 0;
    this.y = 0;
    this.heading = 0;
    this.pen = true;
    this.shown = true;
    this.colour = 0;
    this.width = 1;
  }

  private stdlib!: StdLib; // injected

  vg: List<VectorGraphic>;

  @elanProperty()
  x: number;

  @elanProperty()
  y: number;

  @elanProperty()
  heading: number;

  pen: boolean;
  shown: boolean;
  colour: number;
  width: number;

  @elanProcedure([], ProcedureOptions.async)
  async show() {
    this.removeTurtleIfShown();
    this.shown = true;
    this.addTurtleIfShown();
    await this.stdlib.displayVectorGraphics(this.vg);
  }

  @elanProcedure([], ProcedureOptions.async)
  async clearAndReset() {
    this.vg = this._system!.initialise(new List<VectorGraphic>());
    this.x = 0;
    this.y = 0;
    this.heading = 0;
    this.pen = true;
    this.colour = 0;
    this.width = 1;
    await this.stdlib.displayVectorGraphics(this.vg);
  }

  @elanProcedure([], ProcedureOptions.async)
  async hide() {
    this.removeTurtleIfShown();
    this.shown = false;
    await this.stdlib.displayVectorGraphics(this.vg);
  }

  @elanProcedure([])
  penUp() {
    this.pen = false;
  }

  @elanProcedure([])
  penDown() {
    this.pen = true;
  }

  private addTurtleIfShown() {
    if (this.shown) {
      const turtle = new CircleVG();
      turtle.centreX = this.asVGx(this.x);
      turtle.centreY = this.asVGy(this.y);
      turtle.radius = 2;
      turtle.fillColour = 0x008000;
      turtle.strokeWidth = 0;
      const [x2, y2] = this.getDestination(2);
      const pointer = new LineVG();
      pointer.x1 = this.asVGx(this.x);
      pointer.y1 = this.asVGy(this.y);
      pointer.x2 = this.asVGx(x2);
      pointer.y2 = this.asVGy(y2);
      pointer.strokeWidth = 2;
      this.vg.append(turtle);
      this.vg.append(pointer);
    }
  }
  private removeTurtleIfShown() {
    if (this.shown) {
      const len = this.vg.length();
      this.vg.removeAt(len - 1);
      this.vg.removeAt(len - 2); // circle and line
    }
  }

  private getDestination(distance: number): [number, number] {
    const newX = this.x + distance * this.stdlib.sinDeg(this.heading);
    const newY = this.y + distance * this.stdlib.cosDeg(this.heading);
    return [newX, newY];
  }

  @elanProcedure(["distance"], ProcedureOptions.async)
  async move(distance: number) {
    const [x, y] = this.getDestination(distance);
    await this.moveTo(x, y);
  }

  asVGx(x: number) {
    return x / 2 + 50;
  }

  asVGy(y: number) {
    return -y / 2 + 37.5;
  }

  @elanProcedure(["x", "y"], ProcedureOptions.async)
  async moveTo(x: number, y: number) {
    this.removeTurtleIfShown();
    if (this.pen) {
      const line = new LineVG();
      line.x1 = this.asVGx(this.x);
      line.y1 = this.asVGy(this.y);
      line.x2 = this.asVGx(x);
      line.y2 = this.asVGy(y);
      line.strokeColour = this.colour;
      line.strokeWidth = this.width;
      this.vg.append(line);
    }
    this.x = x;
    this.y = y;
    this.addTurtleIfShown();
    await this.stdlib.displayVectorGraphics(this.vg);
  }

  @elanProcedure(["degrees"], ProcedureOptions.async)
  async turn(degrees: number) {
    await this.turnToHeading(this.heading + degrees);
  }

  @elanProcedure([], ProcedureOptions.async)
  async turnToHeading(heading: number) {
    this.removeTurtleIfShown();
    this.heading = this.normaliseHeading(heading);
    this.addTurtleIfShown();
    await this.stdlib.displayVectorGraphics(this.vg);
  }

  private normaliseHeading(x: number): number {
    return x >= 360 ? this.normaliseHeading(x - 360) : x < 0 ? this.normaliseHeading(x + 360) : x;
  }

  @elanProcedure(["colour"])
  penColour(@elanIntType() colour: number) {
    this.colour = colour;
  }

  @elanProcedure(["width"])
  penWidth(@elanFloatType() width: number) {
    this.width = width > 0 ? width : 1;
  }

  @elanProcedure(["x", "y"], ProcedureOptions.async)
  async placeAt(x: number, y: number) {
    this.removeTurtleIfShown();
    this.x = x;
    this.y = y;
    this.addTurtleIfShown();
    await this.stdlib.displayVectorGraphics(this.vg);
  }

  @elanFunction([], FunctionOptions.pure)
  asHtml(): string {
    return this.stdlib.vectorGraphicsAsHtml(this.vg);
  }

  /*   @elanProcedure(["otherTurtle"])
  shareDisplayWith(@elanClassType(Turtle) t2: Turtle) {
    const vg = t2.vg;
    vg.appendList(this.vg);
    this.vg = vg;
  } */
}

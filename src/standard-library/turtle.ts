import {
  ClassOptions,
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
import { StdLib } from "./std-lib";
import { VectorGraphics } from "./vector-graphics";

@elanClass(ClassOptions.concrete, [], [], [], [ElanClass(GraphicsBase)])
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
    this.vg = this._system!.initialise(new VectorGraphics());
  }

  constructor() {
    super();
    this.x = 50;
    this.y = 37.5;
    this.heading = 0;
    this.pen = true;
    this.shown = false;
    this.colour = 0;
    this.width = 1;
    this.vg = new VectorGraphics(); // replaced by initialised version in set system()
  }

  private reset() {
    this.x = 50;
    this.y = 37.5;
    this.heading = 0;
    this.pen = true;
    this.shown = false;
    this.colour = 0;
    this.width = 1;
  }

  private stdlib!: StdLib; // injected

  vg: VectorGraphics;

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

  @elanProcedure([])
  show() {
    if (!this.shown) {
      this.shown = true;
      this.addTurtleIfShown();
      this.vg.display();
    }
  }

  @elanProcedure([])
  clearAndReset() {
    this.vg = this._system!.initialise(new VectorGraphics());
    this.x = 50;
    this.y = 37.5;
    this.heading = 0;
    this.pen = true;
    this.colour = 0;
    this.width = 1;
    this.vg.display();
  }

  @elanProcedure([])
  hide() {
    this.removeTurtleIfShown();
    this.shown = false;
    this.vg.display();
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
      turtle.cx = this.x;
      turtle.cy = this.y;
      turtle.r = 2;
      turtle.fill = 0x008000;
      turtle.strokeWidth = 0;
      const [x2, y2] = this.getDestination(2);
      const pointer = new LineVG();
      pointer.x1 = this.x;
      pointer.y1 = this.y;
      pointer.x2 = x2;
      pointer.y2 = y2;
      pointer.strokeWidth = 2;
      this.vg = this.vg.add(turtle).add(pointer);
    }
  }

  private removeTurtleIfShown() {
    if (this.shown) {
      this.vg = this.vg.removeLast().removeLast(); // circle and line
    }
  }

  private getDestination(distance: number): [number, number] {
    const newX = this.x + distance * this.stdlib.sinDeg(this.heading);
    const newY = this.y - distance * this.stdlib.cosDeg(this.heading);
    return [newX, newY];
  }

  @elanProcedure([])
  move(distance: number) {
    this.removeTurtleIfShown();
    const [newX, newY] = this.getDestination(distance);
    if (this.pen) {
      const line = new LineVG();
      line.x1 = this.x;
      line.y1 = this.y;
      line.x2 = newX;
      line.y2 = newY;
      line.stroke = this.colour;
      line.strokeWidth = this.width;
      this.vg = this.vg.add(line);
    }
    this.x = newX;
    this.y = newY;
    this.addTurtleIfShown();
    this.vg.display();
  }

  @elanProcedure([])
  turn(degrees: number) {
    this.turnToHeading(this.heading + degrees);
  }

  @elanProcedure([])
  turnToHeading(heading: number) {
    this.removeTurtleIfShown();
    this.heading = this.normaliseHeading(heading);
    this.addTurtleIfShown();
    this.vg.display();
  }

  private normaliseHeading(x: number): number {
    return x >= 360 ? this.normaliseHeading(x - 360) : x < 0 ? this.normaliseHeading(x + 360) : x;
  }

  @elanProcedure([], ProcedureOptions.async)
  pause(@elanIntType() ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }
  @elanProcedure([])
  penColour(@elanIntType() colour: number) {
    this.colour = colour;
  }

  @elanProcedure([])
  penWidth(@elanFloatType() width: number) {
    this.width = width > 0 ? width : 1;
  }

  @elanProcedure([])
  placeAt(x: number, y: number) {
    this.removeTurtleIfShown();
    this.x = x;
    this.y = y;
    this.addTurtleIfShown();
    this.vg.display();
  }

  @elanFunction([], FunctionOptions.pure)
  asHtml(): string {
    return this.vg.asHtml();
  }
}

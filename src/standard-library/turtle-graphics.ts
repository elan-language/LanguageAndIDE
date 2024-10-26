import {
  ClassOptions,
  elanClass,
  ElanClass,
  elanIntType,
  elanProcedure,
  elanProperty,
  ProcedureOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { CircleVG } from "./circle-vg";
import { GraphicsBase } from "./graphics-base";
import { LineVG } from "./line-vg";
import { StdLib } from "./std-lib";
import { VectorGraphics } from "./vector-graphics";

@elanClass(ClassOptions.concrete, [], [], [ElanClass(GraphicsBase)])
export class TurtleGraphics extends GraphicsBase {
  // this must = implemented by hand on all stdlib classes
  static emptyInstance() {
    return new TurtleGraphics();
  }
  private system?: System;

  constructor() {
    super();
    this.x = 133;
    this.y = 100;
    this.heading = 0;
    this.pen = true;
    this.show = false;
    this.colour = 0;
    this.width = 1;
    this.vg = new VectorGraphics(); //This needs to be initialised with system, but can't be because the system property is not populated yet
  }
  private _stdLib = new StdLib();

  vg: VectorGraphics;

  @elanProperty()
  x: number;

  @elanProperty()
  y: number;

  @elanProperty()
  heading: number;

  pen: boolean;
  show: boolean;
  colour: number;
  width: number;

  //TODO: Temporary kludge - see comment in constructor above
  private initialised: boolean = false;
  @elanProcedure()
  checkInitialised() {
    if (!this.initialised) {
      this.vg = this.system!.initialise(new VectorGraphics());
      this.initialised = true;
    }
  }

  @elanProcedure()
  showTurtle() {
    this.checkInitialised();
    if (!this.show) {
      this.show = true;
      this.addTurtleIfShown();
      this.vg.display();
    }
  }

  @elanProcedure()
  hideTurtle() {
    this.checkInitialised();
    this.removeTurtleIfShown();
    this.show = false;
    this.vg.display();
  }

  @elanProcedure()
  penUp() {
    this.pen = false;
  }

  @elanProcedure()
  penDown() {
    this.pen = true;
  }

  @elanProcedure()
  private addTurtleIfShown() {
    if (this.show) {
      const turtle = new CircleVG();
      turtle.cx = this.x;
      turtle.cy = this.y;
      turtle.r = 4;
      turtle.fill = 0x008000;
      turtle.strokeWidth = 0;
      const [x2, y2] = this.getDestination(4);
      const pointer = new LineVG();
      pointer.x1 = this.x;
      pointer.y1 = this.y;
      pointer.x2 = x2;
      pointer.y2 = y2;
      pointer.strokeWidth = 2;
      this.vg = this.vg.add(turtle).add(pointer);
    }
  }

  @elanProcedure()
  private removeTurtleIfShown() {
    if (this.show) {
      // remove last two shapes (circle and line)
      this.vg = this.vg.removeLast().removeLast();
    }
  }

  private getDestination(distance: number): [number, number] {
    const newX = this.x + distance * this._stdLib.sinDeg(this.heading);
    const newY = this.y - distance * this._stdLib.cosDeg(this.heading);
    return [newX, newY];
  }

  @elanProcedure()
  move(distance: number) {
    this.checkInitialised();
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

  @elanProcedure()
  turn(degrees: number) {
    this.turnTo(this.heading + degrees);
  }

  @elanProcedure()
  turnTo(heading: number) {
    this.checkInitialised();
    this.removeTurtleIfShown();
    this.heading = heading;
    this.addTurtleIfShown();
    this.vg.display();
  }

  @elanProcedure(ProcedureOptions.async)
  pause(@elanIntType() ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), ms);
    });
  }
  @elanProcedure()
  penColour(@elanIntType() colour: number) {
    this.colour = colour;
  }

  @elanProcedure()
  penWidth(@elanIntType() width: number) {
    this.width = width > 0 ? width : 1;
  }

  @elanProcedure()
  placeAt(x: number, y: number) {
    this.checkInitialised();
    this.removeTurtleIfShown();
    this.x = x;
    this.y = y;
    this.addTurtleIfShown();
    this.vg.display();
  }
}

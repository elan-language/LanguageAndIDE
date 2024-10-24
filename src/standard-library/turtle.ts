import {
  ClassOptions,
  elanClass,
  ElanClass,
  elanFloatType,
  elanIntType,
  elanProcedure,
  elanProperty,
} from "../elan-type-annotations";
import { System } from "../system";
import { GraphicsBase } from "./graphics-base";
import { VectorGraphics } from "./vector-graphics";
import { StdLib } from "./std-lib";

@elanClass(ClassOptions.concrete, [], [], [ElanClass(GraphicsBase)])
export class Turtle extends GraphicsBase {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Turtle();
  }

  constructor() {
    super();
    this.vg = this.system!.initialise(new VectorGraphics());
  }
  private system?: System;

  private vg: VectorGraphics;

  @elanProperty()
  x: number = 0;

  @elanProperty()
  y: number = 0;

  @elanProperty()
  heading: number = 0;

  @elanProcedure()
  show() {}

  @elanProcedure()
  hide() {}

  @elanProcedure()
  penUp() {}

  @elanProcedure()
  penDown() {}

  @elanProcedure()
  reset() {}

  @elanProcedure()
  clearTrack() {}

  @elanProcedure()
  forward(@elanFloatType() distance: number) {}

  @elanProcedure()
  back(@elanFloatType() distance: number) {}

  @elanProcedure()
  turn(@elanFloatType() degrees: number) {}

  @elanProcedure()
  turnTo(@elanFloatType() degrees: number) {}

  @elanProcedure()
  pause(@elanIntType() f: number) {}
  @elanProcedure()
  penColour(@elanIntType() colour: number) {}
  @elanProcedure()
  penWidth(@elanIntType() colour: number) {}

  @elanProcedure()
  setPosition(@elanFloatType() x: number, @elanFloatType() y: number) {}
}

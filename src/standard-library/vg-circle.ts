import {
  ClassOptions,
  ElanClass,
  FunctionOptions,
  ProcedureOptions,
  elanClass,
  elanFunction,
  elanProcedure,
} from "../elan-type-annotations";
import { VGBase } from "./vg-base";

@elanClass(ClassOptions.concrete)
export class VGCircle extends VGBase {
  static emptyInstance() {
    return new VGCircle();
  }

  constructor() {
    super();
  }

  @elanProcedure()
  setX(x: number) {}

  @elanProcedure()
  setY(y: number) {}

  @elanProcedure()
  setR(r: number) {}

  @elanProcedure(ProcedureOptions.async)
  renderAsSVG() {
    return `<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />`;
  }

  @elanFunction(FunctionOptions.pure, ElanClass(VGBase))
  asVGBase() {
    return this;
  }
}

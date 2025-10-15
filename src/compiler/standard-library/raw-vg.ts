import {
  ClassOption,
  elanClass,
  ElanClass,
  elanFunction,
  elanProperty,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { VectorGraphic } from "./vector-graphic";

@elanClass(ClassOption.concrete, [], [], [], [ElanClass(VectorGraphic)])
export class RawVG extends VectorGraphic {
  static emptyInstance() {
    return new RawVG();
  }

  async _initialise() {
    return this;
  }

  private system?: System;

  constructor(copy?: RawVG) {
    super();
    this.rawSVGcontent = copy ? copy?.rawSVGcontent : "";
  }

  @elanProperty()
  rawSVGcontent: string = "";

  @elanFunction([], FunctionOptions.pure)
  asSVG(): string {
    return this.rawSVGcontent;
  }
}

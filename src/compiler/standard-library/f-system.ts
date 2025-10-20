import {
  ClassOption,
  ElanClass,
  elanClass,
  elanFunction,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { StdLib } from "./std-lib";

@elanClass(ClassOption.concrete)
export class FSystem {
  // this must = implemented by hand on all stdlib classes
  static emptyInstance() {
    return new FSystem();
  }

  async _initialise() {
    return this;
  }

  private _system?: System;

  set system(value: System) {
    this._system = value;
  }

  private _stdlib!: StdLib; // injected

  @elanFunction([], FunctionOptions.pure, ElanClass(FSystem))
  inputInt(_s: string) {}

  @elanFunction([], FunctionOptions.pure, ElanClass(FSystem))
  output(_s: string) {}
}

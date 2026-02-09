import {
  ClassOption,
  elanClass,
  elanFunction,
  elanGenericParamT1Type,
  elanProcedure,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

@elanClass(ClassOption.concrete, [ElanT1], ["to"], [ElanT1], [])
export class Ref<T1> {
  static emptyInstance() {
    return new Ref();
  }

  async _initialise(v: T1) {
    this._value = v;
    return this;
  }

  private system?: System;

  constructor() {}

  private _value!: T1;

  @elanFunction([], FunctionOptions.pure, ElanT1)
  value(): T1 {
    return this._value!;
  }

  @elanProcedure([])
  set(@elanGenericParamT1Type() item: T1): void {
    this._value = item;
  }
}

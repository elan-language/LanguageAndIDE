import { Deprecation, DeprecationSeverity } from "../compiler-interfaces/elan-type-interfaces";
import {
  ClassOption,
  ElanClass,
  elanClass,
  elanDeprecated,
  elanFunction,
  elanGenericParamT1Type,
  elanProcedure,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { Maybe } from "./maybe";

@elanClass(ClassOption.concrete, [ElanT1], ["to"], [ElanT1], [])
export class AsRef<T1> {
  static emptyInstance() {
    return new AsRef();
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

  @elanDeprecated(
    Deprecation.methodRenamed,
    2,
    0,
    "LangRef.html#AsRef",
    DeprecationSeverity.advisory,
  )
  @elanProcedure([])
  set(@elanGenericParamT1Type() item: T1): void {
    this._value = item;
  }

  @elanProcedure([])
  put(@elanGenericParamT1Type() item: T1): void {
    this._value = item;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(Maybe))
  withPut(@elanGenericParamT1Type() value: T1): AsRef<T1> {
    const opt = new AsRef<T1>();
    opt.put(value);
    return opt;
  }

  async toString() {
    return `a Reference`;
  }
}

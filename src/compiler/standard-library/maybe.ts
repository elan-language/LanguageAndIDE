import { Deprecation, DeprecationSeverity } from "../compiler-interfaces/elan-type-interfaces";
import {
  ClassOption,
  ElanBoolean,
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
import { ElanRuntimeError } from "./elan-runtime-error";

@elanClass(ClassOption.concrete, [ElanT1], [], [], [])
export class Maybe<T1> {
  static emptyInstance() {
    return new Maybe();
  }

  async _initialise() {
    return this;
  }

  private system?: System;

  constructor() {}

  private _value: T1 | undefined;

  @elanFunction([], FunctionOptions.pure, ElanT1)
  getValue(): T1 {
    if (!this._value) {
      throw new ElanRuntimeError(
        "calling getValue() on an empty Maybe type. Check hasValue() first.",
      );
    }
    return this._value!;
  }

  @elanFunction([], FunctionOptions.pure, ElanBoolean)
  hasValue(): boolean {
    return !!this._value;
  }

  @elanDeprecated(
    Deprecation.methodRenamed,
    2,
    0,
    "OopRef.html#Maybe",
    DeprecationSeverity.advisory,
  )
  @elanProcedure([])
  set(@elanGenericParamT1Type() value: T1): void {
    this._value = value;
  }

  @elanProcedure([])
  put(@elanGenericParamT1Type() value: T1): void {
    this._value = value;
  }

  @elanDeprecated(
    Deprecation.methodRenamed,
    2,
    0,
    "OopRef.html#Maybe",
    DeprecationSeverity.advisory,
  )
  @elanFunction([], FunctionOptions.pure, ElanClass(Maybe))
  withSet(@elanGenericParamT1Type() value: T1): Maybe<T1> {
    const opt = new Maybe<T1>();
    opt.set(value);
    return opt;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(Maybe))
  withPut(@elanGenericParamT1Type() value: T1): Maybe<T1> {
    const opt = new Maybe<T1>();
    opt.set(value);
    return opt;
  }

  @elanProcedure([])
  clear(): void {
    this._value = undefined;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(Maybe))
  withClear(): Maybe<T1> {
    return new Maybe<T1>();
  }

  async toString() {
    return `a Maybe`;
  }
}

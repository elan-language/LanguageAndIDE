import {
  ClassOption,
  ElanBoolean,
  ElanClass,
  elanClass,
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

  @elanProcedure([])
  set(@elanGenericParamT1Type() value: T1): void {
    this._value = value;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(Maybe))
  withSet(@elanGenericParamT1Type() value: T1): Maybe<T1> {
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
}

import {
  ClassOption,
  ElanBoolean,
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
export class Optional<T1> {
  static emptyInstance() {
    return new Optional();
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
        "calling getValue() on an empty Optional type. Check hasValue() before calling getValue()",
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

  @elanFunction([], FunctionOptions.pure, ElanT1)
  withSet(@elanGenericParamT1Type() value: T1): Optional<T1> {
    const opt = new Optional<T1>();
    opt.set(value);
    return opt;
  }

  @elanProcedure([])
  clear(): void {
    this._value = undefined;
  }

  @elanFunction([], FunctionOptions.pure, ElanT1)
  withClear(): Optional<T1> {
    return new Optional<T1>();
  }
}

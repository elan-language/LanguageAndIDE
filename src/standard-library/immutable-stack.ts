import { ElanRuntimeError } from "../elan-runtime-error";
import {
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanProcedure,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

export class ImmutableStack {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ImmutableStack();
  }

  constructor() {
    this.contents = [];
  }

  private contents: object[];

  private system?: System;

  @elanFunction(FunctionOptions.pure, ElanT1)
  peek() {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot peek from an empty Stack - check using length()`);
    }
    return this.contents[0];
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanProcedure()
  push<T1 extends object>(@elanGenericParamT1Type() item: T1) {
    if (this.contents.length > 0) {
      const itemT = typeof item;
      const stackT = typeof this.contents[0];
      if (itemT !== stackT) {
        throw new ElanRuntimeError(`Attempting to push a ${itemT} onto a Stack of type ${stackT}`);
      }
    }
    this.contents.unshift(item);
  }

  @elanFunction(FunctionOptions.impure, ElanT1)
  pop() {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot peek an empty Stack - check using length()`);
    }
    const result = this.contents[0];
    this.contents.splice(0, 1);
    return result;
  }
}

import { ElanRuntimeError } from "../elan-runtime-error";
import {
    ClassOption,
    elanClass,
    elanFunction,
    elanGenericParamT1Type,
    ElanInt,
    elanProcedure,
    ElanT1,
    FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

@elanClass(ClassOption.concrete, [ElanT1])
export class Stack<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Stack();
  }

  async _initialise() {
    return this;
  }

  constructor() {
    this.contents = [];
  }

  private contents: T1[];

  private system?: System;

  @elanFunction([], FunctionOptions.pure, ElanT1)
  peek(): T1 {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot peek an empty Stack - check using length()`);
    }
    return this.contents[0];
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanProcedure([])
  push(@elanGenericParamT1Type() item: T1) {
    this.contents.unshift(item);
  }

  @elanFunction([], FunctionOptions.impure, ElanT1)
  pop(): T1 {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot pop an empty Stack - check using length()`);
    }
    const result = this.contents[0];
    this.contents.splice(0, 1);
    return result;
  }
}

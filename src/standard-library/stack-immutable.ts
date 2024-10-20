import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ElanClass,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  ElanT1,
  ElanTuple,
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

  @elanFunction(FunctionOptions.pure, ElanClass(ImmutableStack))
  push<T1 extends object>(@elanGenericParamT1Type() item: T1) {
    if (this.contents.length > 0) {
      const itemT = typeof item;
      const stackT = typeof this.contents[0];
      if (itemT !== stackT) {
        // TODO: This check can be removed when the class has generic type
        throw new ElanRuntimeError(
          `Attempting to push an incompatible type onto a non-empty ImmutableStack`,
        );
      }
    }
    const copy = this.system!.initialise(new ImmutableStack());
    copy.contents = this.contents;
    copy.contents.unshift(item);
    return copy;
  }

  @elanFunction(FunctionOptions.pure, ElanTuple([ElanClass(ImmutableStack), ElanT1]))
  pop() {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannotpop an empty ImmutableStack - check using length()`);
    }
    const copy = this.system!.initialise(new ImmutableStack());
    copy.contents = this.contents;
    const result = copy.contents[0];
    copy.contents.splice(0, 1);
    return [copy, result];
  }
}

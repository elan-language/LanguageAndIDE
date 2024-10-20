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

export class ImmutableQueue {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ImmutableQueue();
  }

  constructor() {
    this.contents = [];
  }

  private contents: object[];

  private system?: System;

  @elanFunction(FunctionOptions.pure, ElanT1)
  peek() {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot peek from an empty ImmutableQueue - check using length()`);
    }
    return this.contents[0];
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanFunction(FunctionOptions.pure, ElanClass(ImmutableQueue))
  enqueue<T1 extends object>(@elanGenericParamT1Type() item: T1) {
    if (this.contents.length > 0) {
      const itemT = typeof item;
      const stackT = typeof this.contents[0];
      // TODO: This check can be removed when the class has generic type
      if (itemT !== stackT) {
        throw new ElanRuntimeError(
          `Attempting to push an incompatible type onto a non-empty ImmutableQueue`,
        );
      }
    }
    const copy = this.system!.initialise(new ImmutableQueue());
    copy.contents = this.contents;
    copy.contents.push(item);
    return copy;
  }

  @elanFunction(FunctionOptions.pure, ElanTuple([ElanClass(ImmutableQueue), ElanT1]))
  dequeue() {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot dequeue an empty ImmutableQueue - check using length()`);
    }
    const copy = this.system!.initialise(new ImmutableQueue());
    copy.contents = this.contents;
    const result = copy.contents[0];
    copy.contents.splice(0, 1);
    return [copy, result];
  }
}

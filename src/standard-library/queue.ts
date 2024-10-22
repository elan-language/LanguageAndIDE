import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ClassOptions,
  elanClass,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanProcedure,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

@elanClass(ClassOptions.concrete, [ElanT1])
export class Queue<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Queue();
  }

  constructor() {
    this.contents = [];
  }

  private contents: T1[];

  private system?: System;

  @elanFunction(FunctionOptions.pure, ElanT1)
  peek(): T1 {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot peek an empty Queue - check using length()`);
    }
    return this.contents[0];
  }

  @elanFunction(FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanProcedure()
  enqueue(@elanGenericParamT1Type() item: T1) {
    if (this.contents.length > 0) {
      const itemT = typeof item;
      const queueT = typeof this.contents[0];
      // TODO: This check can be removed when the class has generic type
      if (itemT !== queueT) {
        throw new ElanRuntimeError(
          `Attempting to push an incompatible type onto a non-empty Queue`,
        );
      }
    }
    this.contents.push(item);
  }

  @elanFunction(FunctionOptions.impure, ElanT1)
  dequeue(): T1 {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot dequeue an empty Queue - check using length()`);
    }
    const result = this.contents[0];
    this.contents.splice(0, 1);
    return result;
  }
}

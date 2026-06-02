import {
  ClassOption,
  elanClass,
  ElanClass,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanProcedure,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { ElanRuntimeError } from "./elan-runtime-error";

@elanClass(ClassOption.record, [ElanT1])
export class Queue<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Queue();
  }

  async _initialise() {
    return this;
  }

  constructor(arr?: T1[]) {
    this.contents = arr ? [...arr] : [];
  }

  private contents: T1[];

  private system?: System;

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanFunction([], FunctionOptions.pure, ElanT1)
  peek(): T1 {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot peek an empty Queue - check using length()`);
    }
    return this.contents[0];
  }

  @elanProcedure(["item"])
  enqueue(@elanGenericParamT1Type() item: T1) {
    this.contents.push(item);
  }

  @elanFunction([], FunctionOptions.impure, ElanT1)
  dequeue(): T1 {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot dequeue an empty Queue - check using length()`);
    }
    return this.contents.shift() as T1;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(Queue))
  withEnqueue(@elanGenericParamT1Type() item: T1) {
    const newContents = [...this.contents];
    newContents.push(item);
    return this.system!.initialise(new Queue(newContents));
  }

  @elanFunction([], FunctionOptions.impure, ElanClass(Queue))
  withDequeue(): Queue<T1> {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot dequeue an empty Queue - check using length()`);
    }
    const newContents = [...this.contents];
    newContents.shift();
    return this.system!.initialise(new Queue(newContents));
  }

  async toString() {
    const items: string[] = [];
    for (const i of this.contents) {
      const s = await this.system!.toString(i);
      items.push(s);
    }
    return `[${items.join(", ")}]`;
  }
}

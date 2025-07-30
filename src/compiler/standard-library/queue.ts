import {
  ClassOption,
  elanClass,
  ElanClass,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  ElanT1,
  ElanTuple,
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

  @elanFunction([], FunctionOptions.pure, ElanT1)
  peek(): T1 {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot peek an empty Queue - check using length()`);
    }
    return this.contents[0];
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(Queue))
  enqueue(@elanGenericParamT1Type() item: T1) {
    const newContents = [...this.contents];
    newContents.push(item);
    return this.system!.initialise(new Queue(newContents));
  }

  @elanFunction([], FunctionOptions.impure, ElanTuple([ElanT1, ElanClass(Queue)]))
  dequeue(): [typeof ElanT1, typeof Queue] {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot dequeue an empty Queue - check using length()`);
    }
    const newContents = [...this.contents];
    const item = newContents.shift();
    const newQueue = this.system!.initialise(new Queue(newContents));
    return this.system!.tuple([item, newQueue]) as [typeof ElanT1, typeof Queue];
  }

  async asString() {
    const items: string[] = [];
    for (const i of this.contents) {
      const s = await this.system!.asString(i);
      items.push(s);
    }
    return `[${items.join(", ")}]`;
  }
}

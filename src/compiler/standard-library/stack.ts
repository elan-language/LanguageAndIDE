import { System } from "../../ide/system";
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
import { ElanRuntimeError } from "./elan-runtime-error";

@elanClass(ClassOption.record, [ElanT1])
export class Stack<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Stack();
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
      throw new ElanRuntimeError(`Cannot peek an empty Stack - check using length()`);
    }
    return this.contents[0];
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(Stack))
  push(@elanGenericParamT1Type() item: T1) {
    const newContents = [...this.contents];
    newContents.unshift(item);
    return this.system!.initialise(new Stack(newContents));
  }

  @elanFunction([], FunctionOptions.impure, ElanTuple([ElanT1, ElanClass(Stack)]))
  pop(): [typeof ElanT1, typeof Stack] {
    if (this.contents.length === 0) {
      throw new ElanRuntimeError(`Cannot pop an empty Stack - check using length()`);
    }
    const newContents = [...this.contents];
    const item = newContents.shift();
    const newStack = this.system!.initialise(new Stack(newContents));
    return this.system!.tuple([item, newStack]) as [typeof ElanT1, typeof Stack];
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

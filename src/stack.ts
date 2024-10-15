import { ElanRuntimeError } from "./elan-runtime-error";
import {
  ElanClass,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanIntType,
  elanProcedure,
  ElanString,
  ElanT1,
  ElanTuple,
  FunctionOptions,
  ProcedureOptions,
} from "./elan-type-annotations";
import { System } from "./system";

export class Stack {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Stack();
  }

  constructor() {
    this.contents = [];
  }

  private contents: object[];

  private system?: System;

  @elanFunction(FunctionOptions.pure,  ElanT1)
  peek() {
    return this.contents[0];
  }

  @elanFunction(FunctionOptions.pure,  ElanInt)
  length() {
    return this.contents.length;
  }

  @elanProcedure()
  push<T1>(@elanIntType() @elanGenericParamT1Type() item: T1) {
    //this.contents.unshift(item); //Not sure how to handle the constraint that T1 must extend 'object'
  }

  @elanFunction(FunctionOptions.impure,  ElanT1)
  pop() {
    const result = this.contents[0];
    this.contents.splice(0,1);
    return result;
  }

}

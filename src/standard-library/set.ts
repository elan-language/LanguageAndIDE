import {
  ClassOptions,
  ElanBoolean,
  ElanClass,
  elanClass,
  elanFunction,
  ElanInt,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

@elanClass(ClassOptions.concrete, [ElanT1])
export class ElanSet<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ElanSet();
  }

  constructor() {
    this.contents = new Set<T1>();
  }

  private contents: Set<T1>;

  private system?: System;

  @elanFunction(FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.size;
  }

  @elanFunction(FunctionOptions.pure, ElanBoolean)
  contains(item: T1) {
    return this.contents.has(item);
  }

  @elanFunction(FunctionOptions.pure, ElanClass(ElanSet))
  add(item: T1): ElanSet<T1> {
    const copy = this.system!.initialise(new ElanSet<T1>());
    copy.contents.add(item);
    return copy;
  }

  @elanFunction(FunctionOptions.impure, ElanClass(ElanSet))
  remove(item: T1): ElanSet<T1> {
    const copy = this.system!.initialise(new ElanSet<T1>());
    copy.contents.delete(item);
    return copy;
  }

  //TODO
  // difference, intersection, union, isDisjointFrom, isSubsetOf, isSupersetOf
  // asList, asArray, asString
}

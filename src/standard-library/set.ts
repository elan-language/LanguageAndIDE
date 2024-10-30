import {
  ClassOptions,
  ElanArray,
  ElanBoolean,
  ElanClass,
  elanClass,
  elanClassType,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanIterableType,
  ElanList,
  elanProperty,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { StdLib } from "./std-lib";

@elanClass(ClassOptions.concrete, [ElanT1], [], [], "Set")
export class ElanSet<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ElanSet();
  }

  private _system?: System;

  set system(value: System) {
    this._system = value;
    this.contents = this._system!.initialise(new Set<T1>());
  }

  get system(): System {
    return this._system!;
  }

  private stdlib!: StdLib; // injected

  constructor() {
    this.contents = new Set<T1>(); //Initialised in set system
  }

  private contents: Set<T1>;

  private copyOfThis(): ElanSet<T1> {
    const copy = this.system!.initialise(new ElanSet<T1>());
    copy.contents = this.contents;
    return copy;
  }

  // todo update stdlib classes with proper properties and remove these and update test
  @elanProperty(ElanInt)
  get size() {
    return this.contents.size;
  }

  @elanProperty(ElanInt)
  initialSize: number = 0;
  // end

  @elanFunction(FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.size;
  }

  @elanFunction(FunctionOptions.pure, ElanBoolean)
  contains(@elanGenericParamT1Type() item: T1) {
    return this.contents.has(item);
  }

  @elanFunction(FunctionOptions.pure, ElanClass(ElanSet))
  add(@elanGenericParamT1Type() item: T1): ElanSet<T1> {
    const copy = this.copyOfThis();
    copy.contents.add(item);
    return copy;
  }

  @elanFunction(FunctionOptions.impure, ElanClass(ElanSet))
  remove(@elanGenericParamT1Type() item: T1): ElanSet<T1> {
    const copy = this.copyOfThis();
    copy.contents.delete(item);
    return copy;
  }

  @elanFunction(FunctionOptions.pure, ElanClass(ElanSet))
  union(@elanClassType(ElanSet) other: ElanSet<T1>): ElanSet<T1> {
    const copy = this.copyOfThis();
    copy.contents = this.contents.union(other.contents);
    return copy;
  }

  @elanFunction(FunctionOptions.pure, ElanClass(ElanSet))
  difference(@elanClassType(ElanSet) other: ElanSet<T1>): ElanSet<T1> {
    const copy = this.copyOfThis();
    copy.contents = this.contents.difference(other.contents);
    return copy;
  }

  @elanFunction(FunctionOptions.pure, ElanClass(ElanSet))
  intersection(@elanClassType(ElanSet) other: ElanSet<T1>): ElanSet<T1> {
    const copy = this.copyOfThis();
    copy.contents = this.contents.intersection(other.contents);
    return copy;
  }

  @elanFunction(FunctionOptions.pure)
  isDisjointFrom(@elanClassType(ElanSet) other: ElanSet<T1>): boolean {
    return this.contents.isDisjointFrom(other.contents);
  }

  @elanFunction(FunctionOptions.pure)
  isSubsetOf(@elanClassType(ElanSet) other: ElanSet<T1>): boolean {
    return this.contents.isSubsetOf(other.contents);
  }

  @elanFunction(FunctionOptions.pure)
  isSupersetOf(@elanClassType(ElanSet) other: ElanSet<T1>): boolean {
    return this.contents.isSupersetOf(other.contents);
  }

  @elanFunction(FunctionOptions.pure, ElanArray(ElanT1))
  asArray(@elanClassType(ElanSet) other: ElanSet<T1>): T1[] {
    return Array.from(this.contents);
  }

  @elanFunction(FunctionOptions.pure, ElanList(ElanT1))
  asList(@elanClassType(ElanSet) other: ElanSet<T1>): T1[] {
    return Array.from(this.contents);
  }

  @elanFunction(FunctionOptions.pure)
  asString(): string {
    return this.stdlib.asString(this.stdlib.asList(Array.from(this.contents)));
  }
}
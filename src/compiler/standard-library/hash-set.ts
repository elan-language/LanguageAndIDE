import {
  ClassOption,
  ElanBoolean,
  elanClass,
  ElanClass,
  elanClassType,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  ElanString,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { List } from "./list";

@elanClass(ClassOption.record, [ElanT1], [], [], [], "HashSet")
export class HashSet<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new HashSet();
  }

  async _initialise() {
    return this;
  }

  private _system?: System;

  set system(value: System) {
    this._system = value;
  }

  get system(): System {
    return this._system!;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private stdlib!: any; // injected

  constructor(arr?: T1[]) {
    this.contents = arr ? new Set<T1>(arr) : new Set<T1>(); //Initialised in set system
  }

  private contents: Set<T1>;

  private copyOfThis(): HashSet<T1> {
    const copy = this.system!.initialise(new HashSet<T1>());
    copy.contents = new Set<T1>(this.contents);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.size;
  }

  @elanFunction([], FunctionOptions.pure, ElanBoolean)
  contains(@elanGenericParamT1Type() item: T1) {
    return this.contents.has(item);
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(HashSet))
  add(@elanGenericParamT1Type() item: T1): HashSet<T1> {
    const copy = this.copyOfThis();
    copy.contents.add(item);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(HashSet))
  addFromList(@elanClassType(List) list: List<T1>): HashSet<T1> {
    const copy = this.copyOfThis();
    for (const item of list) {
      copy.contents.add(item as T1);
    }
    return copy;
  }

  @elanFunction([], FunctionOptions.impure, ElanClass(HashSet))
  remove(@elanGenericParamT1Type() item: T1): HashSet<T1> {
    const copy = this.copyOfThis();
    copy.contents.delete(item);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(HashSet))
  union(@elanClassType(HashSet) other: HashSet<T1>): HashSet<T1> {
    const copy = this.copyOfThis();
    copy.contents = this.contents.union(other.contents);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(HashSet))
  difference(@elanClassType(HashSet) other: HashSet<T1>): HashSet<T1> {
    const copy = this.copyOfThis();
    copy.contents = this.contents.difference(other.contents);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(HashSet))
  intersection(@elanClassType(HashSet) other: HashSet<T1>): HashSet<T1> {
    const copy = this.copyOfThis();
    copy.contents = this.contents.intersection(other.contents);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure)
  isDisjointFrom(@elanClassType(HashSet) other: HashSet<T1>): boolean {
    return this.contents.isDisjointFrom(other.contents);
  }

  @elanFunction([], FunctionOptions.pure, ElanBoolean)
  isSubsetOf(@elanClassType(HashSet) other: HashSet<T1>): boolean {
    return this.contents.isSubsetOf(other.contents);
  }

  @elanFunction([], FunctionOptions.pure, ElanBoolean)
  isSupersetOf(@elanClassType(HashSet) other: HashSet<T1>): boolean {
    return this.contents.isSupersetOf(other.contents);
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(List))
  asList(): List<T1> {
    return this.system.initialise(new List(Array.from(this.contents)));
  }

  @elanFunction([], FunctionOptions.pureAsync, ElanString)
  async toString(): Promise<string> {
    const list = this.system.initialise(new List(Array.from(this.contents)));
    return await this.stdlib.toString(list);
  }
}

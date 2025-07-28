import { System } from "../../ide/system";
import {
  elanClass,
  ClassOption,
  ElanT1,
  elanFunction,
  FunctionOptions,
  ElanInt,
  ElanBoolean,
  elanGenericParamT1Type,
  ElanClass,
  elanClassType,
  ElanString,
} from "../elan-type-annotations";
import { List } from "./list";
import { ListImmutable } from "./list-immutable";

@elanClass(ClassOption.record, [ElanT1], [], [], [], "Set")
export class ElanSet<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ElanSet();
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

  private copyOfThis(): ElanSet<T1> {
    const copy = this.system!.initialise(new ElanSet<T1>());
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

  @elanFunction([], FunctionOptions.pure, ElanClass(ElanSet))
  add(@elanGenericParamT1Type() item: T1): ElanSet<T1> {
    const copy = this.copyOfThis();
    copy.contents.add(item);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(ElanSet))
  addFromList(@elanClassType(List) list: List<T1>): ElanSet<T1> {
    const copy = this.copyOfThis();
    for (const item of list) {
      copy.contents.add(item as T1);
    }
    return copy;
  }

  @elanFunction([], FunctionOptions.impure, ElanClass(ElanSet))
  remove(@elanGenericParamT1Type() item: T1): ElanSet<T1> {
    const copy = this.copyOfThis();
    copy.contents.delete(item);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(ElanSet))
  union(@elanClassType(ElanSet) other: ElanSet<T1>): ElanSet<T1> {
    const copy = this.copyOfThis();
    copy.contents = this.contents.union(other.contents);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(ElanSet))
  difference(@elanClassType(ElanSet) other: ElanSet<T1>): ElanSet<T1> {
    const copy = this.copyOfThis();
    copy.contents = this.contents.difference(other.contents);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(ElanSet))
  intersection(@elanClassType(ElanSet) other: ElanSet<T1>): ElanSet<T1> {
    const copy = this.copyOfThis();
    copy.contents = this.contents.intersection(other.contents);
    return copy;
  }

  @elanFunction([], FunctionOptions.pure)
  isDisjointFrom(@elanClassType(ElanSet) other: ElanSet<T1>): boolean {
    return this.contents.isDisjointFrom(other.contents);
  }

  @elanFunction([], FunctionOptions.pure, ElanBoolean)
  isSubsetOf(@elanClassType(ElanSet) other: ElanSet<T1>): boolean {
    return this.contents.isSubsetOf(other.contents);
  }

  @elanFunction([], FunctionOptions.pure, ElanBoolean)
  isSupersetOf(@elanClassType(ElanSet) other: ElanSet<T1>): boolean {
    return this.contents.isSupersetOf(other.contents);
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(List))
  asList(): List<T1> {
    return this.system.initialise(new List(Array.from(this.contents)));
  }

  @elanFunction([], FunctionOptions.pureAsync, ElanString)
  async asString(): Promise<string> {
    const listImm = this.system.initialise(new ListImmutable(Array.from(this.contents)));
    return await this.stdlib.asString(listImm);
  }
}

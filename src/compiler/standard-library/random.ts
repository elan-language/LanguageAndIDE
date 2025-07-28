import { System } from "../../ide/system";
import {
  elanClass,
  ClassOption,
  elanFunction,
  FunctionOptions,
  ElanTuple,
  ElanFloat,
  ElanClass,
  ElanInt,
  elanIntType,
  elanProcedure,
} from "../elan-type-annotations";

// Credit for source of algorithm: https://www.codeproject.com/Articles/25172/Simple-Random-Number-Generation
@elanClass(ClassOption.record)
export class Random {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Random();
  }

  async _initialise() {
    return this;
  }

  constructor() {
    this.u = 521288629;
    this.v = 362436069;
  }

  private system?: System;

  private u: number;

  private v: number;

  @elanFunction([], FunctionOptions.pure, ElanTuple([ElanFloat, ElanClass(Random)]))
  next() {
    return this.nextImpl();
  }

  nextImpl(): [number, Random] {
    const value = this.lo32(this.lo32(this.u * 65536) + this.v + 1) * 2.328306435454494e-10;
    const rnd2 = this.system!.initialise(new Random());
    rnd2.u = 36969 * (this.u % 65536) + this.u / 65536;
    rnd2.v = 18000 * (this.v % 65536) + this.v / 65536;
    return [value, rnd2];
  }

  private lo32(n: number): number {
    return n % 4294967296;
  }

  @elanFunction([], FunctionOptions.pure, ElanTuple([ElanInt, ElanClass(Random)]))
  nextInt(@elanIntType() min: number, @elanIntType() max: number) {
    const [float, rnd2] = this.nextImpl();
    const value = Math.floor(float * (max - min + 1) + min);
    return [value, rnd2];
  }

  @elanProcedure([])
  initialiseFromClock() {
    const c = new Date().getTime();
    this.u = (c % 1000) * 1000000;
    this.v = 0;
  }
}

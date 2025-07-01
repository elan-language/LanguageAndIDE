import { Class } from "../compiler-interfaces/class";

export interface Member {
  isMember: boolean;
  private: boolean;
  isAbstract: boolean;
  getClass(): Class;
}

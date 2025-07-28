import { Class } from "./class";

export interface Member {
  isMember: boolean;
  private: boolean;
  isAbstract: boolean;
  getClass(): Class;
}

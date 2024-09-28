import { ClassFrame } from "../globals/class-frame";

export interface Member {
  isMember: boolean;
  private: boolean;
  isAbstract: boolean;
  getClass(): ClassFrame;
}

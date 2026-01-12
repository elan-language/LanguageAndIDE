import { Frame } from "./frame";

export interface MemberFrame extends Frame {
  isMember: boolean;
  private: boolean;
  isAbstract: boolean;
}

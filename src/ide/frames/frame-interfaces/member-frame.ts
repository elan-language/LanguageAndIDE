import { Frame } from "./frame";

export interface MemberFrame extends Frame {
  isMember: boolean;
  isPrivate: boolean;
  isAbstract: boolean;
  isOnAbstractClass(): boolean;
}

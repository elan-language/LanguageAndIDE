import { MemberFrame } from "./member-frame";

export interface PossiblyPrivateMember extends MemberFrame {
  makePublic: () => boolean;
  makePrivate: () => boolean;
}

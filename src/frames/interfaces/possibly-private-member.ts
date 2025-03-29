import { Member } from "./member";

export interface PossiblyPrivateMember extends Member {
  makePublic: () => void;
  makePrivate: () => void;
}

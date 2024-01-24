import { AbstractFrame } from "../abstract-frame";

export enum Role {
    global,
    member
}

export interface Member extends AbstractFrame {
    isMember : boolean;
}
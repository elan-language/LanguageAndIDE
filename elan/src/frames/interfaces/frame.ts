import { Field } from "./field";
import { Selectable } from "./selectable";
import { ParseStatus } from "../parse-status";
import { Parent } from "./parent";

export interface Frame extends Selectable {
    // external use
    isFrame: boolean;
    
    getFirstPeerFrame(): Frame;
    getLastPeerFrame(): Frame;
    getPreviousPeerFrame(): Frame;
    getNextPeerFrame(): Frame;

    getParent(): Parent;
    getMap(): Map<string, Selectable>;

    renderAsHtml(): string;
    renderAsSource(): string;

    indent(): string;

    getFields(): Field[];
    worstStatusOfFields(): ParseStatus;

    selectFirstField() : boolean;
    selectFieldBefore(current: Field) : boolean;
    selectFieldAfter(current: Field): boolean;

    getLastFieldOrSuitableFrame() : Selectable;
    //If none, return this
    getNextFramePeerOrAbove(): Frame;

    canInsertBefore(): boolean;
    canInsertAfter(): boolean;
}
import { Field } from "./field";
import { Selectable } from "./selectable";
import { ParseStatus } from "../parse-status";
import { Parent } from "./parent";

export interface Frame extends Selectable {
    // external use
    isFrame: boolean;
    
    getFirstPeerFrame(): Frame;
    getLastPeerFrame(): Frame;
    getPreviousFrame(): Frame;
    getNextFrame(): Frame;

    getParent(): Parent;
    getMap(): Map<string, Selectable>;

    renderAsHtml(): string;
    renderAsSource(): string;

    indent(): string;

    getFields(): Field[];
    worstStatusOfFields(): ParseStatus;

    selectFirstFieldOrSuitableFrameIfNone() : void;
    selectFieldOrFrameBefore(current: Field) : void;
    selectFieldOrFrameAfter(current: Field): void;
}
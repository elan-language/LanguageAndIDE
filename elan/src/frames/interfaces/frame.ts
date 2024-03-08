import { Field } from "./field";
import { Selectable } from "./selectable";
import { ParseStatus } from "../parse-status";
import { Parent } from "./parent";

export interface Frame extends Selectable {
    isFrame: boolean;
    
    getParent(): Parent;
    getMap(): Map<string, Selectable>;

    renderAsHtml(): string;
    renderAsSource(): string;

    indent(): string;

    getFields(): Field[];
    worstStatusOfFields(): ParseStatus;

    selectFirstField() : boolean;
    selectLastField() : boolean;
    selectFieldBefore(current: Field) : boolean;
    selectFieldAfter(current: Field): boolean;

    //If none, return this
    getNextFrameInTabOrder(): Frame;
    getPreviousFrameInTabOrder(): Frame;

    canInsertBefore(): boolean;
    canInsertAfter(): boolean;

    fieldUpdated(field: Field): void;
}
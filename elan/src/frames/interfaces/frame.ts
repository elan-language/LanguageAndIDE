import { File } from "./file";
import { Field } from "./field";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";
import { ParsingStatus } from "../parsing-status";
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
    worstStatusOfFields(): ParsingStatus;

    selectPreviousField() : void;
    selectNextField(): void;
}
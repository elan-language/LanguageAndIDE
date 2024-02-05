import { File } from "./file";
import { Field } from "./field";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";
import { ParsingStatus } from "../parsing-status";

export interface Frame extends Selectable {
    // external use
    isFrame: boolean;
    
    getFirstPeerFrame(): Frame;
    getLastPeerFrame(): Frame;
    getPreviousFrame(): Frame;
    getNextFrame(): Frame;

    getParent(): Frame | File;
    getMap(): Map<string, Selectable>;

    renderAsHtml(): string;
    renderAsSource(): string;

    getFactory(): StatementFactory;
    indent(): string;

    getFields(): Field[];
    worstStatusOfFields(): ParsingStatus;
}
import { Frame } from "./frame";
import { FrameFactory } from "./frame-factory";

export interface Parent {
    isParent(): boolean;
    selectFirstChild(multiSelect: boolean): boolean; //Cursor right
    selectLastChild(multiSelect: boolean): void; //Cursor right
    selectChildAfter(child: Frame, multiSelect: boolean): void;
    selectChildBefore(child: Frame, multiSelect: boolean): void;
    selectChildRange(multiSelect: boolean): void;
    isRangeSelecting() : boolean; 
    getFrameMap(): Map<string, Frame>;
    getFactory(): FrameFactory;
    indent(): string;
    select(withFocus: boolean, multiSelect: boolean): void;
    selectFirstPeer(multiSelect: boolean): void;
    selectLastPeer(multiSelect: boolean): void;
}
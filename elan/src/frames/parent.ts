import { Frame } from "./frame";
import { StatementFactory } from "./statement-factory";

export interface Parent {
    isParent(): boolean;
    selectFirstChild(multiSelect: boolean): boolean; //Cursor right
    selectLastChild(multiSelect: boolean): void; //Cursor right
    selectChildAfter(child: Frame, multiSelect: boolean): void;
    selectChildBefore(child: Frame, multiSelect: boolean): void;
    selectChildRange(multiSelect: boolean): void;
    isRangeSelecting() : boolean; 
    getFrameMap(): Map<string, Frame>;
    getFactory(): StatementFactory;
    indent(): string;
    select(withFocus: boolean, multiSelect: boolean): void;
}
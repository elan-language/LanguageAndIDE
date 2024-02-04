import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";

export interface Parent {
    isParent(): boolean;
    selectFirstChild(multiSelect: boolean): boolean; //Cursor right
    selectLastChild(multiSelect: boolean): void; //Cursor right
    selectChildAfter(child: Selectable, multiSelect: boolean): void;
    selectChildBefore(child: Selectable, multiSelect: boolean): void;
    selectChildRange(multiSelect: boolean): void;
    isRangeSelecting() : boolean; 
    getMap(): Map<string, Selectable>;
    getFactory(): StatementFactory;
    indent(): string;
    select(withFocus: boolean, multiSelect: boolean): void;
}
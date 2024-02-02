import { Renderable } from "./frame";
import { StatementFactory } from "./statement-factory";

export interface Parent {
    isParent(): boolean;
    selectFirstChild(multiSelect: boolean): boolean; //Cursor right
    selectLastChild(multiSelect: boolean): void; //Cursor right
    selectChildAfter(child: Renderable, multiSelect: boolean): void;
    selectChildBefore(child: Renderable, multiSelect: boolean): void;
    selectChildRange(multiSelect: boolean): void;
    isRangeSelecting() : boolean; 
    getMap(): Map<string, Renderable>;
    getFactory(): StatementFactory;
    indent(): string;
    select(withFocus: boolean, multiSelect: boolean): void;
}
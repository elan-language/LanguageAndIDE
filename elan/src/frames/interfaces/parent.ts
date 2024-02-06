import { Frame } from "./frame";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";

export interface Parent {
    //External use
    isParent: boolean;
    getFirstChild(): Frame; 
    getLastChild(): Frame;
    expand(): void;
    collapse(): void;
    
    //Internal use
    getChildAfter(child: Frame): Frame;
    getChildBefore(child: Frame): Frame;
    getChildRange(first: Frame, last: Frame): Frame[];

    getStatementFactory() : StatementFactory;
    indent(): string;

    isRangeSelecting(): boolean
    selectRange(multiSelect: boolean): void;

    getMap(): Map<string, Selectable>;
    getFactory(): StatementFactory;
}
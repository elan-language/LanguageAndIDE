import { Frame } from "./frame";
import { StatementFactory } from "./statement-factory";

export interface ParentFrame extends Frame {
    //External use
    isParent: boolean;
    getFirstChild(): Frame; 
    getLastChild(): Frame;
    expand(): void;
    collapse(): void;
    
    //Internal use
    getChildAfter(): Frame;
    getChildBefore(): Frame;
    getChildAfter(): Frame;
    getChildrenBetween(first: Frame, last: Frame): Frame[];
    getStatementFactory() : StatementFactory;
    indent(): string;

    isRangeSelecting(): boolean
    selectRange(multiSelect: boolean): void;
}


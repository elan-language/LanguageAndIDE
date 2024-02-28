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

    indent(): string;

    getMap(): Map<string, Selectable>;
    getFactory() : StatementFactory;

    getIdPrefix(): string;
    hasParent(): boolean;
    getParent(): Parent;

    getLastFieldOrSuitableFrame() : Selectable;
}
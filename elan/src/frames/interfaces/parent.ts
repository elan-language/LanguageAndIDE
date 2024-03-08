import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { Field } from "./field";
import { Frame } from "./frame";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";

export interface Parent {
    //External use
    isParent: boolean;

    minimumNumberOfChildrenExceeded(): boolean;
    getFirstChild(): Frame; 
    getLastChild(): Frame;
    expand(): void;
    collapse(): void;
    
    getChildAfter(child: Frame): Frame;
    getChildBefore(child: Frame): Frame;
    getChildRange(first: Frame, last: Frame): Frame[];
    removeChild(child: Frame): void;

    indent(): string;

    getMap(): Map<string, Selectable>;
    getFactory() : StatementFactory;

    getIdPrefix(): string;
    hasParent(): boolean;
    getParent(): Parent;

    getFields(): Field[];

    moveSelectedChildrenDownOne(): void;
    moveSelectedChildrenUpOne(): void;

    insertChildSelector(after: boolean, child: Frame): void;
}
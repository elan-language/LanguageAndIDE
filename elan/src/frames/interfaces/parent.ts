import { ISymbol } from "../../symbols/symbol";
import { AbstractSelector } from "../abstract-selector";
import { Field } from "./field";
import { Frame } from "./frame";
import { Profile } from "./profile";
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
    
    getChildren(): Frame[];
    getChildAfter(child: Frame): Frame;
    getChildBefore(child: Frame): Frame;
    getChildRange(first: Frame, last: Frame): Frame[];
    removeChild(child: Frame): void;
    addChildBefore(newFrame: Frame, existingChild: Frame): void;
    addChildAfter(newFrame: Frame, existingChild: Frame): void;

    indent(): string;

    getMap(): Map<string, Selectable>;
    getFactory() : StatementFactory;
    getProfile() : Profile;

    getIdPrefix(): string;
    hasParent(): boolean;
    getParent(): Parent;

    getFields(): Field[];

    moveSelectedChildrenDownOne(): void;
    moveSelectedChildrenUpOne(): void;

    insertOrGotoChildSelector(after: boolean, child: Frame): void;
    newChildSelector(): AbstractSelector;

    getFactory(): StatementFactory;

    resolveSymbol(id: string, initialScope : Frame): ISymbol;
}
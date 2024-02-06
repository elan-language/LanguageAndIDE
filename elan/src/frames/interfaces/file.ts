import { ParsingStatus } from "../parsing-status";
import { Frame } from "./frame";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";

// Defines view of File from the internal (model) perspective, c.f. FileAPI for external (editor) view
export interface File {
    // external use
    isFile : boolean;
    getById(id: string) : Selectable;
    renderAsHtml(): string;
    renderAsSource(): string;

    getFirstChild(): Frame; 
    getLastChild(): Frame;

    addChildBefore(g: Frame, before: Frame): void;
    addChildAfter(g: Frame, after: Frame): void;

    getMap(): Map<string, Selectable>;
    getFactory(): StatementFactory;

    isRangeSelecting(): boolean
    selectRange(multiSelect: boolean): void;

    indent(): string;
    expandCollapseAll(): void;

    status(): ParsingStatus;

    //Internal use only
    addMainBefore(global: Frame): void;
    addFunctionBefore(global: Frame): void;
    addProcedureBefore(global: Frame): void;
    addEnumBefore(global: Frame): void;
    addClassBefore(global: Frame): void;
    addGlobalCommentBefore(global: Frame): void;
    addConstantBefore(global: Frame): void;
}
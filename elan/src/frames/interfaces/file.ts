import { ParsingStatus } from "../parsing-status";
import { Field } from "./field";
import { Global } from "./global";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";

// Defines view of File from the internal (model) perspective, c.f. FileAPI for external (editor) view
export interface File {
    // external use
    isFile : boolean;
    getById(id: string) : Selectable;
    renderAsHtml(): string;
    renderAsSource(): string;

    getFirstGlobal(): Global; 
    getLastGlobal(): Global;

    addGlobalBefore(g: Global, before: Global): void;
    addGlobalAfter(g: Global, after: Global): void;

    getFirstField(): Field;
    getMap(): Map<string, Selectable>;
    getFactory(): StatementFactory;

    isRangeSelecting(): boolean
    selectRange(multiSelect: boolean): void;

    indent(): string;
    expandCollapseAll(): void;

    status(): ParsingStatus;

    //Internal use only
    addMainBefore(global: Global): void;
    addFunctionBefore(global: Global): void;
    addProcedureBefore(global: Global): void;
    addEnumBefore(global: Global): void;
    addClassBefore(global: Global): void;
    addGlobalCommentBefore(global: Global): void;
    addConstantBefore(global: Global): void;
}
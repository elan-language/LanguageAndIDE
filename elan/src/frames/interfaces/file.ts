import { editorEvent } from "../interfaces/editor-event";
import { CodeSource } from "../code-source";
import { ParseStatus } from "../parse-status";
import { Frame } from "./frame";
import { Parent } from "./parent";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";

export interface File extends Parent {
    // external use
    isFile : boolean;
    getById(id: string) : Selectable;
    renderAsHtml(): string;
    renderAsSource(): string;

    addChildBefore(g: Frame, before: Frame): void;
    addChildAfter(g: Frame, after: Frame): void;

    getMap(): Map<string, Selectable>;
    getFactory(): StatementFactory;

    indent(): string;
    expandCollapseAll(): void;

    status(): ParseStatus;

    //Internal use only
    createMain(): Frame;
    createFunction(): Frame;
    createProcedure(): Frame;
    createEnum(): Frame;
    createClass(): Frame;
    createGlobalComment(): Frame;
    createConstant(): Frame;
    createTest(): Frame;

    parseFrom(source: CodeSource): void;

    containsMain(): boolean;

    parseError?: string;

    deselectAll(): void;
    processKey(e: editorEvent): void;
}
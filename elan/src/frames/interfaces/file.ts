import { editorEvent } from "../interfaces/editor-event";
import { CodeSource } from "../code-source";
import { ParseStatus } from "../parse-status";
import { Frame } from "./frame";
import { Parent } from "./parent";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";
import { Profile } from "./profile";
import { CompileStatus } from "../compile-status";
import { TestStatus } from "../test-status";
import { RunStatus } from "../run-status";

export interface File extends Parent {
    // external use
    isFile : boolean;
    getById(id: string) : Selectable;
    renderAsHtml(): string;
    renderAsSource(): string;
    compile(): string;

    addChildBefore(g: Frame, before: Frame): void;
    addChildAfter(g: Frame, after: Frame): void;

    getMap(): Map<string, Selectable>;
    getFactory(): StatementFactory;

    indent(): string;
    expandCollapseAll(): void;

    parseStatus(): ParseStatus;
    compileStatus(): CompileStatus;
    testStatus(): TestStatus;
    runStatus(): RunStatus;

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
import { editorEvent } from "../interfaces/editor-event";
import { CodeSource } from "../code-source";
import { CompileStatus, ParseStatus, RunStatus, TestStatus } from "../status-enums";
import { Frame } from "./frame";
import { Parent } from "./parent";
import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";
import { CompileError } from "../compile-error";
import { ScratchPad } from "../scratch-pad";
import { Profile } from "./profile";
import { Scope } from "./scope";

export interface File extends Parent {
    isFile : boolean;
    getById(id: string) : Selectable;
    renderAsHtml(): Promise<string>;
    renderAsSource(): Promise<string>;
    compile(): string;
    fileName : string;
    readonly defaultFileName: string;

    addChildBefore(g: Frame, before: Frame): void;
    addChildAfter(g: Frame, after: Frame): void;

    getMap(): Map<string, Selectable>;
    getFactory() : StatementFactory;
    getProfile() : Profile;
    getScratchPad(): ScratchPad;

    indent(): string;
    expandCollapseAll(): void;

    getParseStatus(): ParseStatus;
    getParseStatusForDashboard(): string;
    getCompileStatus(): CompileStatus
    getCompileStatusForDashboard(): string;
    getTestStatus(): TestStatus;
    getTestStatusForDashboard(): string;
    readRunStatus(): RunStatus;

    //Internal use only
    createMain(): Frame;
    createFunction(): Frame;
    createProcedure(): Frame;
    createEnum(): Frame;
    createClass(): Frame;
    createGlobalComment(): Frame;
    createConstant(): Frame;
    createTest(): Frame;

    parseFrom(source: CodeSource): Promise<void>;

    containsMain(): boolean;

    parseError?: string;

    deselectAll(): void;
    processKey(e: editorEvent): void;

    compileErrors(): CompileError[];

    setRunStatus(s : RunStatus) : void;

    libraryScope : Scope;
}
import { Field } from "./field";
import { Selectable } from "./selectable";
import { CodeStatus } from "../code-status";
import { Parent } from "./parent";
import { Scope } from "./scope";
import { CompileError } from "../compile-error";

export interface Frame extends Selectable, Scope {
    isFrame: boolean;
    
    getParent(): Parent;
    getMap(): Map<string, Selectable>;

    renderAsHtml(): string;
    renderAsSource(): string;
    compile(): string;

    indent(): string;

    getFields(): Field[];
    worstParseStatusOfFields(): CodeStatus;

    selectFirstField() : boolean;
    selectLastField() : boolean;
    selectFieldBefore(current: Field): void;
    selectFieldAfter(current: Field): void;

    //If none, return this
    getNextFrameInTabOrder(): Frame;
    getPreviousFrameInTabOrder(): Frame;

    canInsertBefore(): boolean;
    canInsertAfter(): boolean;

    fieldUpdated(field: Field): void;

    expandCollapseAll(): void;

    compileErrors: CompileError[];
    aggregateCompileErrors(): CompileError[];
    insertSelectorAfterLastField(): void;
    insertPeerSelector(before: boolean): void;

    initialKeywords(): string;
    setParent(parent: Parent): void;
}
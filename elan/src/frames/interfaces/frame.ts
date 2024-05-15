import { Field } from "./field";
import { Selectable } from "./selectable";
import { CompileStatus, ParseStatus } from "../status-enums";
import { Parent } from "./parent";
import { Scope } from "./scope";
import { CompileError } from "../compile-error";
import { File} from "./file";
import { Transforms } from "../syntax-nodes/transforms";

export interface Frame extends Selectable, Scope {
    isFrame: boolean;
    
    getFile(): File;
    getParent(): Parent;
    getMap(): Map<string, Selectable>;

    renderAsHtml(): string;
    renderAsSource(): string;
    compile(transforms : Transforms): string;

    indent(): string;

    getFields(): Field[];
    worstParseStatusOfFields(): ParseStatus;

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
    getCompileStatus(): CompileStatus;
    insertSelectorAfterLastField(): void;
    insertPeerSelector(before: boolean): void;

    initialKeywords(): string;
    setParent(parent: Parent): void;
}
import { Renderable } from "./frame";
import { ParsingStatus } from "./parsing-status";

export interface FileAPI {
    renderAsHtml(): string;
    renderAsSource(): string;

    status() : ParsingStatus;

    selectByID(id: string, multiSelect: boolean): void;

    expandByID(id: string) : void;

    expandCollapseAll(): void;

    expandCollapseByID(id: string): void;

    expandCollapseAllByFrame(f?: Renderable): void;

    expandCollapseAllByID(id: string): void;

    selectFirst(): void;

    selectLast(): void;

    deselectAll(): void;

    selectByID(id: string, multiSelect: boolean): void;

    expandCollapseByID(id: string): void;

    expandCollapseAllByID(id: string): void;

    collapseByID(id: string): void;

    expandByID(id: string): void;

    selectNextPeerByID(id: string, multiSelect: boolean): void;

    selectPreviousPeerByID(id: string, multiSelect: boolean): void;

    selectFirstPeerByID(id: string): void;

    selectLastPeerByID(id: string): void;

    selectParentByID(id: string): void;

    selectFirstChildByID(id: string): void;

    selectFirstByID(id: string): void;

    selectLastByID(id: string): void;

    selectNextTextByID(id: string): void;

    handleInput(id: string, key: string): void;
}
import { Parent } from "./parent";
import { ParsingStatus } from "./parsing-status";

export interface Frame  {
    getFrameMap(): Map<string, Frame>;
    
    renderAsHtml(): string;
    indent(): string;
    renderAsSource(): string;

    isSelected() : boolean;
    select(withFocus: boolean, multiSelect: boolean): void;
    deselect(): void;

    isFocused() : boolean;
    focus(): void;
    defocus(): void;

    isMultiline() : boolean;

    hasParent(): boolean;
    setParent(parent: Parent) : void;
    getParent() : Parent;
    selectParent(multiSelect: boolean): void; //Cursor left

    isParent(): boolean;
    selectFirstChild(multiSelect: boolean): boolean;

    //For methods below, if the operation is not valid in context, the current frame is returned
    selectNextPeer(multiSelect: boolean): void;
    selectPreviousPeer(multiSelect: boolean): void;
    selectFirstPeer(multiSelect: boolean): void; //Home
    selectLastPeer(multiSelect: boolean): void; //End

    selectFirstText(): boolean;

    isCollapsed() : boolean;
    collapse() : void;
    expand() : void;

    status() : ParsingStatus;
}
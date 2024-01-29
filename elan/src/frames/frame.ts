
export interface Frame {
    getFrameMap(): Map<string, Frame>;
    
    renderAsHtml(): string;
    indent(): string;
    renderAsSource(): string;

    isSelected() : boolean;
    select(withFocus: boolean, multiSelect?: boolean): void;
    deselect(): void;

    isFocused() : boolean;
    focus(): void;
    defocus(): void;

    isMultiline() : boolean;

    hasParent(): boolean;
    setParent(parent: Frame) : void;
    getParent() : Frame | undefined;
    selectParent(): void; //Cursor left

    hasChildren(): boolean;
    selectFirstChild(): boolean;

    //For methods below, if the operation is not valid in context, the current frame is returned
    selectNextPeer(): void;
    selectPreviousPeer(): void;
    selectFirstPeer(): void; //Home
    selectLastPeer(): void; //End

    selectFirstText(): boolean;

    isCollapsed() : boolean;
    collapse() : void;
    expand() : void;

    isComplete() : boolean;
}

export interface Frame {
    renderAsHtml(): string;
    
    renderAsSource(): string;

    initialize(frameMap : Map<string, Frame>, parent?: Frame) : void;

    isSelected() : boolean;
    select(): void;
    deselect(): void;

    hasParent(): boolean;
    setParent(parent: Frame) : void;
    getParent() : Frame | undefined;
    selectParent(): void; //Cursor left

    hasChildren(): boolean;
    selectFirstChild(): void;

    //For methods below, if the operation is not valid in context, the current frame is returned
    selectNextPeer(): void;
    selectPreviousPeer(): void;
    selectFirstPeer(): void; //Home
    selectLastPeer(): void; //End

    isCollapsed() : boolean;
    collapse() : void;
    expand() : void;
}
export interface Frame {
    renderAsHtml(): string;

    hasParent(): boolean;
    setParent(parent: Frame) : void;
    getParent() : Frame;
    selectParent(): void; //Cursor left

    hasChildren(): boolean;

    isSelected() : boolean;
    select(): void;
    deselect(): void;

    //For methods below, if the operation is not valid in context, the current frame is returned
    selectNextPeer(): void;
    selectPreviousPeer(): void;
    selectFirstPeer(): void; //Home
    selectLastPeer(): void; //End

    isCollapsed() : boolean;
    collapse() : void;
    expand() : void;
}
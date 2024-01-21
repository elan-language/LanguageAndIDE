export interface Frame {
    htmlId: string;
    
    renderAsHtml(): string;

    isSelected() : boolean;
    select(): void;
    deselect(): void;
    deselectAll() : void; //Might be unnecessary if this is handled via e.g. an external dictionary of all frames

    //For methods below, if the operation is not valid in context, the current frame is returned
    selectParent() : Frame; //Cursor left
    selectFirstChild(): Frame; //Cursor right
    selectNextPeer(keepingThisSelected?: boolean): Frame;
    selectPreviousPeer(keepingThisSelected?: boolean): Frame;
    selectFirstPeer(): Frame; //Home
    selectLastPeer(): Frame; //End

    isCollapsable() : boolean;
    isCollapsed() : boolean;
    collapse() : void;
    expand() : void;
    expandAll() : void;//Might be unnecessary if this is handled via e.g. an external dictionary of all frames
    collapseAll() : void;//Might be unnecessary if this is handled via e.g. an external dictionary of all frames
}
export interface Frame {
    htmlId: string;
    
    renderAsHtml(): string;

    hasParent() : boolean;
    getParent() : Frame;
    setParent(parent: Frame) : void;

    isSelected() : boolean;
    select(): void;
    deselect(): void;

    isCollapsable() : boolean;
    isCollapsed() : boolean;
    collapse() : void;
    expand() : void;
}
import { Frame } from "./frame";
import { HasChildren } from "./has-children";
import { nextId, singleIndent } from "./helpers";

export abstract class AbstractFrame implements Frame {
    
    private _frameMap?: Map<string, Frame>;
    abstract parent: Frame;
    protected htmlId: string = "";

    getFrameMap(): Map<string, Frame> {
        if (this._frameMap) {
            return this._frameMap;
        }
        throw new Error(`Frame : ${this.htmlId} not initialised`);
    }

    setFrameMap(frameMap: Map<string, Frame>) {
        this._frameMap = frameMap;
    }

    abstract getPrefix(): string;

    protected multiline: boolean = false;
    private selected: boolean = false;
    private focused: boolean = false;
    private collapsed: boolean = false;
    private _classes = new Array<string>;

    protected pushClass(flag: boolean, cls: string) {
        if (flag) {
            this._classes.push(cls);
        }
    }

    protected setClasses() {
        this._classes = new Array<string>();
        this.pushClass(this.multiline, "multiline");
        this.pushClass(this.collapsed, "collapsed");
        this.pushClass(this.selected, "selected");
        this.pushClass(this.focused, "focused");
    };

    protected cls(): string {
        this.setClasses();
        return this._classes.join(" ");
    };

    protected nextId(): number {
        return nextId();
    }

    abstract renderAsHtml(): string;

    indent(): string {
        if (this.hasParent()) {
            return this.getParent()?.indent() + singleIndent();
        } else {
            return singleIndent();
        }
    }

    abstract renderAsSource(): string;

    isSelected(): boolean {
        return this.selected;
    }

    isMultiline(): boolean {
        return this.multiline;
    }

    select(withFocus : boolean,  multiSelect: boolean): void {
        if (!multiSelect) {
            this.deselectAll();
        }
        this.selected = true; 
        if (multiSelect) {
            if (this.hasParent()) {
                var p = this.parent as HasChildren;
                if (!p.isRangeSelecting()){
                    p.selectChildRange(multiSelect);
                }
            }
        }
        this.focused = withFocus;
    }

    deselect(): void {
        this.selected = false;
        this.focused = false;
    }

    deselectAll() {
        for (const f of this.getFrameMap().values()) {
            if (f.isSelected()) {
                f.deselect();
            }
        }
    }

    hasParent(): boolean {
        return !!this.parent;
    }

    setParent(parent: Frame): void {
        this.parent = parent;
    }

    getParent(): Frame {
        return this.parent;
    }

    selectParent(multiSelect : boolean): void {
        if (this.hasParent()) {
            this.parent!.select(true, multiSelect);
        }
    }

    hasChildren(): boolean {
        return false;
    }

    selectFirstChild(multiSelect: boolean): boolean {
        //Do nothing, but overridden by anything implementing hasChildren
        return false;
    }

    selectNextPeer(multiSelect: boolean): void {
        if (this.hasParent()) {
            var p = this.parent as HasChildren;
            p.selectChildAfter(this, multiSelect);
        }
    }

    selectPreviousPeer(multiSelect: boolean): void {
        if (this.hasParent()) {
            var p = this.parent as HasChildren;
            p.selectChildBefore(this, multiSelect);
        }
    }

    selectFirstPeer(multiSelect: boolean): void {
        if (this.hasParent()) {
            var p = this.parent as HasChildren;
            p.selectFirstChild(multiSelect);
        }
    }

    selectLastPeer(multiSelect: boolean): void {
        if (this.hasParent()) {
            var p = this.parent as HasChildren;
            p.selectLastChild(multiSelect);
        }
    }

    isCollapsed(): boolean {
        return this.collapsed;
    }

    collapse(): void {
        if (this.multiline) {
            this.collapsed = true;
        }
    }

    expand(): void {
        this.collapsed = false;
    }

    selectFirstText(): boolean {
        return false;
    }

    isFocused(): boolean {
        return this.focused;
    }

    focus(): void {
        this.focused = true;
    }

    defocus(): void {
        this.focused = false;
    }

    isComplete(): boolean {
        return true;
    }
}
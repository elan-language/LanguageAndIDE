import { Frame } from "./frame";
import { HasChildren } from "./has-children";
import { nextId } from "./helpers";

export abstract class AbstractFrame implements Frame {
    private _frameMap?: Map<string, Frame>;
    private parent?: Frame;

    initialize(frameMap: Map<string, Frame>, parent?: Frame,): void {
        this.parent = parent;
        this._frameMap = frameMap;
        if (!this.htmlId) {
            throw new Error(`Frame htmlId not set ${typeof this}`);
        }
        this.frameMap.set(this.htmlId, this);
    }

    get frameMap() {
        if (this._frameMap) {
            return this._frameMap;
        }
        throw new Error(`Frame : ${this.htmlId} not initialised`);
    }

    protected htmlId: string = "";
    protected multiline: boolean = false;
    private selected: boolean = false;
    private collapsed: boolean = false;

    protected cls(): string {
        return `${this.multiline ? "multiline " : ""}${this.collapsed ? "collapsed " : ""}${this.selected ? "selected " : ""}`;
    };

    protected nextId(): number {
        return nextId();
    }

    abstract renderAsHtml(): string;

    hasParent(): boolean {
        return !!this.parent;
    }

    setParent(parent: Frame): void {
        this.parent = parent;
    }

    getParent(): Frame | undefined {
        return this.parent;
    }

    hasChildren(): boolean {
        return false;
    }

    isSelected(): boolean {
        return this.selected;
    }
    select(): void {
        this.selected = true; //TODO: is deselection to be handled externally, or here?
    }
    deselect(): void {
        this.selected = false;
    }
    selectParent(): void {
        if (this.hasParent()) {
            this.deselect();
            this.parent!.select();
        }
    }

    selectNextPeer(): void {
        if (this.hasParent()) {
            var p = this.parent as HasChildren;
            p.selectChildAfter(this);
        }
    }
    selectPreviousPeer(): void {
        if (this.hasParent()) {
            var p = this.parent as HasChildren;
            p.selectChildBefore(this);
        }
    }
    selectFirstPeer(): void {
        if (this.hasParent()) {
            var p = this.parent as HasChildren;
            p.selectFirstChild();
        }
    }
    selectLastPeer(): void {
        if (this.hasParent()) {
            var p = this.parent as HasChildren;
            p.selectLastChild();
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
}
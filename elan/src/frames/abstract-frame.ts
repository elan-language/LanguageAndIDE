import { Frame } from "./frame";
import { HasChildren } from "./has-children";
import { nextId, singleIndent } from "./helpers";

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

    select(multiSelect?: boolean): void {
        this.selected = true; //TODO: is deselection to be handled externally, or here?
        if (multiSelect) {
            if (this.hasParent()) {
                var p = this.parent as HasChildren;
                p.selectChildRange();
            }
        }
    }

    deselect(): void {
        this.selected = false;
    }

    hasParent(): boolean {
        return !!this.parent;
    }

    setParent(parent: Frame): void {
        this.parent = parent;
    }

    getParent(): Frame | undefined {
        return this.parent;
    }

    selectParent(): void {
        if (this.hasParent()) {
            this.deselect();
            this.parent!.select();
        }
    }

    hasChildren(): boolean {
        return false;
    }

    selectFirstChild(): boolean {
        //Do nothing, but overridden by anything implementing hasChildren
        return false;
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

    selectFirstText(): boolean {
        return false;
    }
}
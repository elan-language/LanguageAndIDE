import {Parent} from "./parent";
import { Frame } from "./frame";
import { nextId, singleIndent } from "./helpers";
import { StatementFactory } from "./statement-factory";
import { ParsingStatus } from "./parsing-status";

export abstract class AbstractFrame {
         
    private _parent?: Parent;
    private _frameMap?: Map<string, Frame>;
    private _factory?: StatementFactory;
    protected multiline: boolean = false;
    private selected: boolean = false;
    private focused: boolean = false;
    private collapsed: boolean = false;
    private _classes = new Array<string>;
    protected htmlId: string = "";

    constructor(parent: Parent) {
        this.setParent(parent);
        var frameMap = parent.getFrameMap();
        this.htmlId = `${this.getPrefix()}${this.nextId()}`;
        frameMap.set(this.htmlId, this);
        this.setFrameMap(frameMap);
        var factory = parent.getFactory();
        this.setFactory(factory);
    }

    getFrameMap(): Map<string, Frame> {
        if (this._frameMap) {
            return this._frameMap;
        }
        throw new Error(`Frame : ${this.htmlId} has no FrameMap`);
    }

    getFactory(): StatementFactory {
        if (this._factory) {
            return this._factory;
        }
        throw new Error(`Frame : ${this.htmlId} has no FrameFactory`);
    }

    setFrameMap(frameMap: Map<string, Frame>) {
        this._frameMap = frameMap;
    }

    setFactory(factory: StatementFactory) {
        this._factory = factory;
    }

    abstract getPrefix(): string;

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
                var p = this._parent as Parent;
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
        return !!this._parent;
    }

    setParent(parent: Parent): void {
        this._parent = parent;
    }

    getParent(): Parent {
        if (this._parent) {
            return this._parent;
        }
        throw new Error(`Frame : ${this.htmlId} has no Parent`);
    }

    selectParent(multiSelect : boolean): void {
        if (this.hasParent()) {
            this._parent!.select(true, multiSelect);
        }
    }

    isParent(): boolean {
        return false;
    }

    selectFirstChild(multiSelect: boolean): boolean {
        //Do nothing, but overridden by anything implementing hasChildren
        return false;
    }

    selectNextPeer(multiSelect: boolean): void {
        if (this.hasParent()) {
            var p = this._parent as Parent;
            p.selectChildAfter(this, multiSelect);
        }
    }

    selectPreviousPeer(multiSelect: boolean): void {
        if (this.hasParent()) {
            var p = this._parent as Parent;
            p.selectChildBefore(this, multiSelect);
        }
    }

    selectFirstPeer(multiSelect: boolean): void {
        if (this.hasParent()) {
            var p = this._parent as Parent;
            p.selectFirstChild(multiSelect);
        }
    }

    selectLastPeer(multiSelect: boolean): void {
        if (this.hasParent()) {
            var p = this._parent as Parent;
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

    status(): ParsingStatus {
        return ParsingStatus.valid;
    }
}
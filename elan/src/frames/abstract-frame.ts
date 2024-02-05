import {ParentFrame} from "./interfaces/parent-frame";
import { Selectable } from "./interfaces/selectable";
import { singleIndent } from "./helpers";
import { StatementFactory } from "./interfaces/statement-factory";
import { ParsingStatus } from "./parsing-status";
import { Frame } from "./interfaces/frame";
import { File } from "./interfaces/file";
import { Field } from "./interfaces/field";
import { KeyEvent } from "./interfaces/key-event";

export abstract class AbstractFrame implements Frame {  
    isFrame = true;
    private _parent: File | ParentFrame;
    private _map?: Map<string, Selectable>;
    private _factory?: StatementFactory;
    protected multiline: boolean = false;
    private selected: boolean = false;
    private focused: boolean = false;
    private collapsed: boolean = false;
    private _classes = new Array<string>;
    protected htmlId: string = "";

    constructor(parent: File | ParentFrame) {
        this._parent = parent;
        var map = parent.getMap();
        this.htmlId = `${this.getPrefix()}${map.size}`;
        map.set(this.htmlId, this);
        this.setMap(map);
        var factory = parent.getFactory();
        this.setFactory(factory);
    }
    getFirstPeerFrame(): Frame {
        throw new Error("Method not implemented.");
    }
    getLastPeerFrame(): Frame {
        throw new Error("Method not implemented.");
    }
    getPreviousFrame(): Frame {
        throw new Error("Method not implemented.");
    }
    getNextFrame(): Frame {
        throw new Error("Method not implemented.");
    }
    getFirstField(): Field {
        throw new Error("Method not implemented.");
    }
    processKey(keyEvent: KeyEvent): void {
        throw new Error("Method not implemented.");
    }

    getMap(): Map<string, Selectable> {
        if (this._map) {
            return this._map;
        }
        throw new Error(`Frame : ${this.htmlId} has no Map`);
    }

    getFactory(): StatementFactory {
        if (this._factory) {
            return this._factory;
        }
        throw new Error(`Frame : ${this.htmlId} has no FrameFactory`);
    }

    setMap(Map: Map<string, Selectable>) {
        this._map = Map;
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
                var p = this._parent as ParentFrame;
                if (!p.isRangeSelecting()){
                    p.selectRange(multiSelect);
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
        for (const f of this.getMap().values()) {
            if (f.isSelected()) {
                f.deselect();
            }
        }
    }

    hasParent(): boolean {
        return !!this._parent;
    }

    setParent(parent: ParentFrame): void {
        this._parent = parent;
    }

    getParent(): ParentFrame | File {
        if (this._parent) {
            return this._parent;
        }
        throw new Error(`Frame : ${this.htmlId} has no Parent`);
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
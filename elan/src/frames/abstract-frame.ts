import { Parent} from "./interfaces/parent";
import { Selectable } from "./interfaces/selectable";
import { singleIndent } from "./helpers";
import { StatementFactory } from "./interfaces/statement-factory";
import { ParsingStatus } from "./parsing-status";
import { Frame } from "./interfaces/frame";
import { File } from "./interfaces/file";
import { Field } from "./interfaces/field";
import { KeyEvent } from "./interfaces/key-event";
import { CodeSource } from "./code-source";

export abstract class AbstractFrame implements Frame {  
    isFrame = true;
    private _parent: File | Parent;
    private _map?: Map<string, Selectable>;
    private _factory: StatementFactory;
    protected multiline: boolean = false;
    private selected: boolean = false;
    private focused: boolean = false;
    private collapsed: boolean = false;
    private _classes = new Array<string>;
    protected htmlId: string = "";

    constructor(parent: Parent) {
        this._parent = parent;
        var map = parent.getMap();
        this.htmlId = `${this.getIdPrefix()}${map.size}`;
        map.set(this.htmlId, this);
        this.setMap(map);
        this._factory = parent.getFactory();
    }

    getFactory(): StatementFactory {
        return this._factory;
    }

    abstract getFields(): Field[];
    
    worstStatusOfFields(): ParsingStatus {
        return this.getFields().map(g => g.status()).reduce((prev, cur) => cur < prev ? cur : prev, ParsingStatus.valid);
    }
    getFirstPeerFrame(): Frame {
        return this.getParent().getFirstChild();
    }
    getLastPeerFrame(): Frame {
        return this.getParent().getLastChild();
    }
    getPreviousFrame(): Frame {
        return this.getParent().getChildBefore(this);
    }
    getNextFrame(): Frame {
        return this.getParent().getChildAfter(this);
    }

    selectPreviousField():void {
        var fields = this.getFields();
        var num = fields.length;
        var current = fields.filter(f => f.isFocused());
        if (current.length > 0) {
            var i = fields.indexOf(current[0]);
            if (i > 0) {
                fields[i-1].select(true, false);
            } else {
                this.select(true, false);
            }
        } else {
            fields[num-1].select(true, false);
        }
    }

    selectNextField(): void {
        var fields = this.getFields();
        var num = fields.length;
        var current = fields.filter(f => f.isFocused());
        if (current.length > 0) {
            var i = fields.indexOf(current[0]);
            if (i < num - 1) {
                fields[i+1].select(true, false);
            } else {
                this.select(true, false);
            }
        } else {
            fields[0].select(true, false);
        }
    }

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        if (char === "Tab") {
            if (keyEvent.shift) {
                this.selectPreviousField();
            } else {
                this.selectNextField();
            }
            return;
        } 
        //Ignore all others
    }

    getMap(): Map<string, Selectable> {
        if (this._map) {
            return this._map;
        }
        throw new Error(`Frame : ${this.htmlId} has no Map`);
    }

    setMap(Map: Map<string, Selectable>) {
        this._map = Map;
    }

    setFactory(factory: StatementFactory) {
        this._factory = factory;
    }

    abstract getIdPrefix(): string;

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
        this._classes.push(ParsingStatus[this.status()]);
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

    setParent(parent: Parent): void {
        this._parent = parent;
    }

    getParent(): Parent {
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

    selectFirstField(): boolean {
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
        return this.worstStatusOfFields();
    }

    parseFromSource(source: CodeSource): void {
        throw new Error("Not implemented");
    }
}
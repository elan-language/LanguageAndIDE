import { Parent} from "./interfaces/parent";
import { Selectable } from "./interfaces/selectable";
import { isCollapsible, isFrame, isParent, singleIndent } from "./helpers";
import { StatementFactory } from "./interfaces/statement-factory";
import { ParseStatus } from "./parse-status";
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
    
    worstStatusOfFields(): ParseStatus {
        return this.getFields().map(g => g.getStatus()).reduce((prev, cur) => cur < prev ? cur : prev, ParseStatus.valid);
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

    processKey(e: KeyEvent): void {
        var key = e.key;
        switch (key) {
          case "ArrowUp": {
            var pf  = this.getPreviousFrame();
            this.selectAsAppropriate(e, pf);
            break;
          }
          case "ArrowDown": {
            var nf  = this.getNextFrame();
            this.selectAsAppropriate(e, nf);
            break;
          }
          case "ArrowLeft": {
            var pt = this.getParent();
            if (isFrame(pt)) {
                pt.select(true, false);
            }
            break;
          }
          case "ArrowRight": {
            if (isParent(this)) {
                this.getFirstChild().select(true, false);
            }
            break;
          }
          case "Home": {
            this.getFirstPeerFrame().select(true, false);
            break;
          }
          case "End": {
            this.getLastPeerFrame().select(true, false);
            break;
          }
          case "o": {
            if (e.control) {
                if (isCollapsible(this)) {
                    this.expandCollapse();
                }
            }
            break;
          }
          case "Tab": {
            if (e.shift) {
                this.selectPreviousField();
            } else {
                this.selectNextField();
            }
            break;
          } 
          case "Enter": {
            this.selectPreviousField();
            break;
          }
          
        }
    }

    private selectAsAppropriate(e: KeyEvent, s: Frame) {
        if (e.shift) {
            this.select(false, true);
            s.select(true, true);
        }
        else {
            s.select(true, false);
        }
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
        this._classes.push(ParseStatus[this.getStatus()]);
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

    selectFirstFieldOrChildIfNone(): boolean {
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

    getStatus(): ParseStatus {
        return this.worstStatusOfFields();
    }

    parseFrom(source: CodeSource): void {
        throw new Error("Not implemented");
    }
}
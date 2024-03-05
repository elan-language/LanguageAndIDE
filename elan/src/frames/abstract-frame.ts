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
import { MainFrame } from "./globals/main-frame";

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
    protected movable: boolean = true;

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
    getPreviousPeerFrame(): Frame {
        return this.getParent().getChildBefore(this);
    }
    getNextPeerFrame(): Frame {
        return this.getParent().getChildAfter(this);
    }

    selectFieldBefore(current: Field): boolean {
        var result = false;
        var fields = this.getFields();
        var i = fields.indexOf(current);
        if (i > 0) {
            fields[i-1].select(true, false);
            result = true;
        } else {
           this.selectLastFieldAboveThisFrame();
        }
        return result;
    }

    selectFieldAfter(current: Field): boolean {
        var result = false;
        var fields = this.getFields();
        var i = fields.indexOf(current);
        if (i < fields.length - 1) {
            fields[i+1].select(true, false);
            result = true;
        } else {
            if (isParent(this)){
                this.getFirstChild().selectFirstField();
                result = true;
            } else {
                this.getNextFrameInTabOrder().selectFirstField();
                result = true;
            }
        }
        return result;
    }

    getNextFrameInTabOrder(): Frame {
        var result: Frame = this;
        if (this.getNextPeerFrame() !== this) {
            result = this.getNextPeerFrame();
        } else {
            var parent = this.getParent();
            if (isFrame(parent)) {
                result = parent.getNextFrameInTabOrder();
            }
        }
        return result;
    }

    getPreviousFrameInTabOrder(): Frame {
        var result: Frame = this;
        if (this.getPreviousPeerFrame() !== this) {
            result = this.getPreviousPeerFrame();
        } else {
            var parent = this.getParent();
            if (isFrame(parent)) {
                result = parent.getPreviousFrameInTabOrder();
            }
        }
        return result;
    }

    //Overridden by any frames that have children
    selectFirstField(): boolean {
        var result = false;
        if (this.getFields().length > 0) {
          this.getFields()[0].select(true, false);
          result = true;
        } 
        return result;
    } 

    selectLastField(): boolean {
        var result = false;
        var n = this.getFields().length;
        if (n > 0) {
          this.getFields()[n -1].select(true, false);
          result = true;
        } 
        return result;
    }

    processKey(e: KeyEvent): void {
        var key = e.key;
        switch (key) {
          case "ArrowUp": {
            if (e.control) {
                //TODO currenly works only on the single frame with focus
                if (this.movable) {
                    this.getParent().moveUpOne(this);
                }
            } else {
                var pf  = this.getPreviousPeerFrame();
                this.selectSingleOrMulti(this.getPreviousPeerFrame(), e.shift);
            }
            break;
          }
          case "ArrowDown": {
            if (e.control) {
                //TODO currenly works only on the single frame with focus
                if (this.movable) {
                  this.getParent().moveDownOne(this);    
                }      
            } else {
                this.selectSingleOrMulti(this.getNextPeerFrame(), e.shift);
            }
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
            this.tabOrEnter(e.shift);
            break;
          } 
          case "Enter": {
            this.tabOrEnter(e.shift);
            break;
          }  
          case "Insert": {
            this.insertSelector(e.shift);
            break;
          } 
        }
    }

    abstract insertSelector(after: boolean): void;

    canInsertBefore(): boolean {
        return true;
    }

    canInsertAfter(): boolean {
        return true;
    }

    tabOrEnter(back: boolean) {
        if (back) {
           this.selectLastFieldAboveThisFrame();
        } else {
            this.selectFirstField();
        }
    }

    selectLastFieldAboveThisFrame(): boolean {
        var result = false;
        var peer = this.getPreviousPeerFrame();
        if (peer !== this) {
            result = peer.selectLastField();
        } else {
            var parent = this.getParent();
            var fields = parent.getFields();
            var n = fields.length;
            if (n > 0) {
                fields[n -1].select(true, false);
                result = true;
            } else { //should only occur if the parent is 'main'
                var main = parent as MainFrame;
                var file = main.getParent() as File;
                var prior = file.getChildBefore(main);
                if (prior !== main ) {
                    prior.selectLastField();  
                    result = true;
                }                
            }
        }
        return result;
    }

    private selectSingleOrMulti(s: Frame, multiSelect: boolean) {
        if (multiSelect) {
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

    abstract parseFrom(source: CodeSource): void;

}
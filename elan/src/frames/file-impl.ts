import { Selectable } from "./interfaces/selectable";
import { createHash } from "node:crypto";
import { StatementFactory } from "./interfaces/statement-factory";
import { ParseStatus } from "./parse-status";
import { File} from "./interfaces/file";
import { MainFrame } from "./globals/main-frame";
import { Function } from "./globals/function";
import { Procedure } from "./globals/procedure";
import { Enum } from "./globals/enum";
import { Class } from "./globals/class";
import { GlobalComment } from "./globals/global-comment";
import { Constant } from "./globals/constant";
import { Test } from "./globals/test";
import { StatementFactoryImpl } from "./statement-factory-impl";
import { isCollapsible } from "./helpers";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { CodeSource } from "./code-source";
import { Regexes } from "./fields/regexes";
import { GlobalSelector } from "./globals/global-selector";

export class FileImpl implements File {
    isParent: boolean = true;
    hasFields: boolean = true;
    isFile: boolean = true;
    private _globals: Array<Frame> = new Array<Frame>();
    private _map: Map<string, Selectable>;
    private _factory: StatementFactory;
   
    constructor() {
        this._map = new Map<string, Selectable>();
        this._factory = new StatementFactoryImpl();
        this._globals.push(new GlobalSelector(this));
    }

    hasParent(): boolean {
        return false;
    }

    getParent(): Parent {
        throw new Error("getParent Should not have been called on a file; test for 'hasParent()' before calling.");
    }
    
    getById(id: string): Selectable {
        return this._map.get(id) as Selectable;
    }

    getIdPrefix(): string {
        return 'file';
    }

    public renderAsHtml(): string {
        const ss: Array<string> = [];
        for (var global of this._globals) {
            ss.push(global.renderAsHtml());
        }
        const globals = ss.join("\n");
        return `<header># <hash>${this.getHash()}</hash> ${this.getVersion()} <span id="fileStatus" class="${this.statusAsString()}">${this.statusAsString()}</span></header>\r\n${globals}`;
    }

    public indent(): string {
        return "";
    }

    private getHash(body? : string): string {
        // normalize
        body = (body || this.renderGlobalsAsSource()).trim().replaceAll("\r", "");

        const hash = createHash('sha256');
        hash.update(body);
        return hash.digest('hex');
    }

    private getVersion() {
        return "Elan v0.1";
    }

    renderGlobalsAsSource() : string{
        var result = "";
        if (this._globals.length > 0) {
            const ss: Array<string> = [];
            for (var frame of this._globals.filter(g => !('isSelector' in g))) {
                ss.push(frame.renderAsSource());
            }
            result = ss.join("\r\n");
        }
        return result;
    }

    renderAsSource(): string {
        const globals = this.renderGlobalsAsSource();
        return `# ${this.getHash()} ${this.getVersion()} ${this.statusAsString()}\r\n\r\n${globals}`; 
    }

    public addGlobal(g: Frame) : void {
        this._globals.push(g);
    }

    public getFirstGlobalSelector() : GlobalSelector {
        return this._globals.filter(g => ('isSelector' in g))[0] as GlobalSelector;
    }

    public addGlobalBefore(g: Frame, before: Frame): void {
        var i = this._globals.indexOf(before);
        this._globals.splice(i,0,g);
    }

    public addGlobalAfter(g: Frame, after: Frame) {
        var i = this._globals.indexOf(after)+1;
        this._globals.splice(i,0,g);     
    }

    public removeGlobal(g: Frame) {
        var i = this._globals.indexOf(g);
        this._globals.splice(i,1);    
    }
    
    getFirstChild(): Frame {
        return this._globals[0]; //Should always be one - at minimum a SelectGlobal
    }

    getLastChild(): Frame {
        return this._globals[this._globals.length - 1];
    }

    getChildAfter(g: Frame): Frame {
        const index = this._globals.indexOf(g);
        return index < this._globals.length - 1 ? this._globals[index +1] : g;
    }

    getChildBefore(g: Frame): Frame {
        const index = this._globals.indexOf(g);
        return index > 0 ? this._globals[index -1] : g;
    }

    getChildRange(first: Frame, last: Frame): Frame[] {
        var fst = this._globals.indexOf(first);
        var lst = this._globals.indexOf(last);
        return fst < lst ? this._globals.slice(fst, lst + 1) : this._globals.slice(lst, fst + 1);
    }

    defocusAll() {
        for (const f of this._map.values()) {
            if (f.isFocused()) {
                f.defocus();
            }
        }
    }

    expandCollapseAll() {
        for (const f of this._map.values()) {
            if (isCollapsible(f)) {
               f.expandCollapse();
            }
        }
    }

    expand(): void {
        //Does nothing
    }
    collapse(): void {
        //does nothing
    }

    status(): ParseStatus {
        return this._globals.map(g => g.getStatus()).reduce((prev, cur) => cur < prev ? cur : prev, ParseStatus.valid);
    }

    statusAsString() : string {
        return ParseStatus[this.status()];
    }

    deselectAll() {
        for (const f of this._map.values()) {
            if (f.isSelected()) {
                f.deselect();
            }
        }
    }

    getMap(): Map<string, Selectable> {
        return this._map;
    }
    getFactory(): StatementFactory {
        return this._factory;
    }

    addMainBefore(g: Frame): Frame {
        var m = new MainFrame(this);
        return this.addGlobalBeforeAndSelect(m,g);
    }
    addFunctionBefore(g: Frame): Frame {
        var m = new Function(this);
        return this.addGlobalBeforeAndSelect(m,g);
    }
    addProcedureBefore(g: Frame): Frame {
        var m = new Procedure(this);
        return this.addGlobalBeforeAndSelect(m,g);
    }
    addEnumBefore(g: Frame): Frame {
        var m = new Enum(this);
        return this.addGlobalBeforeAndSelect(m,g);
    }
    addClassBefore(g: Frame): Frame {
        var m = new Class(this);
        return this.addGlobalBeforeAndSelect(m,g);
    }
    addGlobalCommentBefore(g: Frame): Frame {
        var m = new GlobalComment(this);
        return this.addGlobalBeforeAndSelect(m,g);
    }
    addConstantBefore(g: Frame): Frame {
        var m = new Constant(this);
        return this.addGlobalBeforeAndSelect(m,g);
    }
    addTestBefore(g: Frame): Frame {
        var m = new Test(this);
        return this.addGlobalBeforeAndSelect(m,g);
    }
    private addGlobalBeforeAndSelect(g: Frame, before: Frame): Frame {
        this.addGlobalBefore(g, before);
        g.select(true, false);
        return g;
    }

    parseFrom(source: CodeSource): void {
        if (source.isMatch("#")) {
            source.removeRegEx(Regexes.startsWithComment, false);
            source.removeRegEx(Regexes.startsWithNewLine, false);
            source.removeRegEx(Regexes.startsWithNewLine, false);
        }
        while (source.hasMoreCode()) {
            if (source.isMatchRegEx(Regexes.startsWithNewLine)) {
                source.removeNewLine();
            } else {
                this.getFirstGlobalSelector().parseFrom(source);
            }
        }
    }

    containsMain(): boolean {
        var mains = this._globals.filter(g => 'isMain' in g);
        return mains.length > 0;
    }
}
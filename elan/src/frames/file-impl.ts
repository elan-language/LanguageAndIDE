import { Selectable } from "./interfaces/selectable";
import { createHash } from "node:crypto";
import { StatementFactory } from "./interfaces/statement-factory";
import { ParsingStatus } from "./parsing-status";
import { File} from "./interfaces/file";
import { MainFrame } from "./globals/main-frame";
import { Function } from "./globals/function";
import { Procedure } from "./globals/procedure";
import { Enum } from "./globals/enum";
import { Class } from "./globals/class";
import { GlobalComment } from "./globals/global-comment";
import { Constant } from "./globals/constant";
import { StatementFactoryImpl } from "./statement-factory-impl";
import { isCollapsible } from "./helpers";
import { Frame } from "./interfaces/frame";
import { Parent } from "./interfaces/parent";
import { CodeSource } from "./code-source";
import { Regexes } from "./fields/regexes";
import { GlobalPreloadContext } from "node:module";
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
        return `<header># ${this.getVersion()} <span id="fileStatus" class="${this.statusAsString()}">${this.statusAsString()}</span> <hash>${this.getHash()}</hash></header>\r\n${globals}`;
    }

    public indent(): string {
        return "";
    }

    private getHash(body? : string): string {
        // normalize
        body = (body || this.bodyAsSource()).trim().replaceAll("\r", "");

        const hash = createHash('sha256');
        hash.update(body);
        const sHash = hash.digest('hex');
        const truncatedHash = sHash.slice(0, 16);
        return truncatedHash;
    }

    private getVersion() {
        return "Elan v0.1";
    }

    bodyAsSource() : string{
        const ss: Array<string> = [];
        for (var frame of this._globals) {
            ss.push(frame.renderAsSource());
        }
        return ss.join("\r\n");
    }

    renderAsSource(): string {
        const globals = this.bodyAsSource();
        return `# ${this.getVersion()} ${this.statusAsString()} ${this.getHash()}\r\n\r\n${globals}`; 
    }

    public addChildToEnd(g: Frame) {
        this._globals.push(g);
    }

    public addChildBefore(g: Frame, before: Frame): void {
        var i = this._globals.indexOf(before);
        this._globals.splice(i,0,g);
    }

    public addChildAfter(g: Frame, after: Frame) {
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

    status(): ParsingStatus {
        return this._globals.map(g => g.status()).reduce((prev, cur) => cur < prev ? cur : prev, ParsingStatus.valid);
    }

    statusAsString() : string {
        return ParsingStatus[this.status()];
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
    private addGlobalBeforeAndSelect(g: Frame, before: Frame): Frame {
        this.addChildBefore(g, before);
        g.select(true, false);
        return g;
    }

    parseFromSource(source: CodeSource): void {
        source.removeRegEx(new RegExp(Regexes.comment), false);
        source.removeRegEx(new RegExp(Regexes.newLine), false);
        source.removeRegEx(new RegExp(Regexes.newLine), false);
        if (source.hasMoreCode()) {
            var select = new GlobalSelector(this)
            this.addChildToEnd(select);
            select.parseFromSource(source);
        }
    }
}
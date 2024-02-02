import { Renderable } from "./frame";
import { Global } from "./globals/global";
import { Parent } from "./parent";
import { isGlobal, isMember, isStatement, isText, resetId, safeSelectAfter, safeSelectBefore, selectChildRange } from "./helpers";
import { createHash } from "node:crypto";
import { StatementFactory, StatementFactoryImpl } from "./statement-factory";
import { ParsingStatus } from "./parsing-status";
import { FileAPI } from "./file-api";
import {File} from "./file";
import { MainFrame } from "./globals/main-frame";
import { Function } from "./globals/function";
import { Procedure } from "./globals/procedure";
import { Enum } from "./globals/enum";
import { Class } from "./globals/class";
import { GlobalComment } from "./globals/global-comment";
import { Constant } from "./globals/constant";

export class FileImpl implements FileAPI, File, Parent {
    private globals: Array<Global> = new Array<Global>();
    private Map: Map<string, Renderable>;
    private factory: StatementFactory;
   
    constructor() {
        resetId();
        this.Map = new Map<string, Renderable>();
        this.factory = new StatementFactoryImpl();
    }

    private rangeSelecting = false;
    isRangeSelecting(): boolean {
        return this.rangeSelecting;
    }

    getPrefix(): string {
        return 'file';
    }

    public renderAsHtml(): string {
        const ss: Array<string> = [];
        for (var frame of this.globals) {
            ss.push(frame.renderAsHtml());
        }
        const globals = ss.join("\n");
        return `<header>${this.getHeaderInfo()}</header>\r\n${globals}`;
    }

    public indent(): string {
        return "";
    }

    private getHeaderInfo(body? : string): string {
        // normalize
        body = (body || this.bodyAsSource()).trim().replaceAll("\r", "");

        const hash = createHash('sha256');
        hash.update(body);
        const sHash = hash.digest('hex');
        const truncatedHash = sHash.slice(0, 16);

        return `# Elan v0.1 ${ParsingStatus[this.status()]} ${truncatedHash}`;
    }

    bodyAsSource() : string{
        const ss: Array<string> = [];
        for (var frame of this.globals) {
            ss.push(frame.renderAsSource());
        }
        return ss.join("\r\n");
    }

    renderAsSource(): string {
        const globals = this.bodyAsSource();
        return `${this.getHeaderInfo(globals)}\r\n\r\n${globals}`; 
    }

    public addGlobalToEnd(g: Global) {
        this.globals.push(g);
    }

    public addGlobalBefore(g: Global, before: Global): void {
        var i = this.globals.indexOf(before);
        this.globals.splice(i,0,g);
    }

    public addGlobalAfter(g: Global, after: Global) {
        var i = this.globals.indexOf(after)+1;
        this.globals.splice(i,0,g);     
    }

    public removeGlobal(g: Global) {
        var i = this.globals.indexOf(g);
        this.globals.splice(i,1);    
    }

    isParent(): boolean {
        return true;
    }
    
    selectFirstChild(multiSelect: boolean): boolean {
        if (this.globals.length > 0){
            this.globals[0].select(true, multiSelect);
            return true;
        }
        return false;
    }

    selectLastChild(multiSelect: boolean): void {
        this.globals[this.globals.length - 1].select(true, multiSelect);
    }

    selectChildAfter(child: Renderable, multiSelect: boolean): void {
        if (isGlobal(child)) {
            const index = this.globals.indexOf(child);
            safeSelectAfter(this.globals, index, multiSelect);
        }
    }
    selectChildBefore(child: Renderable, multiSelect: boolean): void {
        if (isGlobal(child)) {
            const index = this.globals.indexOf(child);
            safeSelectBefore(this.globals, index, multiSelect);
        }
    }

    selectChildRange(multiSelect: boolean): void {
        this.rangeSelecting = true;
        selectChildRange(this.globals, multiSelect);
        this.rangeSelecting = false;
    }

    defocusAll() {
        for (const f of this.Map.values()) {
            if (f.isFocused()) {
                f.defocus();
            }
        }
    }

    expandAll() {
        for (const f of this.Map.values()) {
            f.expand();
        }
    }

    collapseAll() {
        for (const f of this.Map.values()) {
            f.collapse();
        }
    }

    selectByID(id: string, multiSelect: boolean) {
        if (multiSelect) {
            this.defocusAll();
        }
        const toSelect = this.Map.get(id);
        toSelect?.select(true, multiSelect);
    }

    expandCollapseByID(id: string) {
        const toToggle = this.Map.get(id);
        if (toToggle?.isCollapsed()) {
            toToggle.expand();
        }
        else {
            toToggle?.collapse();
        }
    }

    expandCollapseAllByFrame(f?: Renderable) {
        if (f?.isCollapsed()) {
            this.expandAll();
        }
        else {
            this.collapseAll();
        }
    }

    expandCollapseAllByID(id: string) {
        const currentFrame = this.Map.get(id);
        if (currentFrame?.isMultiline()) {
            this.expandCollapseAllByFrame(currentFrame);
        }
        else {
            this.expandCollapseAll();
        }
    }

    expandCollapseAll() {
        const allMultilines = this.globals.filter(g => g.isMultiline());
        const firstFrame = allMultilines[0];
        this.expandCollapseAllByFrame(firstFrame);
    }

    collapseByID(id: string) {
        const toCollapse = this.Map.get(id);
        toCollapse?.collapse();
    }

    expandByID(id: string) {
        const toExpand = this.Map.get(id);
        toExpand?.expand();
    }

    selectNextPeerByID(id: string, multiSelect: boolean) {
        if (multiSelect) {
            this.defocusAll();
        }
        const frame = this.Map.get(id);
        frame?.selectNextPeer(multiSelect);
    }

    selectPreviousPeerByID(id: string, multiSelect: boolean) {
        if (multiSelect) {
            this.defocusAll();
        }
        const frame = this.Map.get(id);
        frame?.selectPreviousPeer(multiSelect);
    }

    selectFirstPeerByID(id: string) {
        const frame = this.Map.get(id);
        frame?.selectFirstPeer(false);
    }

    selectLastPeerByID(id: string) {
        const frame = this.Map.get(id);
        frame?.selectLastPeer(false);
    }

    selectParentByID(id: string) {
        const frame = this.Map.get(id);
        const parent = frame?.getParent();
        // leave selection as is
    }

    selectFirstChildByID(id: string) {
        const frame = this.Map.get(id);
        if (!frame?.selectFirstChild(false)) {
            frame?.select(true, false);
        }
    }

    selectFirstByID(id: string) {
        const frame = this.Map.get(id);
        if (isStatement(frame)) {
            frame.selectFirstPeer(false);
        }
        else if (isMember(frame)) {
            frame.selectFirstPeer(false);
        }
        else if (isGlobal(frame)){
            this.selectFirstChild(false);
        }
        else {
            throw new Error("Unexpected option");
            // previous impl: text field
            //frame?.getParent()?.selectFirstPeer(false);
        }
    }

    selectLastByID(id: string) {
        const component = this.Map.get(id);
        if (isStatement(component)) {
            component.selectLastPeer(false);
        }
        else if (isMember(component)) {
            component.selectLastPeer(false);
        }
        else if (isGlobal(component)){
            this.selectLastChild(false);
        }
        else {
            throw new Error("Unexpected option");
            // previous: impl
            //frame?.getParent()?.selectLastPeer(false);
        }
    }

    selectNextTextByID(id: string) {
        const frame = this.Map.get(id);
        if (!frame?.selectFirstText()){
            frame?.select(true, false);
        }
    }

    selectFirst(){
        this.globals[0].select(true, false);
    }

    selectLast() {
        this.globals[this.globals.length - 1].select(true, false);
    }

    handleInput(id: string, key: string) {
        const component = this.Map.get(id);
        if (isText(component)){
            component.enterText(key);
        }
    }

    status(): ParsingStatus {
        return this.globals.map(g => g.status()).reduce((prev, cur) => cur < prev ? cur : prev, ParsingStatus.valid);
    }

    deselectAll() {
        for (const f of this.Map.values()) {
            if (f.isSelected()) {
                f.deselect();
            }
        }
    }

    getMap(): Map<string, Renderable> {
        return this.Map;
    }
    getFactory(): StatementFactory {
        return this.factory;
    }

    select(withFocus : boolean,  multiSelect: boolean): void {
        //TODO - method not relevant so does nothing. Review whether this is defined on Parent?
    }

    addMainBefore(g: Global): void {
        var m = new MainFrame(this);
        this.addGlobalBeforeAndSelect(m,g);
    }
    addFunctionBefore(g: Global): void {
        var m = new Function(this);
        this.addGlobalBeforeAndSelect(m,g);
    }
    addProcedureBefore(g: Global): void {
        var m = new Procedure(this);
        this.addGlobalBeforeAndSelect(m,g);
    }
    addEnumBefore(g: Global): void {
        var m = new Enum(this);
        this.addGlobalBeforeAndSelect(m,g);
    }
    addClassBefore(g: Global): void {
        var m = new Class(this);
        this.addGlobalBeforeAndSelect(m,g);
    }
    addGlobalCommentBefore(g: Global): void {
        var m = new GlobalComment(this);
        this.addGlobalBeforeAndSelect(m,g);
    }
    addConstantBefore(g: Global): void {
        var m = new Constant(this);
        this.addGlobalBeforeAndSelect(m,g);
    }
    private addGlobalBeforeAndSelect(g: Global, before: Global) {
        this.addGlobalBefore(g, before);
        g.select(true, false);
    }
}
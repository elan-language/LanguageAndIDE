import { AbstractFrame } from "./abstract-frame";
import { Frame } from "./frame";
import { Global } from "./globals/global";
import { Parent } from "./parent";
import { isGlobal, isMember, isStatement, isText, resetId, safeSelectAfter, safeSelectBefore, selectChildRange } from "./helpers";
import { createHash } from "node:crypto";

export class File extends AbstractFrame implements Parent {
    parent: Frame;
    private globals: Array<Global> = new Array<Global>();

    public status = "status-placeholder";
   
    constructor() {
        super();
        resetId();
        this.parent = this; //no parent
        var frameMap = new Map<string, Frame>();
        frameMap.set(this.getPrefix(), this); //No Id because it is always 0
        this.setFrameMap(frameMap);
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
        body = body || this.bodyAsSource();

        const hash = createHash('sha256');
        hash.update(body);

        return `# Elan v0.1 ${this.status} ${hash.digest('hex')}`;
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

    public addGlobalBefore(g: Global, before: Global) {
        var i = this.globals.indexOf(g);
        this.globals.splice(i,0,g);
    }

    public addGlobalAfter(g: Global, after: Global) {
        var i = this.globals.indexOf(g)+1;
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

    selectChildAfter(child: Frame, multiSelect: boolean): void {
        if (isGlobal(child)) {
            const index = this.globals.indexOf(child);
            safeSelectAfter(this.globals, index, multiSelect);
        }
    }
    selectChildBefore(child: Frame, multiSelect: boolean): void {
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

    deselectAll() {
        for (const f of this.getFrameMap().values()) {
            if (f.isSelected()) {
                f.deselect();
            }
        }
    }

    defocusAll() {
        for (const f of this.getFrameMap().values()) {
            if (f.isFocused()) {
                f.defocus();
            }
        }
    }

    expandAll() {
        for (const f of this.getFrameMap().values()) {
            f.expand();
        }
    }

    collapseAll() {
        for (const f of this.getFrameMap().values()) {
            f.collapse();
        }
    }

    selectByID(id: string, multiSelect: boolean) {
        if (!multiSelect) {
            this.deselectAll();
        }
        else {
            this.defocusAll();
        }
        const toSelect = this.getFrameMap().get(id);
        toSelect?.select(true, multiSelect);
    }

    expandCollapseByID(id: string) {
        const toToggle = this.getFrameMap().get(id);
        if (toToggle?.isCollapsed()) {
            toToggle.expand();
        }
        else {
            toToggle?.collapse();
        }
    }

    expandCollapseAllByFrame(f?: Frame) {
        if (f?.isCollapsed()) {
            this.expandAll();
        }
        else {
            this.collapseAll();
        }
    }

    expandCollapseAllByID(id: string) {
        const currentFrame = this.getFrameMap().get(id);
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
        const toCollapse = this.getFrameMap().get(id);
        toCollapse?.collapse();
    }

    expandByID(id: string) {
        const toExpand = this.getFrameMap().get(id);
        toExpand?.expand();
    }

    selectNextPeerByID(id: string, multiSelect: boolean) {
        if (!multiSelect) {
            this.deselectAll();
        }
        else {
            this.defocusAll();
        }
        const frame = this.getFrameMap().get(id);
        frame?.selectNextPeer(multiSelect);
    }

    selectPreviousPeerByID(id: string, multiSelect: boolean) {
        if (!multiSelect) {
            this.deselectAll();
        }
        else {
            this.defocusAll();
        }
        const frame = this.getFrameMap().get(id);
        frame?.selectPreviousPeer(multiSelect);
    }

    selectFirstPeerByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
        frame?.selectFirstPeer(false);
    }

    selectLastPeerByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
        frame?.selectLastPeer(false);
    }

    selectParentByID(id: string) {
        const frame = this.getFrameMap().get(id);
        const parent = frame?.getParent();
        if (parent !== this){
            this.deselectAll();
            parent?.select(true, false);
        }
        // leave selection as is
    }

    selectFirstChildByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
        if (!frame?.selectFirstChild(false)) {
            frame?.select(true, false);
        }
    }

    selectFirstByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
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
            // text field
            frame?.getParent()?.selectFirstPeer(false);
        }
    }

    selectLastByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
        if (isStatement(frame)) {
            frame.selectLastPeer(false);
        }
        else if (isMember(frame)) {
            frame.selectLastPeer(false);
        }
        else if (isGlobal(frame)){
            this.selectLastChild(false);
        }
        else {
            // text field
            frame?.getParent()?.selectLastPeer(false);
        }
    }

    selectNextTextByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
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
        const frame = this.getFrameMap().get(id);
        if (isText(frame)){
            frame.enterText(key);
        }
    }

    override isComplete(): boolean {
        return this.globals.map(g => g.isComplete()).reduce((p, c) => p && c);
    }
}
import { AbstractFrame } from "./abstract-frame";
import { Frame } from "./frame";
import { Global } from "./globals/global";
import { HasChildren } from "./has-children";
import { isGlobal, isMember, isStatement, isText, resetId, safeSelectAfter, safeSelectBefore, selectChildRange } from "./helpers";

export class FileFrame extends AbstractFrame implements HasChildren {
    parent: Frame;
    private globals: Array<Global> = new Array<Global>();

    constructor() {
        super();
        resetId();
        this.parent = this; //no parent
        var frameMap = new Map<string, Frame>();
        frameMap.set(this.getPrefix(), this); //No Id because it is always 0
        this.setFrameMap(frameMap);
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

    private getHeaderInfo(): string {
        return `# Elan v0.1`;
    }

    renderAsSource(): string {
        const ss: Array<string> = [];
        for (var frame of this.globals) {
            ss.push(frame.renderAsSource());
        }
        const globals = ss.join("\r\n");
        return `${this.getHeaderInfo()}\r\n\r\n${globals}`; 
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

    hasChildren(): boolean {
        return true;
    }
    
    selectFirstChild(): boolean {
        if (this.globals.length > 0){
            this.globals[0].select(true);
            return true;
        }
        return false;
    }

    selectLastChild(): void {
        this.globals[this.globals.length - 1].select(true);
    }

    selectChildAfter(child: Frame): void {
        if (isGlobal(child)) {
            const index = this.globals.indexOf(child);
            safeSelectAfter(this.globals, index);
        }
    }
    selectChildBefore(child: Frame): void {
        if (isGlobal(child)) {
            const index = this.globals.indexOf(child);
            safeSelectBefore(this.globals, index);
        }
    }

    selectChildRange(): void {
        selectChildRange(this.globals);
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

    selectByID(id: string, multiSelect?: boolean) {
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

    selectNextPeerByID(id: string, multiSelect? : boolean) {
        if (!multiSelect) {
            this.deselectAll();
        }
        else {
            this.defocusAll();
        }
        const frame = this.getFrameMap().get(id);
        frame?.selectNextPeer();
    }

    selectPreviousPeerByID(id: string, multiSelect? : boolean) {
        if (!multiSelect) {
            this.deselectAll();
        }
        else {
            this.defocusAll();
        }
        const frame = this.getFrameMap().get(id);
        frame?.selectPreviousPeer();
    }

    selectFirstPeerByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
        frame?.selectFirstPeer();
    }

    selectLastPeerByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
        frame?.selectLastPeer();
    }

    selectParentByID(id: string) {
        const frame = this.getFrameMap().get(id);
        const parent = frame?.getParent();
        if (parent !== this){
            this.deselectAll();
            parent?.select(true);
        }
        // leave selection as is
    }

    selectFirstChildByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
        if (!frame?.selectFirstChild()) {
            frame?.select(true);
        }
    }

    selectFirstByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
        if (isStatement(frame)) {
            frame.selectFirstPeer();
        }
        else if (isMember(frame)) {
            frame.selectFirstPeer();
        }
        else if (isGlobal(frame)){
            this.selectFirstChild();
        }
        else {
            // text field
            frame?.getParent()?.selectFirstPeer();
        }
    }

    selectLastByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
        if (isStatement(frame)) {
            frame.selectLastPeer();
        }
        else if (isMember(frame)) {
            frame.selectLastPeer();
        }
        else if (isGlobal(frame)){
            this.selectLastChild();
        }
        else {
            // text field
            frame?.getParent()?.selectLastPeer();
        }
    }

    selectNextTextByID(id: string) {
        this.deselectAll();
        const frame = this.getFrameMap().get(id);
        if (!frame?.selectFirstText()){
            frame?.select(true);
        }
    }

    selectFirst(){
        this.globals[0].select(true);
    }

    selectLast() {
        this.globals[this.globals.length - 1].select(true);
    }

    handleInput(id: string, key: string) {
        const frame = this.getFrameMap().get(id);
        if (isText(frame)){
            frame.enterText(key);
        }
    }
}
import { AbstractFrame } from "./abstract-frame";
import { Role } from "./class-members/member";
import { Frame } from "./frame";
import { Global } from "./globals/global";
import { HasChildren } from "./has-children";
import { isGlobal, isMember, isStatement, resetId, safeSelectAfter, safeSelectBefore, selectChildRange } from "./helpers";

export class FileFrame extends AbstractFrame implements HasChildren {


    private globals: Array<Global> = new Array<Global>();

    public htmlId = "file";

    constructor() {
        super();
        resetId();
        this.initialize(new Map<string, Frame>());
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

    public addGlobal(g: Global) {
        g.initialize(this.frameMap, this);
        this.globals.push(g);
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
        for (const f of this.frameMap.values()) {
            if (f.isSelected()) {
                f.deselect();
            }
        }
    }

    defocusAll() {
        for (const f of this.frameMap.values()) {
            if (f.isFocused()) {
                f.defocus();
            }
        }
    }

    expandAll() {
        for (const f of this.frameMap.values()) {
            f.expand();
        }
    }

    collapseAll() {
        for (const f of this.frameMap.values()) {
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
        const toSelect = this.frameMap.get(id);
        toSelect?.select(true, multiSelect);
    }

    expandCollapseByID(id: string) {
        const toToggle = this.frameMap.get(id);
        if (toToggle?.isCollapsed()) {
            toToggle.expand();
        }
        else {
            toToggle?.collapse();
        }
    }

    expandCollapseAllByID(id: string) {
        const currentFrame = this.frameMap.get(id);
        if (currentFrame?.isCollapsed()) {
            this.expandAll();
        }
        else {
            this.collapseAll();
        }
    }

    expandCollapseAll() {
        const firstFrame = this.globals[0];
        if (firstFrame?.isCollapsed()) {
            this.expandAll();
        }
        else {
            this.collapseAll();
        }
    }

    collapseByID(id: string) {
        const toCollapse = this.frameMap.get(id);
        toCollapse?.collapse();
    }

    expandByID(id: string) {
        const toExpand = this.frameMap.get(id);
        toExpand?.expand();
    }

    selectNextPeerByID(id: string, multiSelect? : boolean) {
        if (!multiSelect) {
            this.deselectAll();
        }
        else {
            this.defocusAll();
        }
        const frame = this.frameMap.get(id);
        frame?.selectNextPeer();
    }

    selectPreviousPeerByID(id: string, multiSelect? : boolean) {
        if (!multiSelect) {
            this.deselectAll();
        }
        else {
            this.defocusAll();
        }
        const frame = this.frameMap.get(id);
        frame?.selectPreviousPeer();
    }

    selectFirstPeerByID(id: string) {
        this.deselectAll();
        const frame = this.frameMap.get(id);
        frame?.selectFirstPeer();
    }

    selectLastPeerByID(id: string) {
        this.deselectAll();
        const frame = this.frameMap.get(id);
        frame?.selectLastPeer();
    }

    selectParentByID(id: string) {
        const frame = this.frameMap.get(id);
        const parent = frame?.getParent();
        if (parent !== this){
            this.deselectAll();
            parent?.select(true);
        }
        // leave selection as is
    }

    selectFirstChildByID(id: string) {
        this.deselectAll();
        const frame = this.frameMap.get(id);
        if (!frame?.selectFirstChild()) {
            frame?.select(true);
        }
    }

    selectFirstByID(id: string) {
        this.deselectAll();
        const frame = this.frameMap.get(id);
        if (isStatement(frame)) {
            frame.selectFirstPeer();
        }
        else if (isMember(frame) && frame.currentRole() === Role.member) {
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
        const frame = this.frameMap.get(id);
        if (isStatement(frame)) {
            frame.selectLastPeer();
        }
        else if (isMember(frame) && frame.currentRole() === Role.member) {
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
        const frame = this.frameMap.get(id);
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
}
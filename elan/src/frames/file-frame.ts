import { AbstractFrame } from "./abstract-frame";
import { Frame } from "./frame";
import { Global } from "./globals/global";
import { HasChildren } from "./has-children";
import { resetId } from "./helpers";

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
        return `<header># Elan v0.1</header>\r\n${globals}`;
    }

    public addGlobal(g: Global) {
        g.initialize(this.frameMap, this);
        this.globals.push(g);
    }

    hasChildren(): boolean {
        return true;
    }
    selectFirstChild(): void {
        this.globals[0].select();
    }
    selectLastChild(): void {
        this.globals[this.globals.length - 1].select();
    }
    selectChildAfter(child: Frame): void {
        throw new Error("Method not implemented");
    }
    selectChildBefore(child: Frame): void {
        throw new Error("Method not implemented");
    }

    deselectAll() {
        for (const f of this.frameMap.values()) {
            if (f.isSelected()) {
                f.deselect();
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

    selectByID(id: string) {
        this.deselectAll();
        const toSelect = this.frameMap.get(id);
        toSelect?.select();
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

    collapseByID(id: string) {
        const toCollapse = this.frameMap.get(id);
        toCollapse?.collapse();
    }

    expandByID(id: string) {
        const toExpand = this.frameMap.get(id);
        toExpand?.expand();
    }
}
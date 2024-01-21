import { Frame } from "./frame";
import { nextId } from "./helpers";
import { Comment } from "./globals/comment";

export abstract class AbstractFrame implements Frame {

    htmlId: string = "";
    isMultiLine: boolean = false;
    private parent: Frame = this;

    protected cls() : string {
        return `${this.isMultiLine? "multiline " : ""}`;
    };

    protected nextId() : number {
        return nextId();
    }

    hasParent() : boolean {
        return this.parent !== this;
    }

    getParent() : Frame {
        return this.parent;
    }

    setParent(parent: Frame) {
        this.parent = parent;
    }

    isSelected() : boolean {
        throw new Error("Not implemented");
    }

    select() {
        throw new Error("Not implemented");
    }

    public deselect() {
        throw new Error("Not implemented");
    }

    isCollapsable(): boolean {
        throw new Error("Method not implemented.");
    }
    isCollapsed(): boolean {
        throw new Error("Method not implemented.");
    }
    collapse(): void {
        throw new Error("Method not implemented.");
    }
    expand(): void {
        throw new Error("Method not implemented.");
    }
    
    abstract renderAsHtml(): string;
}
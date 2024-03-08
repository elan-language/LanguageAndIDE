import { AbstractFrame } from "./abstract-frame";
import { Frame } from "./interfaces/frame";

export abstract class AbstractFrameWithChildren extends AbstractFrame {
    private _children: Array<Frame> = new Array<Frame>();

    getChildren(): Frame[] {
        return this._children;
    }
}
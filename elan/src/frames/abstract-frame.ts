import { CommonFrame } from "./common-frame";
import { Frame } from "./frame";

export abstract class AbstractFrame extends CommonFrame {
     parent: Frame;
    
    constructor(parent: Frame) {
        super();
        this.parent = parent;
        var frameMap = parent.getFrameMap();
        this.htmlId = `${this.getPrefix()}${this.nextId()}`;
        frameMap.set(this.htmlId, this);
        this.setFrameMap(frameMap);
    }
}
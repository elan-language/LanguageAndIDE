import { AbstractFrame } from "./abstract-frame";
import {Parent} from "./parent";

export abstract class CodeFrame extends AbstractFrame {
    
    constructor(parent: Parent) {
        super();
        this.setParent(parent);
        var frameMap = parent.getFrameMap();
        this.htmlId = `${this.getPrefix()}${this.nextId()}`;
        frameMap.set(this.htmlId, this);
        this.setFrameMap(frameMap);
        var factory = parent.getFactory();
        this.setFactory(factory);
    }
}
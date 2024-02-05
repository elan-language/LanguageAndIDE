import { AbstractFrame } from "./abstract-frame";
import { ParentFrame } from "./interfaces/parent-frame";
import { Statement } from "./interfaces/statement";

export abstract class SingleLineStatement extends AbstractFrame implements Statement {
    isStatement: boolean = true;
    constructor(parent: ParentFrame) {
        super(parent);   
    }
    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
    }

    
}
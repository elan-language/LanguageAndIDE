import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";

export abstract class SingleLineStatement extends AbstractFrame  {
    isStatement = true;

    insertSelector(after: boolean): void {
        var selector = (this.getParent() as FrameWithStatements).newStatementSelector();
        var parent =(this.getParent() as FrameWithStatements);
        if (after && this.canInsertAfter()) {
                parent.addChildAfter(selector, this);
                selector.select(true, false);
        } else if (!after && this.canInsertBefore()) {
                parent.addChildBefore(selector, this);
                selector.select(true, false);
        }
    }
} 

import { AbstractSelector } from "../abstract-selector";
import { FrameWithStatements } from "../frame-with-statements";

export abstract class MultiLineStatement extends FrameWithStatements{
    isStatement = true;
   
    insertSelector(after: boolean): void {
        var selector =  (this.getParent() as FrameWithStatements).newStatementSelector();
        var parent =(this.getParent() as FrameWithStatements);
        if (after) {
            if (this.canInsertAfter()) {
                parent.addStatementAfter(selector, this);
            }
        } else {
            if (this.canInsertBefore()) {
                parent.addStatementBefore(selector, this);
            }
        }
        selector.select(true, false);
    }
} 

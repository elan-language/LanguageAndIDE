import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { FrameWithStatements } from "../frame-with-statements";

export abstract class SingleLineStatement extends AbstractFrame  {

    isStatement = true;

    getSelectorToInsertAboveBelow(): AbstractSelector {
        return (this.getParent() as FrameWithStatements).newStatementSelector();
    }
} 

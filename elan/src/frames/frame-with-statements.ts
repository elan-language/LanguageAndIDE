import { Parent } from "./interfaces/parent";
import { File } from "./interfaces/file";
import { Frame } from "./interfaces/frame";
import { ParseStatus } from "./parse-status";
import { StatementSelector } from "./statements/statement-selector";
import { CodeSource } from "./code-source";
import { Regexes } from "./fields/regexes";
import { AbstractSelector } from "./abstract-selector";
import { AbstractFrameWithChildren } from "./abstract-frame-with-children";

export abstract class FrameWithStatements extends AbstractFrameWithChildren {

    constructor(parent: File | Parent) {
        super(parent);   
        this.getChildren().push(this.newStatementSelector());
    }

    newStatementSelector(): StatementSelector {
        return new StatementSelector(this);
    }

    getStatus(): ParseStatus {
        var fieldStatus = this.worstStatusOfFields();
        var statementsStatus = this.getChildren().map(s => s.getStatus()).reduce((prev, cur) => cur < prev ? cur : prev, ParseStatus.valid);
        return fieldStatus < statementsStatus ? fieldStatus : statementsStatus;
    }

    protected parseStandardEnding(source: CodeSource, keywords: string): boolean {
        source.removeIndent();
        var result = false;
        if (source.isMatch(keywords)) {
            source.remove(keywords);
            result = true;
        }
        return result;
    }
    getSelectorToInsertAboveBelow(): AbstractSelector { //Overridden by Global frames that inherit from this
        return new StatementSelector(this.getParent() as FrameWithStatements);
    }

    insertSelector(after: boolean): void { //Overridden by Global frames that inherit from this
        var selector = this.getSelectorToInsertAboveBelow();
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
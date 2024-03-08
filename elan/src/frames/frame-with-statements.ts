import { AbstractFrame } from "./abstract-frame";
import { Parent } from "./interfaces/parent";
import { File } from "./interfaces/file";
import { Frame } from "./interfaces/frame";
import { Collapsible } from "./interfaces/collapsible";
import { ParseStatus } from "./parse-status";
import { StatementSelector } from "./statements/statement-selector";
import { CodeSource } from "./code-source";
import { Regexes } from "./fields/regexes";
import { AbstractSelector } from "./abstract-selector";
import { Field } from "./interfaces/field";
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

    protected renderStatementsAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.getChildren()) {
            ss.push(frame.renderAsHtml());
        }
        return ss.join("\n");
    }

    protected renderStatementsAsSource() : string {
        var result = "";
        if (this.getChildren().length > 0 ) {
            const ss: Array<string> = [];
            for (var frame of this.getChildren().filter(s => !('isSelector' in s))) {
                ss.push(frame.renderAsSource());
            }
            result = ss.join("\r\n");
        }
        return result;
    }

    public addStatementBefore(s: Frame, before: Frame) {
        var i = this.getChildren().indexOf(before);
        this.getChildren().splice(i, 0, s);
    }

    public addStatementAfter(s: Frame, after: Frame) {
        var i = this.getChildren().indexOf(after) + 1;
        this.getChildren().splice(i, 0, s);   
    }

    public removeStatement(s: Frame) {
        var i = this.getChildren().indexOf(s);
        this.getChildren().splice(i, 1);   
    }

    parseFrom(source: CodeSource): void {
        this.parseTopOfFrame(source);
        while (!this.parseBottomOfFrame(source)) {
            if (source.isMatchRegEx(Regexes.startsWithNewLine)) {
                source.removeRegEx(Regexes.startsWithNewLine, false);
                source.removeIndent();
            } else {
                this.getFirstSelectorAsDirectChild().parseFrom(source);
            }
        } 
    }
    abstract parseTopOfFrame(source: CodeSource): void;
    abstract parseBottomOfFrame(source: CodeSource): boolean;

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
            parent.addStatementAfter(selector, this);
            selector.select(true, false);
        } else if (!after && this.canInsertBefore()) {
            parent.addStatementBefore(selector, this);
            selector.select(true, false);
        } 
    }
}
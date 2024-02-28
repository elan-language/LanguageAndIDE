import { AbstractFrame } from "./abstract-frame";
import { Parent } from "./interfaces/parent";
import { File } from "./interfaces/file";
import { Frame } from "./interfaces/frame";
import { Collapsible } from "./interfaces/collapsible";
import { ParseStatus } from "./parse-status";
import { StatementSelector } from "./statements/statement-selector";
import { CodeSource } from "./code-source";
import { Regexes } from "./fields/regexes";

export abstract class FrameWithStatements extends AbstractFrame implements Parent, Collapsible{
    isCollapsible: boolean = true;
    isParent: boolean = true;
    multiline:boolean = true;
    protected statements: Array<Frame> = new Array<Frame>();

    constructor(parent: File | Parent) {
        super(parent);   
        this.statements.push(new StatementSelector(this));
    }

    getStatus(): ParseStatus {
        var fieldStatus = this.worstStatusOfFields();
        var statementsStatus = this.statements.map(s => s.getStatus()).reduce((prev, cur) => cur < prev ? cur : prev, ParseStatus.valid);
        return fieldStatus < statementsStatus ? fieldStatus : statementsStatus;
    }

    expandCollapse(): void {
        if (this.isCollapsed()) {
            this.expand();
        } else {
            this.collapse();
        }
    }
    public getFirstStatementSelector() : StatementSelector {
        return this.statements.filter(g => ('isSelector' in g))[0] as StatementSelector;
    }

    getFirstChild(): Frame {
        return this.statements[0]; //Should always be one - if only a Selector
    }

    getLastChild(): Frame {
        return this.statements[this.statements.length - 1];
    }

    getChildAfter(g: Frame): Frame {
        const index = this.statements.indexOf(g);
        return index < this.statements.length -1 ? this.statements[index +1] : g;
    }

    getChildBefore(g: Frame): Frame {
        const index = this.statements.indexOf(g);
        return index > 0 ? this.statements[index -1] : g;
    }

    getChildRange(first: Frame, last: Frame): Frame[] {
        var fst = this.statements.indexOf(first);
        var lst = this.statements.indexOf(last);
        return fst < lst ? this.statements.slice(fst, lst + 1) : this.statements.slice(lst, fst + 1);
    }

    selectFirstFieldOrSuitableFrame(): boolean {
        var result = super.selectFirstFieldOrSuitableFrame();
        if (!result && this.statements.length > 0) {
            this.statements[0].select(true, false);
            result = true;
        }
        return result;
    } 

    selectFirstChildIfAny(): boolean {
        var result = false;
        if (this.statements.length > 0) {
            this.statements[0].select(true, false);
            result = true;
        }
        return result;
    }

    protected renderStatementsAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
        }
        return ss.join("\n");
    }

    protected renderStatementsAsSource() : string {
        var result = "";
        if (this.statements.length > 0 ) {
            const ss: Array<string> = [];
            for (var frame of this.statements.filter(s => !('isSelector' in s))) {
                ss.push(frame.renderAsSource());
            }
            result = ss.join("\r\n");
        }
        return result;
    }

    public addStatementBefore(s: Frame, before: Frame) {
        var i = this.statements.indexOf(before);
        this.statements.splice(i, 0, s);
    }

    public addStatementAfter(s: Frame, after: Frame) {
        var i = this.statements.indexOf(after) + 1;
        this.statements.splice(i, 0, s);   
    }

    public removeStatement(s: Frame) {
        var i = this.statements.indexOf(s);
        this.statements.splice(i, 1);   
    }

    parseFrom(source: CodeSource): void {
        this.parseTopOfFrame(source);
        while (!this.parseBottomOfFrame(source)) {
            if (source.isMatchRegEx(Regexes.startsWithNewLine)) {
                source.removeRegEx(Regexes.startsWithNewLine, false);
                source.removeIndent();
            } else {
                this.getFirstStatementSelector().parseFrom(source);
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
}
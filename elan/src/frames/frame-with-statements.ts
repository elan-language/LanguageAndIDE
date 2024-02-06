import { AbstractFrame } from "./abstract-frame";
import { Parent } from "./interfaces/parent";
import { File } from "./interfaces/file";
import { Frame } from "./interfaces/frame";
import { StatementFactory } from "./interfaces/statement-factory";
import { Collapsible } from "./interfaces/collapsible";
import { ParsingStatus } from "./parsing-status";
import { StatementSelector } from "./statements/statement-selector";

export abstract class FrameWithStatements extends AbstractFrame implements Parent, Collapsible{
    isCollapsible: boolean = true;
    isParent: boolean = true;
    protected statements: Array<Frame> = new Array<Frame>();

    constructor(parent: File | Parent) {
        super(parent);   
        this.statements.push(new StatementSelector(this));
    }

    status(): ParsingStatus {
        var fieldStatus = this.worstStatusOfFields();
        var statementsStatus = this.statements.map(g => g.status()).reduce((prev, cur) => cur < prev ? cur : prev, ParsingStatus.valid);
        return fieldStatus > statementsStatus ? fieldStatus : statementsStatus;
    }

    expandCollapse(): void {
        if (this.isCollapsed()) {
            this.expand();
        } else {
            this.collapse();
        }
    }
    getFirstChild(): Frame {
        return this.statements[0]; //Should always be one - at minimum a SelectGlobal
    }

    getLastChild(): Frame {
        return this.statements[this.statements.length - 1];
    }

    getChildAfter(g: Frame): Frame {
        const index = this.statements.indexOf(g);
        return index < this.statements.length -2 ? this.statements[index +1] : g;
    }

    getChildBefore(g: Frame): Frame {
        const index = this.statements.indexOf(g);
        return index > 0 ? this.statements[index -1] : g;
    }

    getChildRange(first: Frame, last: Frame): Frame[] {
        var fst = this.statements.indexOf(first);
        var lst = this.statements.indexOf(first);
        return this.statements.slice(fst, lst+1);
    }

    getStatementFactory(): StatementFactory {
        return this.getFactory();
    }

    protected renderStatementsAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
        }
        return ss.join("\n");
    }

    protected renderStatementsAsSource() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsSource());
        }
        return ss.join("\r\n");
    }

    public addStatementAtEnd(s: Frame) {
        this.statements.push(s);
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

    //TODO: This is a kludge method, since all selectors should be removed automatically once frame has exited provided there is at least one statement
    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
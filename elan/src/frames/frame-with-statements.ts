import { AbstractFrame } from "./abstract-frame";
import { ParentFrame } from "./interfaces/parent-frame";
import { Statement } from "./interfaces/statement";
import { File } from "./interfaces/file";
import { SelectStatement } from "./fields/select-statement";
import { Frame } from "./interfaces/frame";
import { StatementFactory } from "./interfaces/statement-factory";
import { Collapsible } from "./interfaces/collapsible";
import { ParsingStatus } from "./parsing-status";

export abstract class FrameWithStatements extends AbstractFrame implements ParentFrame, Collapsible{
    isCollapsible: boolean = true;
    isParent: boolean = true;
    protected statements: Array<Statement> = new Array<Statement>();

    constructor(parent: File | ParentFrame) {
        super(parent);   
        this.statements.push(new SelectStatement(this));
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
        throw new Error("Method not implemented.");
    }
    getLastChild(): Frame {
        throw new Error("Method not implemented.");
    }
    getChildAfter(): Frame;
    getChildAfter(): Frame;
    getChildAfter(): import("./interfaces/frame").Frame {
        throw new Error("Method not implemented.");
    }
    getChildBefore(): Frame {
        throw new Error("Method not implemented.");
    }
    getChildrenBetween(first: Frame, last: Frame): Frame[] {
        throw new Error("Method not implemented.");
    }
    getStatementFactory(): StatementFactory {
        throw new Error("Method not implemented.");
    }
    selectRange(multiSelect: boolean): void {
        throw new Error("Method not implemented.");
    }

    private rangeSelecting = false;
    isRangeSelecting(): boolean {
        return this.rangeSelecting;
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

    public addStatementAtEnd(s: Statement) {
        this.statements.push(s);
    }

    public addStatementBefore(s: Statement, before: Statement) {
        var i = this.statements.indexOf(before);
        this.statements.splice(i, 0, s);
    }

    public addStatementAfter(s: Statement, after: Statement) {
        var i = this.statements.indexOf(after) + 1;
        this.statements.splice(i, 0, s);   
    }

    public removeStatement(s: Statement) {
        var i = this.statements.indexOf(s);
        this.statements.splice(i, 1);   
    }

    //TODO: This is a kludge method, since all selectors should be removed automatically once frame has exited provided there is at least one statement
    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
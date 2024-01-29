import { CodeFrame } from "./code-frame";
import { Frame } from "./frame";
import { HasChildren } from "./has-children";
import { isStatement, safeSelectAfter, safeSelectBefore, selectChildRange } from "./helpers";
import { Statement } from "./statements/statement";
import { SelectStatement } from "./text-fields/select-statement";

export abstract class FrameWithStatements extends CodeFrame implements HasChildren {
    protected statements: Array<Statement> = new Array<Statement>();

    constructor(parent: Frame) {
        super(parent);   
        this.statements.push(new SelectStatement(this));
    }
    hasChildren(): boolean {
        return true;
    }
    selectFirstChild(): boolean {
        if (this.statements.length > 0){
            this.statements[0].select(true);
            return true;
        }
        return false;
    } 
    selectLastChild(): void {
        this.statements[this.statements.length - 1].select(true);
    }
    selectChildAfter(child: Frame): void {
        if (isStatement(child)) {
            child.defocus();
            const index = this.statements.indexOf(child);
            safeSelectAfter(this.statements, index);
        }
    }
    selectChildBefore(child: Frame): void {
        if (isStatement(child)) {
            child.defocus();
            const index = this.statements.indexOf(child);
            safeSelectBefore(this.statements, index);
        }
    }

    selectChildRange(): void {
        selectChildRange(this.statements);
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
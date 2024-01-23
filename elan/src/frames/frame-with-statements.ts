import { AbstractFrame } from "./abstract-frame";
import { Frame } from "./frame";
import { HasChildren } from "./has-children";
import { isStatement } from "./helpers";
import { Statement } from "./statements/statement";
import { StatementSelector } from "./statements/statement-selector";

export abstract class FrameWithStatements extends AbstractFrame implements HasChildren {
    protected statements: Array<Statement> = new Array<Statement>();

    constructor() {
        super();   
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.addStatement(new StatementSelector());
    }

    hasChildren(): boolean {
        return true;
    }
    selectFirstChild(): void {
        this.statements[0].select();
    }   
    selectLastChild(): void {
        this.statements[this.statements.length - 1].select();
    }
    selectChildAfter(child: Frame): void {
        if (isStatement(child)) {
            const index = this.statements.indexOf(child);
            if (index >=0 && index < this.statements.length - 1) {
                this.statements[index + 1].select();
            }
        }
    }
    selectChildBefore(child: Frame): void {
        if (isStatement(child)) {
            const index = this.statements.indexOf(child);
            if (index > 0) {
                this.statements[index - 1].select();
            }
        }
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
        return ss.join("\n");
    }

    public addStatement(s : Statement) {
        s.initialize(this.frameMap, this);
        this.statements.push(s);
    }

    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
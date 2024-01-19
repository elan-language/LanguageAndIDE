import { AbstractFrame } from "./abstract-frame";
import { nextId } from "./helpers";
import { Statement } from "./statements/statement";
import { StatementSelector } from "./statements/statement-selector";

export abstract class FrameWithStatements extends AbstractFrame {
    private statements: Array<Statement> = new Array<Statement>();

    constructor() {
        super();
        this.addStatement(new StatementSelector());
    }

    protected renderStatementsAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
        }
        return ss.join("\n");
    }

    public addStatement(s : Statement) {
        this.statements.push(s);
    }

    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
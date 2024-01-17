import { Frame } from "./frame";
import { nextId } from "./helpers";
import { Statement } from "./statements/statement";
import { StatementSelector } from "./statements/statement-selector";

export abstract class FrameWithStatements implements Frame {
    private statements: Array<Statement> = new Array<Statement>();
    public htmlId : string ="";

    constructor() {
        this.addStatement(new StatementSelector());
    }

    protected cls() : string {
        return "";
    };

    protected renderStatementsAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
        }
        return ss.join("\n");
    }

    abstract renderAsHtml(): string;

    public addStatement(s : Statement) {
        this.statements.push(s);
    }

    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
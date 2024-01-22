import { AbstractFrame } from "./abstract-frame";
import { Frame } from "./frame";
import { HasChildren } from "./has-children";
import { Statement } from "./statements/statement";
import { StatementSelector } from "./statements/statement-selector";

export abstract class FrameWithStatements extends AbstractFrame implements HasChildren {
    private statements: Array<Statement> = new Array<Statement>();

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
        throw new Error("Method not implemented");
    }
    selectChildBefore(child: Frame): void {
        throw new Error("Method not implemented");
    }

    protected renderStatementsAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
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
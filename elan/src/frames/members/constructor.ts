import { nextId } from "../helpers";
import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { Identifier } from "../text-entry-fields/identifier";
import { ParamList } from "../text-entry-fields/param-list";
import { Member } from "./member";


export class Constructor implements Member {

    private statements: Array<Statement> = new Array<Statement>();
    public params: ParamList = new ParamList();
    public htmlId : string ="";
    private cls() : string {
        return "";
    };
   
    constructor() {
        this.htmlId = `constructor${nextId()}`;
        this.addStatement(new StatementSelector());
    }

    public renderAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
        }
        const statements = ss.join("\n");
        return `<constructor class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>constructor</keyword>(${this.params.renderAsHtml()})
${statements}
<keyword>end constructor</keyword>
</constructor>`;
    }

    public addStatement(s : Statement) {
        this.statements.push(s);
    }

    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
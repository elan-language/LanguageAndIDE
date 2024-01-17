import { Frame } from "../frame";
import { Global } from "./global";
import { nextId } from "../helpers";
import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { Identifier } from "../text-entries/identifier";
import { ArgList } from "../text-entries/arg-list";


export class Procedure implements Global {

    private statements: Array<Statement> = new Array<Statement>();
    public htmlId : string ="";
    public name : Identifier = new Identifier("name");
    public argList: ArgList = new ArgList("arguments");
   
    constructor() {
        this.htmlId = `proc${nextId()}`;
        this.addStatement(new StatementSelector());
    }

    public renderAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
        }
        const statements = ss.join("\n");
        return `<global id='${this.htmlId}' tabindex="0">
<keyword>procedure</keyword>${this.name.renderAsHtml()}(${this.argList.renderAsHtml()})
${statements}
<keyword>end procedure</keyword>
</global>`;
    }

    public addStatement(s : Statement) {
        this.statements.push(s);
    }

    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
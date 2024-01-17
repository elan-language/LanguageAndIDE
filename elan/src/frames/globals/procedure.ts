import { Global } from "./global";
import { nextId } from "../helpers";
import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { Identifier } from "../text-entry-fields/identifier";
import { ParamList } from "../text-entry-fields/param-list";
import { Member } from "../members/member";


export class Procedure implements Global, Member {

    private statements: Array<Statement> = new Array<Statement>();
    public htmlId : string ="";
    public name : Identifier = new Identifier();
    public params: ParamList = new ParamList();
   
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
        return `<div class="vspace" id='${this.htmlId}' tabindex="0">
<keyword>procedure</keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})
${statements}
<keyword>end procedure</keyword>
</div>`;
    }

    public addStatement(s : Statement) {
        this.statements.push(s);
    }

    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
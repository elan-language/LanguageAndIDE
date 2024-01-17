import { nextId } from "../helpers";
import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { Expression } from "../text-entry-fields/expression";
import { Identifier } from "../text-entry-fields/identifier";
import { ParamList } from "../text-entry-fields/param-list";
import { Type } from "../text-entry-fields/type";
import { Member } from "./member";

export class AsString implements Member {

    private statements: Array<Statement> = new Array<Statement>();
    public htmlId : string ="";
    public name : Identifier = new Identifier();
    public returnExpr : Expression = new Expression("expression");
    public returnType: Type = new Type("return type");
   
    constructor() {
        this.htmlId = `func${nextId()}`;
        this.name.enterText("asString");
        this.addStatement(new StatementSelector());
    }

    public renderAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
        }
        const statements = ss.join("\n");

        return `<member id='${this.htmlId}' tabindex="0">
<keyword>function</keyword>${this.name.renderAsHtml()}()<keyword> as </keyword>String
${statements}
<statement><keyword>return <keyword>${this.returnExpr.renderAsHtml()}</statement>
<keyword>end function</keyword>
</member>`;
    }

    public addStatement(s : Statement) {
        this.statements.push(s);
    }

    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
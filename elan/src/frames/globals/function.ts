import { Global } from "./global";
import { nextId } from "../helpers";
import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { Identifier } from "../text-entry-fields/identifier";
import { ParamList } from "../text-entry-fields/param-list";
import { Type } from "../text-entry-fields/type";
import { Member } from "../members/member";
import { ReturnStatement } from "../statements/return-statement";


export class Function implements Global, Member {

    private statements: Array<Statement> = new Array<Statement>();
    public returnStatement: ReturnStatement = new ReturnStatement();
    public htmlId : string ="";
    public name : Identifier = new Identifier();
    public params: ParamList = new ParamList();
    public returnType: Type = new Type("return type");
    protected cls() : string {
        return "";
    };
   
    constructor() {
        this.htmlId = `func${nextId()}`;
        this.addStatement(new StatementSelector());
    }

    protected statementsRenderedAsHtml(): string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
        }
        return ss.join("\n");
    }

    public renderAsHtml() : string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>function </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})<keyword> as </keyword>${this.returnType.renderAsHtml()}
${this.statementsRenderedAsHtml()}
${this.returnStatement.renderAsHtml()}
<keyword>end function</keyword>
</function>`;
    }

    public addStatement(s : Statement) {
        this.statements.push(s);
    }

    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
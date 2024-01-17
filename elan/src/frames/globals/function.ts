import { Frame } from "../frame";
import { Global } from "./global";
import { nextId } from "../helpers";
import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { Identifier } from "../text-entry-fields/identifier";
import { ParamList } from "../text-entry-fields/param-list";
import { Type } from "../text-entry-fields/type";


export class Function implements Global {

    private statements: Array<Statement> = new Array<Statement>();
    public htmlId : string ="";
    public name : Identifier = new Identifier();
    public params: ParamList = new ParamList();
    public returnType: Type = new Type("return type");
   
    constructor() {
        this.htmlId = `func${nextId()}`;
        this.addStatement(new StatementSelector());
    }

    public renderAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.statements) {
            ss.push(frame.renderAsHtml());
        }
        const statements = ss.join("\n");
        return `<global id='${this.htmlId}' tabindex="0">
<keyword>function</keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})<keyword> as </keyword>${this.returnType.renderAsHtml()}
${statements}
<keyword>end function</keyword>
</global>`;
    }

    public addStatement(s : Statement) {
        this.statements.push(s);
    }

    public removeStatementSelector(): void {
        this.statements.splice(0,1);
    }
}
import { Global } from "./global";
import { Identifier } from "../fields/identifier";
import { ParamList } from "../fields/param-list";
import { Type } from "../fields/type";
import { ReturnStatement } from "../statements/return-statement";
import { FrameWithStatements } from "../frame-with-statements";
import { Selectable } from "../selectable";
import { Statement } from "../statements/statement";
import {Parent} from "../parent";

export class Function extends FrameWithStatements implements Global {
    isGlobal = true;
    public name : Identifier;
    public params: ParamList;
    public returnType: Type;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.name = new Identifier(this);
        this.params = new ParamList(this);
        this.returnType = new Type(this);
        this.returnType.setPrompt("return type");
        this.statements.push(new ReturnStatement(this));
    }

    getPrefix(): string {
        return 'func';
    }

    get returnStatement() {
        return this.statements[this.statements.length -1] as ReturnStatement;
    }

    public override selectFirstText(): boolean {
        this.name.select();
        return true;
    }

    public addStatementBeforeReturn(s: Statement): void {
        var i = this.statements.length -1;
        this.statements.splice(i,0,s);
    }

    public renderAsHtml() : string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>function </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})<keyword> as </keyword>${this.returnType.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end function</keyword>
</function>`;
    }

    indent(): string {
        return "";
    }

    public renderAsSource() : string {
        return `function ${this.name.renderAsSource()}(${this.params.renderAsSource()}) as ${this.returnType.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
end function\r
`;
    }
}
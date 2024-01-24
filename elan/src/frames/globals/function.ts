import { Global } from "./global";
import { Identifier } from "../text-fields/identifier";
import { ParamList } from "../text-fields/param-list";
import { Type } from "../text-fields/type";
import { Member, Role } from "../class-members/member";
import { ReturnStatement } from "../statements/return-statement";
import { FrameWithStatements } from "../frame-with-statements";
import { Frame } from "../frame";
import { Statement } from "../statements/statement";
import { FileFrame } from "../file-frame";

export class Function extends FrameWithStatements implements Global {

    public htmlId : string ="";
    public name : Identifier = new Identifier("name");
    public params: ParamList = new ParamList();
    public returnType: Type = new Type("return type");

    constructor() {
        super();
        this.htmlId = `func${this.nextId()}`;
        this.multiline = true;
    }

    get returnStatement() {
        return this.statements[this.statements.length -1] as ReturnStatement;
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.addFixedStatement(new ReturnStatement);
        this.name.initialize(frameMap, this);
        this.params.initialize(frameMap, this);
        this.returnType.initialize(frameMap, this);
    }

    public override selectFirstText(): boolean {
        this.name.select(true);
        return true;
    }
    
    isGlobal = true;

    public override addStatement(s: Statement): void {
        s.initialize(this.frameMap, this);
        const rs = this.statements.pop();
        this.statements.push(s);
        if (rs) {
            this.statements.push(rs);
        }
    }

    public addFixedStatement(s: Statement): void {
        s.initialize(this.frameMap, this);
        this.statements.push(s);
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
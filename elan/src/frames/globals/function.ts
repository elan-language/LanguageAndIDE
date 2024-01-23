import { Global } from "./global";
import { Identifier } from "../text-fields/identifier";
import { ParamList } from "../text-fields/param-list";
import { Type } from "../text-fields/type";
import { Member } from "../class-members/member";
import { ReturnStatement } from "../statements/return-statement";
import { FrameWithStatements } from "../frame-with-statements";
import { Frame } from "../frame";

export class Function extends FrameWithStatements implements Global, Member {

    public returnStatement: ReturnStatement = new ReturnStatement();
    public htmlId : string ="";
    public name : Identifier = new Identifier("name");
    public params: ParamList = new ParamList();
    public returnType: Type = new Type("return type");

    constructor() {
        super();
        this.htmlId = `func${this.nextId()}`;
        this.multiline = true;
    }
    
    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.returnStatement.initialize(frameMap, this);
        this.name.initialize(frameMap, this);
        this.params.initialize(frameMap, this);
        this.returnType.initialize(frameMap, this);
    }
    
    isGlobal = true;
    isMember = true;

    public renderAsHtml() : string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>function </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})<keyword> as </keyword>${this.returnType.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
${this.returnStatement.renderAsHtml()}
<keyword>end function</keyword>
</function>`;
    }
}
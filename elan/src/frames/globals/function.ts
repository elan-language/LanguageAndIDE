import { Global } from "./global";
import { nextId } from "../helpers";
import { Identifier } from "../text-entry/identifier";
import { ParamList } from "../text-entry/param-list";
import { Type } from "../text-entry/type";
import { Member } from "../members/member";
import { ReturnStatement } from "../statements/return-statement";
import { FrameWithStatements } from "../frame-with-statements";

export class Function extends FrameWithStatements implements Global, Member {

    public returnStatement: ReturnStatement = new ReturnStatement();
    public htmlId : string ="";
    public name : Identifier = new Identifier("name");
    public params: ParamList = new ParamList();
    public returnType: Type = new Type("return type");

    constructor() {
        super();
        this.htmlId = `func${nextId()}`;
    }

    public renderAsHtml() : string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>function </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})<keyword> as </keyword>${this.returnType.renderAsHtml()}
${this.renderStatementsAsHtml()}
${this.returnStatement.renderAsHtml()}
<keyword>end function</keyword>
</function>`;
    }
}
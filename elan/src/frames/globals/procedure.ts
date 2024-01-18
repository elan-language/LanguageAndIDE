import { Global } from "./global";
import { nextId } from "../helpers";
import { Identifier } from "../text-entry/identifier";
import { ParamList } from "../text-entry/param-list";
import { Member } from "../members/member";
import { FrameWithStatements } from "../frame-with-statements";

export class Procedure extends FrameWithStatements implements Global, Member {

    public htmlId : string ="";
    public name : Identifier = new Identifier("name");
    public params: ParamList = new ParamList();

    constructor() {
        super();
        this.htmlId = `proc${nextId()}`;
    }

    public renderAsHtml() : string {
        return `<procedure class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>procedure </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})
${this.renderStatementsAsHtml()}
<keyword>end procedure</keyword>
</procedure>`;
    }
}
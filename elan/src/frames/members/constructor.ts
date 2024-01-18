import { FrameWithStatements } from "../frame-with-statements";
import { nextId } from "../helpers";
import { ParamList } from "../text-entry/param-list";
import { Member } from "./member";

export class Constructor extends FrameWithStatements implements Member {
    public params: ParamList = new ParamList();
    public htmlId : string ="";
   
    constructor() {
        super();
        this.htmlId = `constructor${nextId()}`;
    }

    public renderAsHtml() : string {
        return `<constructor class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>constructor</keyword>(${this.params.renderAsHtml()})
${this.renderStatementsAsHtml()}
<keyword>end constructor</keyword>
</constructor>`;
    }
}
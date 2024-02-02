import { Renderable } from "../frame";
import { FrameWithStatements } from "../frame-with-statements";
import { ParamList } from "../text-fields/param-list";
import { Member } from "./member";
import {Parent} from "../parent";

export class Constructor extends FrameWithStatements implements Member, Parent {
    isMember = true;
    public params: ParamList = new ParamList(this.getParent());

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
    }

    getPrefix(): string {
        return 'constructor';
    }

    public override selectFirstText(): boolean {
        this.params.select();
        return true;
    }


    public renderAsHtml(): string {
        return `<constructor class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>constructor</keyword>(${this.params.renderAsHtml()})</top>
${this.renderStatementsAsHtml()}
<keyword>end constructor</keyword>
</constructor>`;
    }

    public renderAsSource(): string {
        return `${this.indent()}constructor(${this.params.renderAsSource()})\r
${this.renderStatementsAsSource()}\r
${this.indent()}end constructor\r
`;
    }
}
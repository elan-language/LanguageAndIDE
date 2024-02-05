import { FrameWithStatements } from "../frame-with-statements";
import { ParamList } from "../fields/param-list";
import { Member } from "../interfaces/member";
import {ParentFrame} from "../interfaces/parent-frame";
import { Class } from "../globals/class";

export class Constructor extends FrameWithStatements implements Member {
    isMember = true;
    public params: ParamList ;

    constructor(parent: Class) {
        super(parent);
        this.multiline = true;
        this.params = new ParamList(parent);
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
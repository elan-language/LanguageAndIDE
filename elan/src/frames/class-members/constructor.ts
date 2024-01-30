import { Frame } from "../frame";
import { FrameWithStatements } from "../frame-with-statements";
import { ParamList } from "../text-fields/param-list";
import { Member } from "./member";

export class Constructor extends FrameWithStatements implements Member {
    isMember = true;
    public params: ParamList = new ParamList(this.getParent());

    constructor(parent: Frame) {
        super(parent);
        this.multiline = true;
    }

    getPrefix(): string {
        return 'constructor';
    }

    public override selectFirstText(): boolean {
        this.params.select(true, false);
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
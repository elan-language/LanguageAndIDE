import { Frame } from "../frame";
import { FrameWithStatements } from "../frame-with-statements";
import { ParamList } from "../text-fields/param-list";
import { Member, Role } from "./member";

export class Constructor extends FrameWithStatements implements Member {
    public params: ParamList = new ParamList();
    public htmlId: string = "";

    constructor() {
        super();
        this.htmlId = `constructor${this.nextId()}`;
        this.multiline = true;
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.params.initialize(frameMap, this);
    }

    public override selectFirstText(): boolean {
        this.params.select(true);
        return true;
    }

    isMember = true;

    currentRole(): Role {
        return Role.member;
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
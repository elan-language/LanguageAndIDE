import { Frame } from "../frame";
import { FrameWithStatements } from "../frame-with-statements";
import { ParamList } from "../text-fields/param-list";
import { Member } from "./member";

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

    isMember = true;

    public renderAsHtml(): string {
        return `<constructor class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>constructor</keyword>(${this.params.renderAsHtml()})</top>
${this.renderStatementsAsHtml()}
<keyword>end constructor</keyword>
</constructor>`;
    }

    public renderAsSource(): string {
        return `
constructor(${this.params.renderAsSource()})
${this.renderStatementsAsSource()}
end constructor`;
    }
}
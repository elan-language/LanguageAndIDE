import { Global } from "./global";
import { Identifier } from "../text-fields/identifier";
import { ParamList } from "../text-fields/param-list";
import { FrameWithStatements } from "../frame-with-statements";
import { Frame } from "../frame";

export class Procedure extends FrameWithStatements implements Global {

    public htmlId : string ="";
    public name : Identifier;
    public params: ParamList;

    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `proc${this.nextId()}`;
        this.multiline = true;
        this.name = new Identifier(this);
        this.params = new ParamList(this);
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.name.initialize(frameMap, this);
        this.params.initialize(frameMap, this);
    }

    isGlobal = true;

    public override selectFirstText(): boolean {
        this.name.select(true);
        return true;
    }

    public renderAsHtml() : string {
        return `<procedure class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>procedure </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})</top>
${this.renderStatementsAsHtml()}
<keyword>end procedure</keyword>
</procedure>`;
    }

    indent(): string {
        return "";
    }

    public renderAsSource() : string {
        return `procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderStatementsAsSource()}\r
end procedure\r
`;
    }
}
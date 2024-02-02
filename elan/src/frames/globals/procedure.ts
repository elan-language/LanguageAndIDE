import { Global } from "./global";
import { Identifier } from "../fields/identifier";
import { ParamList } from "../fields/param-list";
import { FrameWithStatements } from "../frame-with-statements";
import { Renderable } from "../frame";
import {Parent} from "../parent";

export class Procedure extends FrameWithStatements implements Global {
    isGlobal = true;
    public name : Identifier;
    public params: ParamList;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.name = new Identifier(this);
        this.params = new ParamList(this);
    }

    getPrefix(): string {
        return 'proc';
    }

    public override selectFirstText(): boolean {
        this.name.select();
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
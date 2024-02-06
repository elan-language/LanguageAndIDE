import { Identifier } from "../fields/identifier";
import { ParamList } from "../fields/param-list";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";

export class Procedure extends FrameWithStatements {
    isGlobal = true;
    public name : Identifier;
    public params: ParamList;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.name = new Identifier(this);
        this.params = new ParamList(this);
    }

    getFields(): Field[] {
        return [this.name, this.params];
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
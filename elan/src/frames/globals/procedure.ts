import { Global } from "../interfaces/global";
import { Identifier } from "../fields/identifier";
import { ParamList } from "../fields/param-list";
import { FrameWithStatements } from "../frame-with-statements";
import { File } from "../interfaces/file";
import { Class } from "./class";
import { Field } from "../interfaces/field";

export class Procedure extends FrameWithStatements implements Global {
    isGlobal = true;
    public name : Identifier;
    public params: ParamList;

    constructor(parent: File | Class) {
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
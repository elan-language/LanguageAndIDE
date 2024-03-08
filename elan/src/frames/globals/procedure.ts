import { CodeSource } from "../code-source";
import { Identifier } from "../fields/identifier";
import { ParamList } from "../fields/param-list";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Parent } from "../interfaces/parent";

export class Procedure extends FrameWithStatements {
    isGlobal = true;
    public name : Identifier;
    public params: ParamList;
    file: File;

    constructor(parent: Parent) {
        super(parent);
        this.file = parent as File;
        this.name = new Identifier(this);
        this.params = new ParamList(this);
    }

    getFields(): Field[] {
        return [this.name, this.params];
    }

    getIdPrefix(): string {
        return 'proc';
    }
    public renderAsHtml() : string {
        return `<procedure class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>procedure </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})</top>
${this.renderChildrenAsHtml()}
<keyword>end procedure</keyword>
</procedure>`;
    }
    indent(): string {
        return "";
    }
    public renderAsSource() : string {
        return `procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
${this.renderChildrenAsSource()}\r
end procedure\r
`;
    }
    parseTop(source: CodeSource): void {
        source.remove("procedure ");
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(")");
    }
    parseBottom(source: CodeSource): boolean {
       return this.parseStandardEnding(source, "end procedure");
    }
}
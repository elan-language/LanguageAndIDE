import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { ParamList } from "../fields/param-list";
import { ProcNameDef } from "../fields/proc-name-def";
import { Class } from "../globals/class";
import { singleIndent } from "../helpers";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";

export class AbstractProcedure extends AbstractFrame implements Member {
    isAbstract = true;
    isMember: boolean = true;
    public name : ProcNameDef;
    public params: ParamList;
    private class: Class;

    constructor(parent: Parent) {
        super(parent);
        this.class = parent as Class;
        this.name = new ProcNameDef(this);
        this.params = new ParamList(this);
    }

    getFields(): Field[] {
        return [this.name, this.params];
    }

    getIdPrefix(): string {
        return 'proc';
    }

    public override indent(): string {
        return singleIndent();
    }

    renderAsHtml(): string {
        return `<procedure class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>abstract procedure </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()})</procedure>
`;
    }

    public override renderAsSource() : string {
        return `${this.indent()}abstract procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
`;
    }

    parseFrom(source: CodeSource): void {
        source.remove("abstract procedure ");
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(")");
    }
    insertSelector(after: boolean): void {
        this.class.insertMemberSelector(after, this);
    }
}
import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { ParamList } from "../fields/param-list";
import { Class } from "../globals/class";
import { singleIndent } from "../helpers";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { abstractKeyword, abstractProcedureKeywords, procedureKeyword } from "../keywords";

export class AbstractProcedure extends AbstractFrame implements Member {
    isAbstract = true;
    isMember: boolean = true;
    public name : IdentifierField;
    public params: ParamList;
    private class: Class;

    constructor(parent: Parent) {
        super(parent);
        this.class = parent as Class;
        this.name = new IdentifierField(this);
        this.params = new ParamList(this);
    }
    initialKeywords(): string {
        return abstractProcedureKeywords;
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
<keyword>abstract procedure </keyword><method>${this.name.renderAsHtml()}</method>(${this.params.renderAsHtml()})</procedure>
`;
    }

    public override renderAsSource() : string {
        return `${this.indent()}abstract procedure ${this.name.renderAsSource()}(${this.params.renderAsSource()})\r
`;
    }

    public override compile(): string {
        this.compileErrors = [];
        return `${this.indent()}${this.name.compile()}(${this.params.compile()}) {\r
${this.indent()}}\r
`;
    }

    parseFrom(source: CodeSource): void {
        source.remove("abstract procedure ");
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(")");
    }
}
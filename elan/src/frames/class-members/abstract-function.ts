import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { ParamList } from "../fields/param-list";
import { TypeField } from "../fields/type-field";
import { Class } from "../globals/class";
import { singleIndent } from "../helpers";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";
import { abstractFunctionKeywords, abstractKeyword, functionKeyword } from "../keywords";

export class AbstractFunction extends AbstractFrame implements Member {
    isAbstract = true;
    isMember: boolean = true;
    public name : IdentifierField;
    public params: ParamList;
    public returnType: TypeField;
    private class: Class;
   
    constructor(parent: Parent) {
        super(parent);
        this.class = parent as Class;
        this.name = new IdentifierField(this);
        this.params = new ParamList(this);
        this.returnType = new TypeField(this);
        this.returnType.setPlaceholder("return type");
    }
    initialKeywords(): string {
        return abstractFunctionKeywords;
    }
    getFields(): Field[] {
        return [this.name, this.params, this.returnType];
    }

    getIdPrefix(): string {
        return 'func';
    }

    public override indent(): string {
        return singleIndent();
    }

    renderAsHtml(): string {
        return `<function class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>abstract function </keyword><method>${this.name.renderAsHtml()}</method>(${this.params.renderAsHtml()}) return ${this.returnType.renderAsHtml()}</function>
`;
    }

    public override renderAsSource() : string {
        return `${this.indent()}abstract function ${this.name.renderAsSource()}(${this.params.renderAsSource()}) return ${this.returnType.renderAsSource()}\r
`;
    }

    public override compile(): string {
        this.compileErrors = [];
        const name = this.name.compile();
        if (name !== "asString") {
            return `${this.indent()}${this.name.compile()}(${this.params.compile()}) {\r
${this.indent()}${this.indent()}return ${this.returnType.compile()};\r
${this.indent()}}\r
`;
        }
        return "";
    }

    parseFrom(source: CodeSource): void {
        source.remove("abstract function ");
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(") return ");
        this.returnType.parseFrom(source);
    }
}
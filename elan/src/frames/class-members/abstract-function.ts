import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { ParamList } from "../fields/param-list";
import { Type } from "../fields/type";
import { Class } from "../globals/class";
import { singleIndent } from "../helpers";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";
import { Parent } from "../interfaces/parent";

export class AbstractFunction extends AbstractFrame implements Member {
    isAbstract = true;
    isMember: boolean = true;
    public name : IdentifierField;
    public params: ParamList;
    public returnType: Type;
    private class: Class;

    constructor(parent: Parent) {
        super(parent);
        this.class = parent as Class;
        this.name = new IdentifierField(this);
        this.params = new ParamList(this);
        this.returnType = new Type(this);
        this.returnType.setPlaceholder("return type");
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
<keyword>abstract function </keyword>${this.name.renderAsHtml()}(${this.params.renderAsHtml()}) as ${this.returnType.renderAsHtml()}</function>
`;
    }

    public override renderAsSource() : string {
        return `${this.indent()}abstract function ${this.name.renderAsSource()}(${this.params.renderAsSource()}) as ${this.returnType.renderAsSource()}\r
`;
    }

    parseFrom(source: CodeSource): void {
        source.remove("abstract function ");
        this.name.parseFrom(source);
        source.remove("(");
        this.params.parseFrom(source);
        source.remove(") as ");
        this.returnType.parseFrom(source);
    }
}
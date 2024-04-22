import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { IdentifierField } from "../fields/identifier-field";
import { TypeField } from "../fields/type-field";
import { Class } from "../globals/class";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";

export class AbstractProperty extends AbstractFrame implements Member {
    isAbstract = true;
    isMember = true;
    name: IdentifierField;
    type: TypeField;
    public private: boolean = false;
    private class: Class;

    constructor(parent: Class) {
        super(parent);
        this.class = parent as Class;
        this.name = new IdentifierField(this);
        this.type = new TypeField(this);
    }

    getFields(): Field[] {
        return [this.name, this.type];
    }

    getIdPrefix(): string {
        return 'prop';
    }
    renderAsHtml(): string {
        return `<property class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>abstract property </keyword>${this.name.renderAsHtml()} ${this.type.renderAsHtml()}</property>`;
    }

    renderAsSource(): string {
        return `${this.indent()}abstract property ${this.name.renderAsSource()} as ${this.type.renderAsSource()}\r\n`;
    }

    renderAsObjectCode(): string {
        const pName = this.name.renderAsObjectCode();

       
            return `${this.indent()}get ${pName}() {\r
${this.indent()}${this.indent()}return ${this.type.renderAsObjectCode()};\r
${this.indent()}}\r
${this.indent()}set ${pName}(${pName}) {\r
${this.indent()}}\r\n`;
        
    }

    parseFrom(source: CodeSource): void {
        source.remove("abstract property ");
        this.name.parseFrom(source);
        source.remove(" as ");
        this.type.parseFrom(source);
    }

    public initCode() {
        return `["${this.name.renderAsSource()}", "${this.type.renderAsSource()}"]`;
    }
} 

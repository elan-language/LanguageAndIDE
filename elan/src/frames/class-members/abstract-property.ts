import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { PropNameDef } from "../fields/prop-name-def";
import { TypeUse } from "../fields/type-use";
import { Class } from "../globals/class";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";

export class AbstractProperty extends AbstractFrame implements Member {
    isAbstract = true;
    isMember = true;
    name: PropNameDef;
    type: TypeUse;
    public private: boolean = false;
    private class: Class;

    constructor(parent: Class) {
        super(parent);
        this.class = parent as Class;
        this.name = new PropNameDef(this);
        this.type = new TypeUse(this);
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
        return `${this.indent()}abstract property ${this.name.renderAsSource()} ${this.type.renderAsSource()}\r\n`;
    }

    parseFrom(source: CodeSource): void {
        source.remove("abstract property ");
        this.name.parseFrom(source);
        source.remove(" ");
        this.type.parseFrom(source);
    }
    insertSelector(after: boolean): void {
        this.class.insertMemberSelector(after, this);
    }
} 

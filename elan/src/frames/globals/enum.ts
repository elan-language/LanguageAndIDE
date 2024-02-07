
import { EnumValues } from "../fields/enum-values";
import { Type } from "../fields/type";
import { AbstractFrame } from "../abstract-frame";
import { File } from "../interfaces/file";
import { singleIndent } from "../helpers";
import { Field } from "../interfaces/field";

export class Enum extends AbstractFrame {
    isGlobal = true;
    name: Type;
    values: EnumValues;

    constructor(parent: File) {
        super(parent);
        this.multiline = true;
        this.name = new Type(this);
        this.name.setPrompt("Name");
        this.values = new EnumValues(this);
    }

    getFields(): Field[] {
        return [this.name, this.values];
    }

    getPrefix(): string {
        return 'enum';
    }

    public override selectFirstField(): boolean {
        this.name.select();
        return true;
    }

    renderAsHtml(): string {
        return `<enum class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>enum </keyword>${this.name.renderAsHtml()}</top>
<statement>${this.values.renderAsHtml()}</statement>       
<keyword>end enum</keyword>
</enum>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return `enum ${this.name.renderAsSource()}\r
${singleIndent()}${this.values.renderAsSource()}\r
end enum\r
`;
    }
} 

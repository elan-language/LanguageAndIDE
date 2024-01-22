import { Global } from "./global";
import { EnumValues } from "../text-fields/enum-values";
import { Type } from "../text-fields/type";
import { AbstractFrame } from "../abstract-frame";

export class Enum extends AbstractFrame implements Global {
    name: Type = new Type("Name");
    values: EnumValues = new EnumValues();

    constructor() {
        super();
        this.htmlId = `enum${this.nextId()}`;
        this.multiline = true;
    }

    renderAsHtml(): string {
        return `<enum class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>enum </keyword>${this.name.renderAsHtml()}</top>
<statement>${this.values.renderAsHtml()}</statement>       
<keyword>end enum</keyword>
</enum>`;
    }
} 

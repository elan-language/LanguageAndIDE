
import { Identifier } from "../text-entry/identifier";
import { Global } from "./global";
import { EnumValues } from "../text-entry/enum-values";
import { Type } from "../text-entry/type";
import { AbstractFrame } from "../abstract-frame";

export class Enum extends AbstractFrame implements Global {
     name: Type = new Type("Name");
    values: EnumValues = new EnumValues();

    constructor() {
        super();
        this.htmlId = `enum${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<enum class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>enum </keyword>${this.name.renderAsHtml()}
<statement>${this.values.renderAsHtml()}</statement>       
<keyword>end enum</keyword>
</enum>`;
    }
} 

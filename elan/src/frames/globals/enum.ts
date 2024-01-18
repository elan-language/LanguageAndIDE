import { nextId } from "../helpers";
import { Identifier } from "../text-entry/identifier";
import { Global } from "./global";
import { EnumValues } from "../text-entry/enum-values";
import { Type } from "../text-entry/type";

export class Enum implements Global {
    htmlId: string = "";
    name: Type = new Type("Name");
    values: EnumValues = new EnumValues();
    private cls() : string {
        return "";
    };

    constructor() {
        this.htmlId = `enum${nextId()}`;
    }

    renderAsHtml(): string {
        return `<enum class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<keyword>enum </keyword>${this.name.renderAsHtml()}
<statement>${this.values.renderAsHtml()}</statement>       
<keyword>end enum</keyword>
</enum>`;
    }
} 

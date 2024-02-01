import { Global } from "../globals/global";
import {Parent} from "../parent";
import { AbstractFrame } from "../abstract-frame";
import { SelectGlobalField } from "../text-fields/select-global-field";

export class SelectGlobal extends AbstractFrame implements Global {
    isGlobal = true;
    field: SelectGlobalField;

    constructor(parent: Parent) {
        super(parent);
        this.field = new SelectGlobalField(this);
    }

    getPrefix(): string {
        return 'globalSelect';
    }

    renderAsHtml(): string {
        return `<global>${this.field.renderAsHtml()}</global>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return ``;
    } 

}

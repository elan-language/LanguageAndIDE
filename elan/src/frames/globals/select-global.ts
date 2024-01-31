import { Global } from "../globals/global";
import { File } from "../file";
import {Parent} from "../parent";
import { CodeFrame } from "../code-frame";
import { SelectGlobalField } from "../text-fields/select-global-field";

export class SelectGlobal extends CodeFrame implements Global {
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

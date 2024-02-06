
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import { GlobalSelectorField } from "../fields/global-selector-field";
import { Parent } from "../interfaces/parent";

export class GlobalSelector extends AbstractFrame  {
    isGlobal = true;
    selector: GlobalSelectorField;

    constructor(parent: Parent) {
        super(parent);
        this.selector  = new GlobalSelectorField(this);
    }

    getFields(): Field[] {
        return [this.selector];
    }

    getPrefix(): string {
        return 'const';
    }

    public override selectFirstText(): boolean {
        this.selector.select();
        return true;
    }

    renderAsHtml(): string {
        return `<global>${this.selector.renderAsHtml()}</global>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return ``;
    }
} 

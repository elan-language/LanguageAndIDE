
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import { SelectGlobal } from "../fields/select-global";
import { Parent } from "../interfaces/parent";

export class GlobalSelector extends AbstractFrame  {
    isGlobal = true;
    selector: SelectGlobal;

    constructor(parent: Parent) {
        super(parent);
        this.selector  = new SelectGlobal(this);
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
        return `<constant class="${this.cls()}" id='${this.htmlId}' tabindex="0">select: ${this.selector.renderAsHtml()}`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return ``;
    }
} 

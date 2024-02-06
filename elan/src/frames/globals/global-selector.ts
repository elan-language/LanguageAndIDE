
import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import { Global } from "../interfaces/global";
import { AbstractFrame } from "../abstract-frame";
import {File} from "../interfaces/file";
import { Field } from "../interfaces/field";
import { SelectGlobal } from "../fields/select-global";

export class GlobalSelector extends AbstractFrame implements Global {
    isGlobal = true;
    selector: SelectGlobal;

    constructor(parent: File) {
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

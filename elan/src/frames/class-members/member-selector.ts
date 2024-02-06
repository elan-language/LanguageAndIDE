
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { MemberSelectorField } from "../fields/member-selector-field";
import { Member } from "../interfaces/member";
import { singleIndent } from "../helpers";

export class MemberSelector extends AbstractFrame implements Member  {
    isMember: boolean = true;
    isGlobal: boolean  = true;
    selector: MemberSelectorField;

    constructor(parent: Parent) {
        super(parent);
        this.selector  = new MemberSelectorField(this);
    }

    getFields(): Field[] {
        return [this.selector];
    }

    getPrefix(): string {
        return 'select';
    }

    public override selectFirstText(): boolean {
        this.selector.select();
        return true;
    }

    renderAsHtml(): string {
        return `<member class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.selector.renderAsHtml()}</member>`;
    }

    renderAsSource(): string {
        return `${singleIndent()}`;
    }
} 

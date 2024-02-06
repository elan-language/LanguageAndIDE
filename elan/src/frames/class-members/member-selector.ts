
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { SelectMember } from "../fields/select-member";
import { Member } from "../interfaces/member";

export class MemberSelector extends AbstractFrame implements Member  {
    isMember: boolean = true;
    isGlobal: boolean  = true;
    selector: SelectMember;

    constructor(parent: Parent) {
        super(parent);
        this.selector  = new SelectMember(this);
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
        return `member${this.selector.renderAsHtml()}</global>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return ``;
    }
} 

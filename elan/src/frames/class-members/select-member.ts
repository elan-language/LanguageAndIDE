import { singleIndent } from "../helpers";
import { Member } from "./member";
import {Parent} from "../parent";
import { TextFieldHolder } from "../TextFieldHolder";
import { CodeFrame } from "../code-frame";
import { SelectMemberField } from "../text-fields/select-member-field";

export class SelectMember extends CodeFrame implements Member, TextFieldHolder {
    isMember = true;
    field: SelectMemberField;
    
    constructor(parent: Parent) {
        super(parent);
        this.field = new SelectMemberField(this);
    }

    getPrefix(): string {
        return 'memberSelect';
    }

    renderAsHtml(): string {
        return `<member>${this.field.renderAsHtml()}</member>`;
    }

    renderAsSource(): string {
        return `${singleIndent()}member\r\n`;
    }
} 

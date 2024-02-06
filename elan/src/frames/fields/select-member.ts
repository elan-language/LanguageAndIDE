import { singleIndent } from "../helpers";
import { AbstractField } from "./abstract-field";
import { Member } from "../interfaces/member";
import { Class } from "../globals/class";
import { KeyEvent } from "../interfaces/key-event";
import { MemberSelector } from "../class-members/member-selector";

export class SelectMember extends AbstractField implements Member {
    isMember: boolean = true;
    class: Class;
    memberSelector: MemberSelector;

    constructor(holder: MemberSelector ) {
        super(holder);
        this.memberSelector = holder;
        this.class = holder.getParent() as Class;
        this._help = "function procedure property";
        this.setPrompt("new member");
        this.setOptional(true);
    }

    getPrefix(): string {
        return 'memberSelect';
    }

    renderAsHtml(): string {
        return `<member>${super.renderAsHtml()}</member>`;
    }

    renderAsSource(): string {
        return `${singleIndent()}member\r\n`;
    }

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        var empty = this.text ==="";
        if (empty && (char ==='f')) {
            this.class.addFunctionMethodBefore(this.memberSelector);
            return;
        }
        if (this.text === "pro" && char ==="c") {
            this.class.addProcedureMethodBefore(this.memberSelector);
            this.text = "";
            return;
        }
        if (this.text === "pro" && char ==="p") {
            this.class.addPropertyBefore(this.memberSelector);
            this.text = "";
            return;
        }
        super.processKey(keyEvent);
    }
} 

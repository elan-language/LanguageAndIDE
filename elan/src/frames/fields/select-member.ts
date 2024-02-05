import { singleIndent } from "../helpers";
import { AbstractField } from "./abstract-field";
import { Member } from "../interfaces/member";
import { Class } from "../globals/class";
import { KeyEvent } from "../interfaces/key-event";

export class SelectMember extends AbstractField implements Member {
    isMember: boolean = true;
    class: Class;

    constructor(holder: Class ) {
        super(holder);
        this.class = holder;
        this.setPrompt("function procedure property");
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
            this.class.addFunctionMethodBefore(this);
            return;
        }
        if (this.text === "pro" && char ==="c") {
            this.class.addProcedureMethodBefore(this);
            this.text = "";
            return;
        }
        if (this.text === "pro" && char ==="p") {
            this.class.addPropertyBefore(this);
            this.text = "";
            return;
        }
        super.processKey(keyEvent);
    }
} 

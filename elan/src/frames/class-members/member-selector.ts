import { Member } from "../interfaces/member";
import { singleIndent } from "../helpers";
import { KeyEvent } from "../interfaces/key-event";
import { Class } from "../globals/class";
import { AbstractSelector } from "../abstract-selector";

export class MemberSelector extends AbstractSelector implements Member  {
    isMember: boolean = true;

    getDefaultHelp(): string {
        return "function procedure property";
    }
    renderAsHtml(): string {
        return `<member class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplay()}</member>`;
    }

    indent(): string {
        return singleIndent();
    }

    getClass(): Class {
        return this.getParent() as Class;
    }

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        var empty = this.text ==="";
        if (empty && (char ==='f')) {
            this.getClass().addFunctionMethodBefore(this);
            return;
        }
        if (empty && (char ==='p')) {
            this.text+=char;
            this.help = "procedure property";
            return;
        }
        if (this.text === "p" && char ==="r") {
            this.text+=char;           
            return;
        }
        if (this.text === "pr" && char ==="o") {
            this.text+=char;           
            return;
        }
        if (this.text === "pro" && char ==="c") {
            this.getClass().addProcedureMethodBefore(this);
            this.text = "";
            return;
        }
        if (this.text === "pro" && char ==="p") {
            this.getClass().addPropertyBefore(this);
            this.text = "";
            return;
        }
        super.processKey(keyEvent);
    }
} 

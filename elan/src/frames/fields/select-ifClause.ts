import { AbstractField } from "./abstract-field";
import { KeyEvent } from "../interfaces/key-event";
import { Else } from "../statements/else";

export class SelectIfClause extends AbstractField {
    private else: Else;

    constructor(holder: Else) {
        super(holder);
        this.else = holder;
        this._help = "Type 'i' to create an if clause for this 'else'";
        this.setPrompt("if...");
        this.setOptional(true);
    }

    getPrefix(): string {
        return 'elif';
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return ``;
    } 

    renderAsHtml(): string {
        return super.renderAsHtml();
    }


    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        var empty = this.text ==="";
        if (empty && (char ==='i')) {
            this.else.setIfExtension(true);
            return;
        }
        super.processKey(keyEvent);
    }
}

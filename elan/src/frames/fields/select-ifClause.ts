import { AbstractField } from "./abstract-field";
import { KeyEvent } from "../interfaces/key-event";
import { Else } from "../statements/else";

export class SelectIfClause extends AbstractField {
    private else: Else;

    constructor(holder: Else) {
        super(holder);
        this.else = holder;
        this.setPrompt("    if");
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
        return this.isSelected() ? super.renderAsHtml() : this.else.isSelected() ? super.renderAsHtml() : ``;
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

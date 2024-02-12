import { AbstractField } from "./abstract-field";
import { KeyEvent } from "../interfaces/key-event";
import { Else } from "../statements/else";

export class IfSelector extends AbstractField {
    private else: Else;

    constructor(holder: Else) {
        super(holder);
        this.else = holder;
        this.setPlaceholder("if");
        this.setOptional(true);
    }

    getIdPrefix(): string {
        return 'elif';
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return ``;
    } 

    processKey(keyEvent: KeyEvent): void {
        var char = keyEvent.key;
        var empty = this.text ==="";
        if (empty && (char ==='i')) {
            this.else.setIfExtension(true);
            this.getHolder().select(true, false);
            return;
        }
        super.processKey(keyEvent);
    }
}

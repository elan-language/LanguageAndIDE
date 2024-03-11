import { AbstractField } from "./abstract-field";
import { editorEvent } from "../interfaces/editor-event";
import { Else } from "../statements/else";
import { CodeSource } from "../code-source";
import { ParseStatus } from "../parse-status";

export class IfSelector extends AbstractField {
    private else: Else;

    constructor(holder: Else) {
        super(holder);
        this.else = holder;
        this.setPlaceholder("if");
        this.setOptional(true);
    }
    parseFrom(source: CodeSource): void {
        throw new Error("Not implemented.");
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        throw new Error("Not implemented.");
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

    processKey(keyEvent: editorEvent): void {
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

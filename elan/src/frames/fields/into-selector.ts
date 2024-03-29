import { AbstractField } from "./abstract-field";
import { editorEvent } from "../interfaces/editor-event";
import { ExternalStatement } from "../statements/external-statement";
import { ParseStatus } from "../parse-status";

export class IntoSelector extends AbstractField {
    private ext: ExternalStatement;

    constructor(holder: ExternalStatement) {
        super(holder);
        this.ext = holder;
        this.setPlaceholder("into");
        this.setOptional(true);
        this.setStatus(ParseStatus.valid);
    }
    getIdPrefix(): string {
        return 'into';
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
            this.ext.setIntoExtension(true);
            this.getHolder().selectLastField();
            return;
        }
        super.processKey(keyEvent);
    }
}

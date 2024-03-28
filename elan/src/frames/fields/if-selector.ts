import { AbstractField } from "./abstract-field";
import { editorEvent } from "../interfaces/editor-event";
import { Else } from "../statements/else";
import { CodeSource } from "../code-source";
import { ParseNode } from "../parse-nodes/parse-node";

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

    processKey(keyEvent: editorEvent): void {
        var char = keyEvent.key;
        var empty = this.text ==="";
        if (empty && (char ==='i')) {
            this.else.setIfExtension(true);
            this.else.getFields()[0].select(true, false); //First field will now be the condition
            return;
        }
        super.processKey(keyEvent);
    }  
    initialiseRoot(): ParseNode | undefined { return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined;
}

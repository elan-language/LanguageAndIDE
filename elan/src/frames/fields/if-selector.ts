import { AbstractField } from "./abstract-field";
import { editorEvent } from "../interfaces/editor-event";
import { Else } from "../statements/else";
import { ParseStatus } from "../parse-status";
import { CodeSource } from "../code-source";
import { ParseNode } from "../parse-nodes/parse-node";
import { Regexes } from "./regexes";

export class IfSelector extends AbstractField {

    protected placeholderIsCode: boolean = true;
    
    initialiseRoot(): ParseNode {
        throw new Error("Method not implemented.");
    }
    readToDelimeter: (source: CodeSource) => string = (source: CodeSource) => "";

    parseFrom(source: CodeSource): void {
        if (source.isMatchRegEx(Regexes.ifClause)) {
            source.remove("if ");
            this.else.setIfExtension(true);
        }
    }


    private else: Else;

    constructor(holder: Else) {
        super(holder);
        this.else = holder;
        this.setPlaceholder("if");
        this.setOptional(true);
        this.setStatus(ParseStatus.valid);
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
        if (empty && (char ==="i")) {
            this.else.setIfExtension(true);
            this.else.getFields()[0].select(true, false); //First field will now be the condition
            return;
        }
        super.processKey(keyEvent);
    }  
}

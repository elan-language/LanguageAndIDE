import { AbstractField } from "./abstract-field";
import { editorEvent } from "../interfaces/editor-event";
import { CodeStatus } from "../code-status";
import { CodeSource } from "../code-source";
import { ParseNode } from "../parse-nodes/parse-node";
import { Regexes } from "./regexes";
import { ExternalStatement } from "../statements/external-statement";

export class IntoSelector extends AbstractField {

    protected placeholderIsCode: boolean = true;
    private ext: ExternalStatement;

    constructor(holder: ExternalStatement) {
        super(holder);
        this.ext = holder;
        this.setPlaceholder("into");
        this.setOptional(true);
        this.setParseStatus(CodeStatus.valid);
        this.help = `Type 'i' put the result of the external method call into a pre-defined variable of a Type able to accept the result.`;
    }
    
    initialiseRoot(): ParseNode {
        throw new Error("Method not implemented.");
    }
    readToDelimeter: (source: CodeSource) => string = (source: CodeSource) => "";

    parseFrom(source: CodeSource): void {
        if (source.isMatchRegEx(Regexes.intoClause)) {
            source.remove("into ");
            this.ext.setIntoExtension(true);
        }
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
        if (empty && (char ==="i")) {
            this.ext.setIntoExtension(true);
            this.ext.assignable.select();
            return;
        }
        super.processKey(keyEvent);
    }  
}

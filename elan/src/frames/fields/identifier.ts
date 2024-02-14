import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParsingStatus } from "../parsing-status";
import { AbstractField } from "./abstract-field";

export class Identifier extends AbstractField {   
    protected regx: RegExp = /^[a-z]\w*/;
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    parse(source: CodeSource): void {
        var expr = source.removeRegEx(this.regx);
        this.text = expr;
    }
    getIdPrefix(): string {
        return 'ident';
    }
    status(): ParsingStatus {
        if (this.text === ``) {
            return ParsingStatus.incomplete;
        } else {
            return this.regx.test(this.text)? ParsingStatus.valid : ParsingStatus.invalid;
        }
    }
}
import { Frame } from "../interfaces/frame";
import { editorEvent } from "../interfaces/editor-event";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { optional, genericString } from "./parse-functions";
import { ParseByFunction } from "../interfaces/parse-by-function";

export class OptionalKeyword extends AbstractField implements ParseByFunction {
    isParseByFunction = true;
    private optionalKeyword = true;
    private keyword: string;

    constructor(holder: Frame, keyword: string) {
        super(holder);
        this.setOptional(true);
        this.keyword = keyword;
        this.placeholder = keyword;
    }

    isSpecified(): boolean {
        return this.text === this.keyword;
    }

    specify(): void {
        this.text = this.keyword;
        this.alertHolderToUpdate();
    }

    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        var kw = (input: [ParseStatus, string]) => genericString(input, this.keyword);
       return optional(input, kw);
    }

    processKey(e: editorEvent): void {
        var key = e.key;
        if (key && key.length ===1 && this.keyword.startsWith(key.toLowerCase())) {
            this.text = this.keyword;
            this.alertHolderToUpdate();
            this.getHolder().selectFieldAfter(this);
        } else if (key === "Delete" || key === "Backspace") {
            this.text = "";
            this.alertHolderToUpdate();
            this.getHolder().selectFieldAfter(this);
        } else {
            super.processKey(e);
        }
    }

    public textAsHtml(): string {
        if (this.selected) {
            return super.textAsHtml();
        }
        else{ 
            var c = this.isSpecified() ? `<keyword> ${this.text}</keyword>` : ``;
            return c;
        } 
    }
}
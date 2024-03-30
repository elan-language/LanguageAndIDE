import { Frame } from "../interfaces/frame";
import { editorEvent } from "../interfaces/editor-event";
import { AbstractField } from "./abstract-field";
import { ParseByNodes } from "../interfaces/parse-by-nodes";
import { CodeSource } from "../code-source";
import { ParseNode } from "../parse-nodes/parse-node";
import { OptionalNode } from "../parse-nodes/optional-node";
import { KeywordNode } from "../parse-nodes/keyword-node";

export class OptionalKeyword extends AbstractField implements ParseByNodes {
    isParseByNodes = true;
    private optionalKeyword = true;
    private keyword: string;

    constructor(holder: Frame, keyword: string) {
        super(holder);
        this.setOptional(true);
        this.keyword = keyword;
        this.placeholder = keyword;
    }

    initialiseRoot(): ParseNode {
        var kw = () => new KeywordNode(this.keyword, this);
        this.rootNode = new OptionalNode(kw,this);
        return this.rootNode;
    }
    readToDelimeter: (source: CodeSource) => string = (source: CodeSource) => source.readMatching(/[^\S\r\n]*[a-z]*/);

    keywordExists(): boolean {
        return this.text.trim() === this.keyword;
    }

    specify(): void {
        this.text = this.keyword;
        this.alertHolderToUpdate();
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
            var c = this.keywordExists() ? `<keyword> ${this.text}</keyword>` : ``;
            return c;
        } 
    }
}
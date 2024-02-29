import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { Comment } from "../fields/comment";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { GlobalSelector } from "./global-selector";

export class GlobalComment extends AbstractFrame {
    isGlobal = true;
    public text: Comment;

    constructor(parent: Parent) {
        super(parent);
        this.text = new Comment(this);
    }

    getFields(): Field[] {
        return [this.text];
    }

    getIdPrefix(): string {
        return 'com';
    }
    renderAsHtml(): string {
        return `<global><comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top># ${this.text.renderAsHtml()}</top></comment></global>`;
    }

    indent(): string {
        return "";
    }
    renderAsSource(): string {
        return `# ${this.text.renderAsSource()}`;
    }
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("# ");
        this.text.parseFrom(source);
        source.removeNewLine();
    }
    getSelectorToInsertAboveBelow(): AbstractSelector {
        return new GlobalSelector(this.getParent());
    }
} 
import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { CommentField } from "../fields/comment-field";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { GlobalSelector } from "./global-selector";
import { File } from "../interfaces/file";

export class GlobalComment extends AbstractFrame {
    isGlobal = true;
    public text: CommentField;
    file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
        this.text = new CommentField(this);
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

    compile(): string {
        this.compileErrors = [];
        return "";
    }

    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("# ");
        this.text.parseFrom(source);
        source.removeNewLine();
    }
} 
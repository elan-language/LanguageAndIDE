import { Identifier } from "../fields/identifier";
import { AbstractFrame } from "../abstract-frame";
import { File} from "../interfaces/file";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Literal } from "../fields/literal";
import { PlainText } from "../fields/plain-text";
import { AbstractSelector } from "../abstract-selector";
import { GlobalSelector } from "./global-selector";

export class Constant extends AbstractFrame {
    isGlobal = true;
    name: Identifier;
    literal: Literal;
    file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
        this.name  = new Identifier(this);
        this.literal = new PlainText(this); //TODO: temp kludge - should be a literal value or data structure
        this.literal.setPlaceholder("literal value or data structure");
    }

    parseFrom(source: CodeSource): void {
        source.remove("constant ");
        this.name.parseFrom(source);
        source.remove(" set to ");
        this.literal.parseFrom(source);
    }

    getFields(): Field[] {
        return [this.name, this.literal];
    }

    getIdPrefix(): string {
        return 'const';
    }
    renderAsHtml(): string {
        return `<constant class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>constant </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.literal.renderAsHtml()}</constant>`;
    }

    indent(): string {
        return "";
    }
    renderAsSource(): string {
        return `constant ${this.name.renderAsSource()} set to ${this.literal.renderAsSource()}\r
`;
    }
    insertSelector(after: boolean): void {
        this.file.insertSelector(after, this);
    }
} 

import { Identifier } from "../fields/identifier";
import { AbstractFrame } from "../abstract-frame";
import { File} from "../interfaces/file";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { LiteralField } from "../fields/literal-field";
import { ISymbol } from "../../symbols/symbol";

export class Constant extends AbstractFrame implements ISymbol {
    isGlobal = true;
    name: Identifier;
    literal: LiteralField;
    file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
        this.name  = new Identifier(this);
        this.literal = new LiteralField(this); 
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

    renderAsObjectCode(): string {
        return `const ${this.name.renderAsObjectCode()} = ${this.literal.renderAsObjectCode()};\r
`;
    }

    get symbolId() {
        return this.name.renderAsSource();
    }

    get symbolType() {
        return this.literal.symbolType;
    }
} 

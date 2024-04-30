import { IdentifierField } from "../fields/identifier-field";
import { AbstractFrame } from "../abstract-frame";
import { File} from "../interfaces/file";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ConstantValueField } from "../fields/constant-value-field";
import { ISymbol } from "../../symbols/symbol";
import { ScratchPad } from "../scratch-pad";
import { constantKeyword } from "../keywords";

export class Constant extends AbstractFrame implements ISymbol {
    isGlobal = true;
    name: IdentifierField;
    literal: ConstantValueField;
    file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
        this.name  = new IdentifierField(this);
        this.literal = new ConstantValueField(this); 
        this.literal.setPlaceholder("literal value or data structure");
    }
    initialKeywords(): string {
        return constantKeyword;
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

    compile(): string {
        this.compileErrors = [];
        return `const ${this.name.compile()} = ${this.literal.compile()};\r
`;
    }

    get symbolId() {
        return this.name.renderAsSource();
    }
} 

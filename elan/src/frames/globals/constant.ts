import { IdentifierField } from "../fields/identifier-field";
import { AbstractFrame } from "../abstract-frame";
import { File} from "../interfaces/file";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ConstantValueField } from "../fields/constant-value-field";
import { ISymbol } from "../symbols/symbol";
import { constantKeyword } from "../keywords";
import { Frame } from "../interfaces/frame";
import { GlobalFrame } from "../interfaces/global-frame";
import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "../symbols/symbol-scope";

export class Constant extends AbstractFrame implements ISymbol, GlobalFrame {
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
        return `<constant class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>constant </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.literal.renderAsHtml()}${this.compileMsgAsHtml()}</constant>`;
    }

    indent(): string {
        return "";
    }
    renderAsSource(): string {
        return `constant ${this.name.renderAsSource()} set to ${this.literal.renderAsSource()}\r
`;
    }

    compile(transforms: Transforms): string {
        this.compileErrors = [];
        return `const ${this.name.compile(transforms)} = ${this.literal.compile(transforms)};\r
`;
    }

    get symbolId() {
        return this.name.renderAsSource();
    }

    symbolType(transforms : Transforms) {
        return this.literal.symbolType(transforms);
    }

    symbolScope = SymbolScope.program;

    resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ISymbol {
        if (id === this.symbolId) {
            return this;
        }

        return super.resolveSymbol(id, transforms, initialScope);
    }
} 

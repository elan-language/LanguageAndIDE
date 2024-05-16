import { Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Statement } from "../interfaces/statement";
import { IdentifierField } from "../fields/identifier-field";
import { inputKeyword } from "../keywords";
import { Frame } from "../interfaces/frame";
import { ISymbol } from "../interfaces/symbol";
import { StringType } from "../symbols/string-type";
import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "../symbols/symbol-scope";

export class Input extends AbstractFrame implements Statement, ISymbol {
    isStatement = true;  
    varName: IdentifierField;

    constructor(parent: Parent) {
        super(parent);
        this.varName = new IdentifierField(this);
        this.varName.setPlaceholder("variable name");
    }
    initialKeywords(): string {
        return inputKeyword;
    }
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("input ");
        this.varName.parseFrom(source);
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.varName];
    }
    getIdPrefix(): string {
        return 'input';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>input </keyword>${this.varName.renderAsHtml()}${this.compileMsgAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}input ${this.varName.renderAsSource()}`;
    }

    compile(transforms: Transforms): string {
        this.compileErrors = [];
        return `${this.indent()}var ${this.varName.compile(transforms)} = await system.input();`;
    }

    get symbolId() {
        return this.varName.renderAsSource();
    }

    symbolType(transforms: Transforms) {
        return StringType.Instance;
    }

    symbolScope = SymbolScope.local;

    resolveSymbol(id: string | undefined, transforms: Transforms, initialScope: Frame): ISymbol {
        if (id === this.symbolId) {
            return this;
        }

        return super.resolveSymbol(id, transforms, initialScope);
    }
} 

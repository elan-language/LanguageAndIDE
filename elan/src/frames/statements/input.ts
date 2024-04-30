import { ExpressionField } from "../fields/expression-field";
import { Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";

import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Statement } from "../interfaces/statement";
import { IdentifierField } from "../fields/identifier-field";
import { inputKeyword } from "../keywords";

export class Input extends AbstractFrame implements Statement {
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
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>input </keyword>${this.varName.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}input ${this.varName.renderAsSource()}`;
    }

    compile(): string {
        this.compileErrors = [];
        return `${this.indent()}var ${this.varName.compile()} = await system.input();`;
    }
} 

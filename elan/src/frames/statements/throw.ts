import { ExceptionMessage } from "../fields/exception-message";
import { Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Statement } from "../interfaces/statement";

export class Throw extends AbstractFrame implements Statement{
    isStatement = true;
    text: ExceptionMessage;

    constructor(parent: Parent) {
        super(parent);
        this.text = new ExceptionMessage(this);
    }
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("throw ");
        this.text.parseFrom(source);
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.text];
    }    
    getIdPrefix(): string {
        return 'throw';
    }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>throw </keyword>${this.text.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}throw ${this.text.renderAsSource()}`;
    }

    compile(): string {
        return `${this.indent()}throw new Error(${this.text.compile()});`;
    }
} 

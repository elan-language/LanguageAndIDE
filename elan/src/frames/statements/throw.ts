import { ExceptionMessage } from "../fields/exception-message";
import { Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";

export class Throw extends AbstractFrame  {
    isStatement = true;
    text: ExceptionMessage;

    constructor(parent: Parent) {
        super(parent);
        this.text = new ExceptionMessage(this);
    }
    parseFromSource(source: CodeSource): void {
        source.removeIndent();
        source.remove("throw ");
        this.text.parseFromSource(source);
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.text];
    }    
    getIdPrefix(): string {
        return 'throw';
    }
    public override selectFirstField(): boolean {
        this.text.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>throw </keyword>${this.text.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}throw ${this.text.renderAsSource()}`;
    }
} 

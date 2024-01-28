import { Statement } from "./statement";
import { PlainText } from "../text-fields/plain_text";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class StatementSelector extends AbstractFrame implements Statement {  
    text: PlainText;
    isStatement = true;

    constructor(parent: Frame) {
        super(parent);
        this.text = new PlainText(this);
        this.text.setPrompt("statement");
    }

    getPrefix(): string {
        return 'statementSelect';
    }

    public override selectFirstText(): boolean {
        this.text.select(true);
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}`;
    }
} 

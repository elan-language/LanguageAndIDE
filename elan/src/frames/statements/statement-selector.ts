import { Statement } from "./statement";
import { PlainText } from "../text-fields/plain_text";
import { AbstractFrame } from "../abstract-frame";

export class StatementSelector extends AbstractFrame implements Statement {
    text: PlainText = new PlainText("statement");

    constructor() {
        super();
        this.htmlId = `statementSelect${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</statement>`;
    }
} 

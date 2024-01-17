import { Statement } from "./statement";
import { nextId } from "../helpers";
import { PlainText } from "../text-entry-fields/plain_text";

export class StatementSelector implements Statement {
    htmlId: string = "";
    text: PlainText = new PlainText("statement");

    constructor() {
        this.htmlId = `statementSelect${nextId()}`;
    }

    private cls() : string {
        return "";
    };

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</statement>`;
    }
} 

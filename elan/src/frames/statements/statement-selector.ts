import { Statement } from "./statement";
import { nextId } from "../helpers";
import { PlainText } from "../text-entry-fields/plain_text";

export class StatementSelector implements Statement {
    htmlId: string = "";
    text: PlainText = new PlainText("statement");

    constructor() {
        this.htmlId = `statementSelect${nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement id='${this.htmlId}' tabindex="0"><keyword><text>${this.text.renderAsHtml()}</text></keyword></statement>`;
    }
} 

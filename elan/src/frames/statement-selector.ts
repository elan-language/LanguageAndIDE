import { Statement } from "./statement";
import { nextId } from "./helpers";
import { TextEntry } from "./textEntry";
import { Identifier } from "./identifier";
import { Expression } from "./expression";
import { RawText } from "./raw-text";

export class StatementSelector implements Statement {
    htmlId: string = "";
    text: TextEntry = new RawText("statement");

    constructor() {
        this.htmlId = `statementSelect${nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement id='${this.htmlId}' tabindex="0"><keyword><textEntry>${this.text.renderAsHtml()}</textEntry></keyword></statement>`;
    }
} 

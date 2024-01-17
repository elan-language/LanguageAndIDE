import { Statement } from "./statement";
import { nextId } from "../helpers";
import { PlainText } from "../text-entries/plainText";

export class StatementSelector implements Statement {
    htmlId: string = "";
    text: PlainText = new PlainText("statement");

    constructor() {
        this.htmlId = `statementSelect${nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement id='${this.htmlId}' tabindex="0"><keyword><textEntry>${this.text.renderAsHtml()}</textEntry></keyword></statement>`;
    }
} 

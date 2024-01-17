import { Statement } from "./statement";
import { nextId } from "../helpers";
import { PlainText } from "../text-entry-fields/plain_text";
import { ExceptionMessage } from "../text-entry-fields/exception-message";

export class Throw implements Statement {
    htmlId: string = "";
    text: ExceptionMessage = new ExceptionMessage();

    constructor() {
        this.htmlId = `throw${nextId()}`;
    }

    private cls() : string {
        return "";
    };

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>throw </keyword>${this.text.renderAsHtml()}</statement>`;
    }
} 

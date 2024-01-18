import { Statement } from "./statement";
import { nextId } from "../helpers";
import { ExceptionMessage } from "../text-entry/exception-message";

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

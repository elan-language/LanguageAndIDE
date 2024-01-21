import { Statement } from "./statement";
import { ExceptionMessage } from "../text-fields/exception-message";
import { AbstractFrame } from "../abstract-frame";

export class Throw extends AbstractFrame implements Statement {
    text: ExceptionMessage = new ExceptionMessage();

    constructor() {
        super();
        this.htmlId = `throw${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>throw </keyword>${this.text.renderAsHtml()}</statement>`;
    }
} 

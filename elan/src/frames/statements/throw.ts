import { Statement } from "./statement";
import { ExceptionMessage } from "../text-fields/exception-message";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class Throw extends AbstractFrame implements Statement {
    isStatement = true;
    text: ExceptionMessage;

    constructor(parent: Frame) {
        super(parent);
        this.text = new ExceptionMessage(this);
    }
    getPrefix(): string {
        return 'throw';
    }

    public override selectFirstText(): boolean {
        this.text.select(true);
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>throw </keyword>${this.text.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}throw ${this.text.renderAsSource()}`;
    }
} 

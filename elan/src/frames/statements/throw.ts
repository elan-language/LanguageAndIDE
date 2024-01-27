import { Statement } from "./statement";
import { ExceptionMessage } from "../text-fields/exception-message";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class Throw extends AbstractFrame implements Statement {
    getPrefix(): string {
        return 'throw';
    }
    
    text: ExceptionMessage;

    constructor(parent: Frame) {
        super(parent);
        this.text = new ExceptionMessage(this);
    }

    public override selectFirstText(): boolean {
        this.text.select(true);
        return true;
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>throw </keyword>${this.text.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}throw ${this.text.renderAsSource()}`;
    }
} 

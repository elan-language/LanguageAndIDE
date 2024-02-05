import { ExceptionMessage } from "../fields/exception-message";
import {ParentFrame} from "../interfaces/parent-frame";
import { AbstractFrame} from "../abstract-frame";
import { Statement } from "../interfaces/statement";

export class Throw extends AbstractFrame implements Statement {
    isStatement = true;
    text: ExceptionMessage;

    constructor(parent: ParentFrame) {
        super(parent);
        this.text = new ExceptionMessage(this);
    }
    
    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
    }
    
    getPrefix(): string {
        return 'throw';
    }

    public override selectFirstText(): boolean {
        this.text.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>throw </keyword>${this.text.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}throw ${this.text.renderAsSource()}`;
    }
} 

import { Statement } from "./statement";
import { ExceptionMessage } from "../text-fields/exception-message";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class Throw extends AbstractFrame implements Statement {
    text: ExceptionMessage = new ExceptionMessage();

    constructor() {
        super();
        this.htmlId = `throw${this.nextId()}`;
    }

    
    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.text.initialize(frameMap, this);
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

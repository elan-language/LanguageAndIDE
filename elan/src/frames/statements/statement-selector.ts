import { Statement } from "./statement";
import { PlainText } from "../text-fields/plain_text";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class StatementSelector extends AbstractFrame implements Statement {
    text: PlainText = new PlainText("statement");

    constructor() {
        super();
        this.htmlId = `statementSelect${this.nextId()}`;
    }


    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.text.initialize(frameMap, this);
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</statement>`;
    }
} 

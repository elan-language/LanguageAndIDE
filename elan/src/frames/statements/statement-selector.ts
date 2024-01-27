import { Statement } from "./statement";
import { PlainText } from "../text-fields/plain_text";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class StatementSelector extends AbstractFrame implements Statement {
    text: PlainText;

    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `statementSelect${this.nextId()}`;
        this.text = new PlainText(this);
        this.text.setPrompt("statement");
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
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}`;
    }
} 

import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class Print extends AbstractFrame implements Statement {
    expr: Expression;

    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `print${this.nextId()}`;
        this.expr = new Expression(this);
        this.expr.setPrompt("expression");
    }

    
    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.expr.initialize(frameMap, this);
    }

    public override selectFirstText(): boolean {
        this.expr.select(true);
        return true;
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>print </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}print ${this.expr.renderAsSource()}`;
    }
} 

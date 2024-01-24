import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class ReturnStatement extends AbstractFrame implements Statement {
    expr: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `return${this.nextId()}`;
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
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>return </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}return ${this.expr.renderAsSource()}`;
    }
} 

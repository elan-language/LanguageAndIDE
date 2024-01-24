import { Statement } from "./statement";
import { Identifier } from "../text-fields/identifier";
import { Expression } from "../text-fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class SetStatement extends AbstractFrame implements Statement {
    name: Identifier = new Identifier("variableName");
    expr: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `set${this.nextId()}`;
    }
    

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.name.initialize(frameMap, this);
        this.expr.initialize(frameMap, this);
    }

    public override selectFirstText(): boolean {
        this.name.select();
        return true;
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.name.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}set ${this.name.renderAsSource()} to ${this.expr.renderAsSource()}`;
    }
} 

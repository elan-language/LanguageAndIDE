
import { Identifier } from "../text-fields/identifier";
import { Expression } from "../text-fields/expression";
import { Global } from "./global";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class Constant extends AbstractFrame implements Global {

    name: Identifier = new Identifier("name");
    expr: Expression = new Expression("literal value");

    constructor() {
        super();
        this.htmlId = `const${this.nextId()}`;
    }

    isGlobal = true;

    public override selectFirstText(): boolean {
        this.name.select();
        return true;
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.name.initialize(frameMap, this);
        this.expr.initialize(frameMap, this);
    }

    renderAsHtml(): string {
        return `<constant class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>constant </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.expr.renderAsHtml()}</constant>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return `constant ${this.name.renderAsSource()} set to ${this.expr.renderAsSource()}\r
`;
    }
} 

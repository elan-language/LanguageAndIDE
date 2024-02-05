import { Identifier } from "../fields/identifier";
import { ArgList } from "../fields/arg-list";
import { ParentFrame } from "../interfaces/parent-frame";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";

export class Call extends AbstractFrame implements Statement {
    isStatement = true;
    proc: Identifier;
    args: ArgList;

    constructor(parent: ParentFrame) {
        super(parent);
        this.proc = new Identifier(this);
        this.proc.setPrompt("procedureName");
        this.args = new ArgList(this);
    }

    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
    }

    public override selectFirstText(): boolean {
        this.proc.select();
        return true;
    }

    getPrefix(): string {
        return 'call';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><top><keyword>call </keyword>${this.proc.renderAsHtml()}(${this.args.renderAsHtml()})</top></statement>`;
    }
   
    renderAsSource(): string {
        return `${this.indent()}call ${this.proc.renderAsSource()}(${this.args.renderAsSource()})`;
    }
} 

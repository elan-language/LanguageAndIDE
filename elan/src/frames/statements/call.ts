import { Statement } from "./statement";
import { Identifier } from "../text-fields/identifier";
import { ArgList } from "../text-fields/arg-list";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class Call extends AbstractFrame implements Statement {
    proc: Identifier;
    args: ArgList;

    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `call${this.nextId()}`;
        this.proc = new Identifier(this);
        this.proc.setPrompt("procedureName");
        this.args = new ArgList(this);
    }

    public override selectFirstText(): boolean {
        this.proc.select(true);
        return true;
    }

    isStatement = true;

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.proc.initialize(frameMap, this);
        this.args.initialize(frameMap, this);
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>call </keyword>${this.proc.renderAsHtml()}(${this.args.renderAsHtml()})</statement>`;
    }
   
    renderAsSource(): string {
        return `${this.indent()}call ${this.proc.renderAsSource()}(${this.args.renderAsSource()})`;
    }
} 

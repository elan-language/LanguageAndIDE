import { Identifier } from "../fields/identifier";
import { ArgList } from "../fields/arg-list";
import { ParentFrame } from "../interfaces/parent-frame";
import { SingleLineStatement } from "../single-line-statement";

export class Call extends SingleLineStatement {
    isStatement = true;
    proc: Identifier;
    args: ArgList;

    constructor(parent: ParentFrame) {
        super(parent);
        this.proc = new Identifier(this);
        this.proc.setPrompt("procedureName");
        this.args = new ArgList(this);
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

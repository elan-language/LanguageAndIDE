import { Statement } from "./statement";
import { Identifier } from "../text-entry/identifier";
import { ArgList } from "../text-entry/arg-list";
import { AbstractFrame } from "../abstract-frame";

export class Call extends AbstractFrame implements Statement {
    proc: Identifier = new Identifier("procedureName");
    args: ArgList = new ArgList();

    constructor() {
        super();
        this.htmlId = `call${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>call </keyword>${this.proc.renderAsHtml()}(${this.args.renderAsHtml()})</statement>`;
    }
} 

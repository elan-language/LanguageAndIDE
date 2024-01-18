import { Statement } from "./statement";
import { nextId } from "../helpers";
import { Identifier } from "../text-entry/identifier";
import { ArgList } from "../text-entry/arg-list";

export class Call implements Statement {
    htmlId: string = "";
    proc: Identifier = new Identifier("procedureName");
    args: ArgList = new ArgList();

    constructor() {
        this.htmlId = `call${nextId()}`;
    }

    private cls() : string {
        return "";
    };

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>call </keyword>${this.proc.renderAsHtml()}(${this.args.renderAsHtml()})</statement>`;
    }
} 

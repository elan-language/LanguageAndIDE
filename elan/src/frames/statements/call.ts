import { Statement } from "./statement";
import { nextId } from "../helpers";
import { PlainText } from "../text-entry-fields/plain_text";
import { ExceptionMessage } from "../text-entry-fields/exception-message";
import { Identifier } from "../text-entry-fields/identifier";
import { ArgList } from "../text-entry-fields/arg-list";

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

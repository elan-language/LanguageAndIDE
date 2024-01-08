import { Frame } from "./frame";

export class VarFrame implements Frame {
    constructor(private id: string, private expr: string) {

    }
    renderAsHtml(): string {
        return `<div class='frame'><span class='keyword'>var</span> ${this.id} <span class='keyword'>set to</span><span class='string-value'>  ${this.expr} </span></div>`;
    }
}
import { Frame } from "./frame";
import { nextId } from "./frame-factory";

export class VarFrame implements Frame {

    private classes = '';

    constructor(private id: string, private expr: string) {
        this.elementId = nextId();
    }

    private elementId: number;

    public applyClass(id: string, cls: string) {
        this.classes = '';
        if (id === `var${this.elementId}`){
           this.classes = cls;
        }
    }

    renderAsHtml(): string {
        const cls = `frame ${this.classes}`;
        return `<div id='var${this.elementId}' class='${cls}'><span class='keyword'>var</span> ${this.id} <span class='keyword'>set to</span><span class='string-value'>  ${this.expr} </span></div>`;
    }
}
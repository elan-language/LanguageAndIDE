import { Frame } from "./frame";
import { nextId } from "./frame-factory";

export class VarFrame implements Frame {

    private classes = '';

    constructor(private id: string, private expr: string) {
        this.elementId = nextId();
    }

    frameType(key: string): Frame {
        throw new Error("Method not implemented.");
    }
    
    newFrame(): void {
        throw new Error("Method not implemented.");
    }

    private elementId: number;

    public applyClass(id: string, cls: string) {
        this.classes = '';
        if (id === `var${this.elementId}`){
           this.classes = cls;
        }
    }

    renderAsHtml(): string {
        // const cls = `frame ${this.classes}`;
        // return `<div id='var${this.elementId}' class='${cls}'><span class='keyword'>var</span> ${this.id} <span class='keyword'>set to</span><span class='string-value'>  ${this.expr} </span></div>`;
    
        return `<statement class="${this.classes}"><keyword>var</keyword><identifier>a</identifier><keyword>set to</keyword><expression class="">3</expression></statement>`;
    }
}
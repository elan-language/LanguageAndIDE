import { Frame } from "./frame";
import { frameFactory, nextId } from "./frame-factory";
import { MainFrame } from "./main-frame";

export class PendingFrame implements Frame {

    private classes = '';

    constructor() {
        this.elementId = nextId();
    }

    private kw = "main";
    private endkw = "end main";
    private index = 0; 


    frameType(key: string): Frame {
        if (key === this.kw[this.index]) {
            this.index++;
        }
        else if (key === "Tab" && this.index > 0){
            return new MainFrame("");
        }
        if (this.index === this.kw.length){
            return new MainFrame("");
        }

        return this;
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
        if (this.index === 0){
            return `<input type="text">`;
        }
        else {
            // return `<div id='main' class='frame'>
            //         <span class='keyword'>${this.kw.substring(0, this.index)}</span><input type="text" placeholder="${this.kw.substring(this.index)}">
            //         <span class='keyword'>end main</span></div>`;

                    return `<global id='main' class='frame'>
                            <span class='keyword'>${this.kw.substring(0, this.index)}</span><input type="text" placeholder="${this.kw.substring(this.index)}">
                            <statementBlock>
                            </statementBlock>
                            <keyword>end main</keyword>
                            </global>`;
        }
    }
}
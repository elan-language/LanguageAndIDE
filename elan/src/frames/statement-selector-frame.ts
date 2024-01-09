import { Frame } from "./frame";
import { nextId } from "./frame-factory";
import { TextSelectorFrame, TextType } from "./text-selector-frame";
import { VarFrame } from "./var-frame";

export class StatementSelectorFrame implements Frame {

    private classes = '';

    constructor() {
        this.elementId = nextId();
    }

    private kw = "var";
    private index = 0;

    frameType(key: string): Frame {
        if (key === this.kw[this.index]) {
            this.index++;
        }
        
        if ((key === "Tab" && this.index > 0) || (this.index === this.kw.length)) {
            const vf = new VarFrame("", "");
            vf.addFrame(new TextSelectorFrame(TextType.identifier), TextType.identifier);

            return vf;
        }
       

        return this;
    }

    newFrame(): void {
        throw new Error("Method not implemented.");
    }

    private elementId: number;

    public applyClass(id: string, cls: string) {
        this.classes = '';
        if (id === `var${this.elementId}`) {
            this.classes = cls;
        }
    }

    renderAsHtml(): string {
        if (this.index === 0) {
            return `<input type="text">`;
        }
        else {
           
            return `<statement id='var${this.elementId}' class="frame"><span class='keyword'>${this.kw.substring(0, this.index)}</span><input type="text" placeholder="${this.kw.substring(this.index)}"></statement>`;
        }
    }
}
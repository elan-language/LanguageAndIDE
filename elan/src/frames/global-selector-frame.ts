import { Frame } from "./frame";
import { nextId } from "./frame-factory";
import { MainFrame } from "./main-frame";
import { StatementSelectorFrame } from "./statement-selector-frame";

export class GlobalSelectorFrame implements Frame {

    constructor() {
    
    }

    private kw = "main";
    private endkw = "end main";
    private index = 0;

    userInput(key: string): Frame {
        if (key === this.kw[this.index]) {
            this.index++;
        }
        if ((key === "Tab" && this.index > 0) || (this.index === this.kw.length)) {
            const mf = new MainFrame("");
            mf.addFrame(new StatementSelectorFrame()); 
            return mf;
        }

        return this;
    }

    newFrame(): void {
        throw new Error("Method not implemented.");
    }

    public applyClass(id: string, cls: string) {
      
    }

    renderAsHtml(): string {
        if (this.index === 0) {
            return `<input type="text">`;
        }
        else {
            return `<global id='main' class='frame'>
                            <span class='keyword'>${this.kw.substring(0, this.index)}</span><input type="text" placeholder="${this.kw.substring(this.index)}">
                            <statementBlock>
                            </statementBlock>
                            <keyword>end main</keyword>
                            </global>`;
        }
    }
}
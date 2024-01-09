import { Frame } from "./frame";
import { frameFactory } from "./frame-factory";

export class MainFrame implements Frame{

    private frames : Array<Frame> = new Array<Frame>();

    private classes = '';

    constructor(code : string) {
        while (code.length > 0){
            const [f, c] = frameFactory(code);
 
            this.frames.push(f);
            code = c;
         }
    }
    frameType(key: string): Frame {
        throw new Error("Method not implemented.");
    }
    newFrame(): void {
        throw new Error("Method not implemented.");
    }

    public applyClass(id: string, cls: string) {
        this.classes = '';
        if (id === "main"){
           this.classes = cls;
        }

        for (var frame of this.frames) {
            frame.applyClass(id, cls);
        }
    }

    public renderAsHtml() {
        const ss: Array<string> = [];

        for (var frame of this.frames) {
            ss.push(frame.renderAsHtml());
        }

        const statements = ss.join("\n");
        const cls = `frame ${this.classes}`;

    //     return `
    //   <div id='main' class='${cls}'><span class='keyword'>main</span>
    //   ${statements}<span class='keyword'>end main</span></div>`;

    return `
      <global id='main' class='${cls}'>
        <keyword>main</keyword>
        <statementBlock>
        ${statements}
        </statementBlock>
        <keyword>end main</keyword>
      </global>`;
    }
}
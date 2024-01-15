import { Frame } from "./frame";
import { frameFactory } from "./frame-factory";
import { StatementSelectorFrame } from "./statement-selector-frame";

export class MainFrame implements Frame {

    private frames: Array<Frame> = new Array<Frame>();

    private classes = '';

    public htmlId = "main";

    constructor(code?: string) {
        while (code && code.length > 0) {
            const [f, c] = frameFactory(code);

            this.frames.push(f);
            code = c;
        }
    }
    clearSelector(): void {
        for (var frame of this.frames) {
            if (frame instanceof StatementSelectorFrame){
                const index = this.frames.indexOf(frame);
                const before = this.frames.slice(0, index);
                const after = this.frames.slice(index + 1);
                this.frames = [...before, ...after];
            }
        }
        for (var frame of this.frames) {
          frame.clearSelector();
        }
    }

    addFrame(frame : Frame){
        this.frames.push(frame);
    }

    userInput(key: string): Frame {
        for (var frame of this.frames){
            if (frame instanceof StatementSelectorFrame){
                const nf = frame.userInput(key);
                const index = this.frames.indexOf(frame);
                this.frames[index] = nf;
                return this;
            }
        }

        for (var frame of this.frames){
            frame.userInput(key);
        }

        return this;
    }

    newFrame(id? : string): void {
        if (id === "main"){
            var nf = new StatementSelectorFrame();
            this.frames.unshift(nf);
        }
        else {
            for (var frame of this.frames) {
                if (frame.htmlId === id) {
                    var nf = new StatementSelectorFrame();
                    const index = this.frames.indexOf(frame) + 1;
                    const before = this.frames.slice(0, index);
                    const after = this.frames.slice(index);
                    this.frames = [...before, nf, ...after];
                    return;
                }
            }
            for (var frame of this.frames) {
                frame.newFrame(id);
            }
        }
    }

    public select(id: string, cls: string) {
        this.classes = '';
        if (id === "main") {
            this.classes = cls;
        }

        for (var frame of this.frames) {
            frame.select(id, cls);
        }
    }

    public renderAsHtml() {
        const ss: Array<string> = [];

        for (var frame of this.frames) {
            ss.push(frame.renderAsHtml());
        }

        const statements = ss.join("\n");
        const cls = `frame ${this.classes}`;

        return `<global id='main' class='${cls}' tabindex="0">
<keyword>main</keyword>
<statementBlock>
${statements}
</statementBlock>
<keyword>end main</keyword>
</global>`;
    }
}
import { Frame } from "./frame";
import { frameFactory } from "./frame-factory";
import { StatementSelectorFrame } from "./statement-selector-frame";

export class MainFrame implements Frame {

    private frames: Array<Frame> = new Array<Frame>();

    private classes = '';

    constructor(code: string) {
        while (code.length > 0) {
            const [f, c] = frameFactory(code);

            this.frames.push(f);
            code = c;
        }
    }

    addFrame(frame : Frame){
        this.frames.push(frame);
    }

    frameType(key: string): Frame {
        var lastFrame = this.frames[this.frames.length -1];
        if (lastFrame instanceof StatementSelectorFrame){
            const nf = lastFrame.frameType(key);
            this.frames.pop();
            this.frames.push(nf);
        }
        lastFrame.frameType(key);
        return this;
    }

    newFrame(): void {
        throw new Error("Method not implemented.");
    }

    public applyClass(id: string, cls: string) {
        this.classes = '';
        if (id === "main") {
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

        return `<global id='main' class='${cls}'>
                    <keyword>main</keyword>
                    <statementBlock>
                    ${statements}
                    </statementBlock>
                    <keyword>end main</keyword>
                </global>`;
    }
}
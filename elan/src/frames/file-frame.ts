import { Frame } from "./frame";
import { frameFactory } from "./frame-factory";
import { GlobalSelectorFrame } from "./global-selector-frame";

export class FileFrame implements Frame {

    private frames: Array<Frame> = new Array<Frame>();

    public htmlId = "file";

    // to do hash 

    constructor(code: string) {
        var nl = code.indexOf("\n");
        var restOfCode = code.substring(nl + 1);

        while (restOfCode.length > 0) {
            const [f, c] = frameFactory(restOfCode);

            this.frames.push(f);
            restOfCode = c;
        }
    }
    clearSelector(): void {
        for (var frame of this.frames) {
            if (frame instanceof GlobalSelectorFrame){
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

    userInput(key: string): Frame {
        var lastFrame = this.frames[this.frames.length -1];
        if (lastFrame instanceof GlobalSelectorFrame){
            const nf = lastFrame.userInput(key);
            this.frames.pop();
            this.frames.push(nf);
            return this;
        }
        else {
            lastFrame.userInput(key);
        }
        return this;
    }

    newFrame(id?: string): void {
        if (!id) {
            var pf = new GlobalSelectorFrame();
            this.frames.push(pf);
        }
        else {
            for (var frame of this.frames) {
                frame.newFrame(id);
            }
        }
    }

    public select(id: string, cls: string) {
        for (var frame of this.frames) {
            frame.select(id, cls);
        }
    }
  
    public renderAsHtml() {
        const ss: Array<string> = [];

        for (var frame of this.frames) {
            ss.push(frame.renderAsHtml());
        }

        const body = ss.join("\n");

        return `<div class='header'># Elan v0.1</div>\r\n${body}`;
    }
}
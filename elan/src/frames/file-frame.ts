import { Frame } from "./frame";
import { frameFactory } from "./frame-factory";

export class FileFrame implements Frame {

    private frames: Array<Frame> = new Array<Frame>();

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

    public renderAsHtml() {
        const ss: Array<string> = [];

        for (var frame of this.frames) {
            ss.push(frame.renderAsHtml());
        }

        const body = ss.join("\n");

        return `<div class='header'># Elan v0.1</div>
        ${body}`;
    }
}
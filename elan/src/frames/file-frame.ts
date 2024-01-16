import { Frame } from "./frame";

export class FileFrame implements Frame {

    private frames: Array<Frame> = new Array<Frame>();

    public htmlId = "file";

    // to do hash 

    constructor(code?: string) {
    }

     public renderAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.frames) {
            ss.push(frame.renderAsHtml());
        }
        const globals = ss.join("\n");
        return `<comment># Elan v0.1</comment>\r\n${globals}`;
    }

    public AddChild(g : Frame) {
        this.frames.push(g);
    }
}
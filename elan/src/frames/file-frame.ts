import { Frame } from "./frame";

export class FileFrame implements Frame {

    private frames: Array<Frame> = new Array<Frame>();

    public htmlId = "file";

    // to do hash 

    constructor(code?: string) {
    }

     public renderAsHtml() {
        return `<comment># Elan v0.1</comment>`;
    }
}
import { Frame } from "./frame";
import { Global } from "./globals/global";
import { resetId } from "./helpers";

export class FileFrame implements Frame {

    private globals: Array<Global> = new Array<Global>();

    public htmlId = "file";

    constructor() {
        resetId();
    }

     public renderAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.globals) {
            ss.push(frame.renderAsHtml());
        }
        const globals = ss.join("\n");
        return `<header># Elan v0.1</header>\r\n${globals}`;
    }

    public addGlobal(g : Global) {
        this.globals.push(g);
    }
}
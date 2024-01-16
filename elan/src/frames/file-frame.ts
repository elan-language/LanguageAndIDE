import { Frame } from "./frame";
import { Global } from "./global";

export class FileFrame implements Frame {

    private globals: Array<Global> = new Array<Global>();

    public htmlId = "file";

     public renderAsHtml() : string {
        const ss: Array<string> = [];
        for (var frame of this.globals) {
            ss.push(frame.renderAsHtml());
        }
        const globals = ss.join("\n");
        return `<global><comment># Elan v0.1</comment></global>\r\n${globals}`;
    }

    public addGlobal(g : Global) {
        this.globals.push(g);
    }
}
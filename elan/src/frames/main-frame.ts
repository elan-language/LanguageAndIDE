import { Frame } from "./frame";
import { nextId } from "./helpers";


export class MainFrame implements Frame {

    private frames: Array<Frame> = new Array<Frame>();
    public htmlId : string ="";
    private classes = '';

    constructor() {
        this.htmlId = `main${nextId()}`;
    }

    public renderAsHtml() {
        return `<global id='${this.htmlId}' tabindex="0">
<keyword>main</keyword>
<keyword>end main</keyword>
</global>`;
    }
}
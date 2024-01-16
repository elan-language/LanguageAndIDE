import { Frame } from "./frame";
import { GlobalFrame } from "./global";
import { nextId } from "./helpers";


export class MainFrame implements GlobalFrame {

    private frames: Array<Frame> = new Array<Frame>();
    public htmlId : string ="";
   

    constructor() {
        this.htmlId = `main${nextId()}`;
    }

    public renderAsHtml() : string {
        return `<global id='${this.htmlId}' tabindex="0">
<keyword>main</keyword>
<keyword>end main</keyword>
</global>`;
    }
}
import { Frame } from "./frame";
import { frameFactory } from "./frame-factory";

export class MainFrame implements Frame{

    private frames : Array<Frame> = new Array<Frame>();

    constructor(code : string) {
        while (code.length > 0){
            const [f, c] = frameFactory(code);
 
            this.frames.push(f);
            code = c;
         }
    }

    public renderAsHtml() {
        const ss: Array<string> = [];

        for (var frame of this.frames) {
            ss.push(frame.renderAsHtml());
        }

        const statements = ss.join("\n");

        return `
      <div class='frame'><span class='keyword'>main</span>
      ${statements}<span class='keyword'>end main</span></div>`;

    }
}
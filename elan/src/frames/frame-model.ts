import { Frame } from "./frame";
import { frameFactory } from "./frame-factory";

export class FrameModel {

    private frame? : Frame;

    public load(rawCode : string) {
       [this.frame,] = frameFactory(rawCode);
    }

    public renderAsHtml() {
      return this.frame?.renderAsHtml();
    }

}

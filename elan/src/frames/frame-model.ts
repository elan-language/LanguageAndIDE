import { Frame } from "./frame";
import { frameFactory } from "./frame-factory";

export class FrameModel {

  private frame?: Frame;

  public load(rawCode: string) {
    [this.frame,] = frameFactory(rawCode);
  }

  public select(id: string) {
    this.frame?.clearSelector();
    this.frame?.select(id, "selected");
  }

  public renderAsHtml() {
    return this.frame?.renderAsHtml();
  }

  public newFrame(id? : string) {
    this.frame?.clearSelector();
    this.frame?.newFrame(id);
  }

  public userInput(key: string): void {
    this.frame?.userInput(key);
  }
}

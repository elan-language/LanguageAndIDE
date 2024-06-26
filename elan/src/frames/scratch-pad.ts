import { Frame } from "./interfaces/frame";

export class ScratchPad {
  private frames: Frame[] | undefined;

  addSnippet(frames: Frame[]): void {
    frames[0].getFile().deselectAll();
    this.frames = frames;
  }
  readSnippet(): Frame[] | undefined {
    const toPaste = this.frames;
    this.frames = undefined;
    return toPaste;
  }

  remove(frames: Frame[]) {
    if (this.frames === frames) {
      this.frames = undefined;
    }
  }
}

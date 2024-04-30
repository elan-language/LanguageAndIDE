import { Frame } from "./interfaces/frame";

export class ScratchPad {
    private frame: Frame | undefined;
    
    addSnippet(frame: Frame): void {
        frame.deselect();
        this.frame = frame;
    }
    readSnippet(): Frame | undefined {
        var toPaste = this.frame;
        this.frame = undefined;
        return toPaste;
    }

    remove(frame: Frame) {
        if(this.frame === frame) {
            this.frame = undefined;
        }
    }
}
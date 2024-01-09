"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFrame = void 0;
const frame_factory_1 = require("./frame-factory");
const pending_frame_1 = require("./pending-frame");
class FileFrame {
    frames = new Array();
    // to do hash 
    constructor(code) {
        var nl = code.indexOf("\n");
        var restOfCode = code.substring(nl + 1);
        while (restOfCode.length > 0) {
            const [f, c] = (0, frame_factory_1.frameFactory)(restOfCode);
            this.frames.push(f);
            restOfCode = c;
        }
    }
    frameType(key) {
        var lastFrame = this.frames[this.frames.length - 1];
        if (lastFrame instanceof pending_frame_1.PendingFrame) {
            const nf = lastFrame.frameType(key);
            this.frames.pop();
            this.frames.push(nf);
            return nf;
        }
        return lastFrame;
    }
    newFrame() {
        var pf = new pending_frame_1.PendingFrame();
        this.frames.push(pf);
    }
    applyClass(id, cls) {
        for (var frame of this.frames) {
            frame.applyClass(id, cls);
        }
    }
    renderAsHtml() {
        const ss = [];
        for (var frame of this.frames) {
            ss.push(frame.renderAsHtml());
        }
        const body = ss.join("\n");
        return `<div class='header'># Elan v0.1</div>
        ${body}`;
    }
}
exports.FileFrame = FileFrame;
//# sourceMappingURL=file-frame.js.map
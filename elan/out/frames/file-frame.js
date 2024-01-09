"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFrame = void 0;
const frame_factory_1 = require("./frame-factory");
const global_selector_frame_1 = require("./global-selector-frame");
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
    userInput(key) {
        var lastFrame = this.frames[this.frames.length - 1];
        if (lastFrame instanceof global_selector_frame_1.GlobalSelectorFrame) {
            const nf = lastFrame.userInput(key);
            this.frames.pop();
            this.frames.push(nf);
            return this;
        }
        lastFrame.userInput(key);
        return this;
    }
    newFrame() {
        var pf = new global_selector_frame_1.GlobalSelectorFrame();
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
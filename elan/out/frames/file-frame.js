"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFrame = void 0;
const frame_factory_1 = require("./frame-factory");
const global_selector_frame_1 = require("./global-selector-frame");
class FileFrame {
    frames = new Array();
    htmlId = "file";
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
    clearSelector() {
        for (var frame of this.frames) {
            if (frame instanceof global_selector_frame_1.GlobalSelectorFrame) {
                const index = this.frames.indexOf(frame);
                const before = this.frames.slice(0, index);
                const after = this.frames.slice(index + 1);
                this.frames = [...before, ...after];
            }
        }
        for (var frame of this.frames) {
            frame.clearSelector();
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
        else {
            lastFrame.userInput(key);
        }
        return this;
    }
    newFrame(id) {
        if (!id) {
            var pf = new global_selector_frame_1.GlobalSelectorFrame();
            this.frames.push(pf);
        }
        else {
            for (var frame of this.frames) {
                frame.newFrame(id);
            }
        }
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
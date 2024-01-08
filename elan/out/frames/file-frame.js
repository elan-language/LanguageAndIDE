"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFrame = void 0;
const frame_factory_1 = require("./frame-factory");
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainFrame = void 0;
const frame_factory_1 = require("./frame-factory");
class MainFrame {
    frames = new Array();
    constructor(code) {
        while (code.length > 0) {
            const [f, c] = (0, frame_factory_1.frameFactory)(code);
            this.frames.push(f);
            code = c;
        }
    }
    renderAsHtml() {
        const ss = [];
        for (var frame of this.frames) {
            ss.push(frame.renderAsHtml());
        }
        const statements = ss.join("\n");
        return `
      <div class='frame'><span class='keyword'>main</span>
      ${statements}<span class='keyword'>end main</span></div>`;
    }
}
exports.MainFrame = MainFrame;
//# sourceMappingURL=main-frame.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainFrame = void 0;
const frame_factory_1 = require("./frame-factory");
class MainFrame {
    frames = new Array();
    classes = '';
    constructor(code) {
        while (code.length > 0) {
            const [f, c] = (0, frame_factory_1.frameFactory)(code);
            this.frames.push(f);
            code = c;
        }
    }
    frameType(key) {
        throw new Error("Method not implemented.");
    }
    newFrame() {
        throw new Error("Method not implemented.");
    }
    applyClass(id, cls) {
        this.classes = '';
        if (id === "main") {
            this.classes = cls;
        }
        for (var frame of this.frames) {
            frame.applyClass(id, cls);
        }
    }
    renderAsHtml() {
        const ss = [];
        for (var frame of this.frames) {
            ss.push(frame.renderAsHtml());
        }
        const statements = ss.join("\n");
        const cls = `frame ${this.classes}`;
        //     return `
        //   <div id='main' class='${cls}'><span class='keyword'>main</span>
        //   ${statements}<span class='keyword'>end main</span></div>`;
        return `
      <global id='main' class='${cls}'>
        <keyword>main</keyword>
        <statementBlock>
        ${statements}
        </statementBlock>
        <keyword>end main</keyword>
      </global>`;
    }
}
exports.MainFrame = MainFrame;
//# sourceMappingURL=main-frame.js.map
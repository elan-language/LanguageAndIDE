"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainFrame = void 0;
const frame_factory_1 = require("./frame-factory");
const statement_selector_frame_1 = require("./statement-selector-frame");
class MainFrame {
    frames = new Array();
    classes = '';
    htmlId = "main";
    constructor(code) {
        while (code.length > 0) {
            const [f, c] = (0, frame_factory_1.frameFactory)(code);
            this.frames.push(f);
            code = c;
        }
    }
    clearSelector() {
        for (var frame of this.frames) {
            if (frame instanceof statement_selector_frame_1.StatementSelectorFrame) {
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
    addFrame(frame) {
        this.frames.push(frame);
    }
    userInput(key) {
        for (var frame of this.frames) {
            if (frame instanceof statement_selector_frame_1.StatementSelectorFrame) {
                const nf = frame.userInput(key);
                const index = this.frames.indexOf(frame);
                this.frames[index] = nf;
                return this;
            }
        }
        for (var frame of this.frames) {
            frame.userInput(key);
        }
        return this;
    }
    newFrame(id) {
        if (id === "main") {
            var nf = new statement_selector_frame_1.StatementSelectorFrame();
            this.frames.unshift(nf);
        }
        else {
            for (var frame of this.frames) {
                if (frame.htmlId === id) {
                    var nf = new statement_selector_frame_1.StatementSelectorFrame();
                    const index = this.frames.indexOf(frame) + 1;
                    const before = this.frames.slice(0, index);
                    const after = this.frames.slice(index);
                    this.frames = [...before, nf, ...after];
                    return;
                }
            }
            for (var frame of this.frames) {
                frame.newFrame(id);
            }
        }
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
        return `<global id='main' class='${cls}' tabindex="0">
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
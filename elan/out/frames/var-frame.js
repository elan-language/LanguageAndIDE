"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarFrame = void 0;
const frame_factory_1 = require("./frame-factory");
const text_frame_1 = require("./text-frame");
const text_selector_frame_1 = require("./text-selector-frame");
class VarFrame {
    classes = '';
    idFrame;
    exprFrame;
    constructor(id, expr) {
        this.elementId = (0, frame_factory_1.nextId)();
        this.idFrame = new text_frame_1.TextFrame(id, text_selector_frame_1.TextType.identifier);
        this.exprFrame = new text_frame_1.TextFrame(expr, text_selector_frame_1.TextType.expression);
    }
    addFrame(frame, textType) {
        if (textType === text_selector_frame_1.TextType.identifier) {
            this.idFrame = frame;
        }
        else {
            this.exprFrame = frame;
        }
    }
    frameType(key) {
        if (this.idFrame instanceof text_selector_frame_1.TextSelectorFrame) {
            this.idFrame = this.idFrame.frameType(key);
            if (this.idFrame instanceof text_frame_1.TextFrame && this.exprFrame instanceof text_frame_1.TextFrame) {
                if (this.exprFrame.value.length === 0) {
                    this.exprFrame = new text_selector_frame_1.TextSelectorFrame(text_selector_frame_1.TextType.expression);
                }
            }
        }
        if (this.exprFrame instanceof text_selector_frame_1.TextSelectorFrame) {
            this.exprFrame = this.exprFrame.frameType(key);
        }
        return this;
    }
    newFrame() {
        throw new Error("Method not implemented.");
    }
    elementId;
    applyClass(id, cls) {
        this.classes = '';
        if (id === `var${this.elementId}`) {
            this.classes = cls;
        }
    }
    renderAsHtml() {
        const cls = `frame ${this.classes}`;
        const id = this.idFrame.renderAsHtml();
        const expr = this.exprFrame.renderAsHtml();
        return `<statement id='var${this.elementId}' class="${cls}"><keyword>var</keyword>${id}<keyword>set to</keyword>${expr}</statement>`;
    }
}
exports.VarFrame = VarFrame;
//# sourceMappingURL=var-frame.js.map
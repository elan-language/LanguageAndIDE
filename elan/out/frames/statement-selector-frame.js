"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementSelectorFrame = void 0;
const frame_factory_1 = require("./frame-factory");
const text_selector_frame_1 = require("./text-selector-frame");
const var_frame_1 = require("./var-frame");
class StatementSelectorFrame {
    classes = '';
    constructor() {
        this.elementId = (0, frame_factory_1.nextId)();
    }
    kw = "var";
    index = 0;
    frameType(key) {
        if (key === this.kw[this.index]) {
            this.index++;
        }
        if ((key === "Tab" && this.index > 0) || (this.index === this.kw.length)) {
            const vf = new var_frame_1.VarFrame("", "");
            vf.addFrame(new text_selector_frame_1.TextSelectorFrame(text_selector_frame_1.TextType.identifier), text_selector_frame_1.TextType.identifier);
            return vf;
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
        if (this.index === 0) {
            return `<input type="text">`;
        }
        else {
            return `<statement id='var${this.elementId}' class="frame"><span class='keyword'>${this.kw.substring(0, this.index)}</span><input type="text" placeholder="${this.kw.substring(this.index)}"></statement>`;
        }
    }
}
exports.StatementSelectorFrame = StatementSelectorFrame;
//# sourceMappingURL=statement-selector-frame.js.map
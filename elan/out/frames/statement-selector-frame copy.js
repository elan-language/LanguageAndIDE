"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementSelectorFrame = void 0;
const frame_factory_1 = require("./frame-factory");
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
        else if (key === "Tab" && this.index > 0) {
            return new var_frame_1.VarFrame("", "");
        }
        if (this.index === this.kw.length) {
            return new var_frame_1.VarFrame("", "");
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
            const cls = `frame ${this.classes}`;
            return `<statement id='var${this.elementId}' class="${cls}"><keyword>var</keyword><identifier> </identifier><keyword>set to</keyword><expression class=""></expression></statement>`;
        }
    }
}
exports.StatementSelectorFrame = StatementSelectorFrame;
//# sourceMappingURL=statement-selector-frame%20copy.js.map
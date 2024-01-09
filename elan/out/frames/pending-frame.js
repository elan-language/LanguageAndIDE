"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingFrame = void 0;
const frame_factory_1 = require("./frame-factory");
const main_frame_1 = require("./main-frame");
class PendingFrame {
    classes = '';
    constructor() {
        this.elementId = (0, frame_factory_1.nextId)();
    }
    kw = "main";
    endkw = "end main";
    index = 0;
    frameType(key) {
        if (key === this.kw[this.index]) {
            this.index++;
        }
        else if (key === "Tab" && this.index > 0) {
            return new main_frame_1.MainFrame("");
        }
        if (this.index === this.kw.length) {
            return new main_frame_1.MainFrame("");
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
            return `<div id='main' class='frame'>
                    <span class='keyword'>${this.kw.substring(0, this.index)}</span><input type="text" placeholder="${this.kw.substring(this.index)}">
                    <span class='keyword'>end main</span></div>`;
        }
    }
}
exports.PendingFrame = PendingFrame;
//# sourceMappingURL=pending-frame.js.map
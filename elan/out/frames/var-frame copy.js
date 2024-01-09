"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingFrame = void 0;
const frame_factory_1 = require("./frame-factory");
class PendingFrame {
    id;
    expr;
    classes = '';
    constructor(id, expr) {
        this.id = id;
        this.expr = expr;
        this.elementId = (0, frame_factory_1.nextId)();
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
        return `<div id='var${this.elementId}' class='${cls}'><span class='keyword'>var</span> ${this.id} <span class='keyword'>set to</span><span class='string-value'>  ${this.expr} </span></div>`;
    }
}
exports.PendingFrame = PendingFrame;
//# sourceMappingURL=var-frame%20copy.js.map
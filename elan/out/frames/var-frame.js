"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarFrame = void 0;
const frame_factory_1 = require("./frame-factory");
class VarFrame {
    id;
    expr;
    classes = '';
    constructor(id, expr) {
        this.id = id;
        this.expr = expr;
        this.elementId = (0, frame_factory_1.nextId)();
    }
    frameType(key) {
        throw new Error("Method not implemented.");
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
        // return `<div id='var${this.elementId}' class='${cls}'><span class='keyword'>var</span> ${this.id} <span class='keyword'>set to</span><span class='string-value'>  ${this.expr} </span></div>`;
        return `<statement id='var${this.elementId}' class="${cls}"><keyword>var</keyword><identifier>a</identifier><keyword>set to</keyword><expression class="">3</expression></statement>`;
    }
}
exports.VarFrame = VarFrame;
//# sourceMappingURL=var-frame.js.map
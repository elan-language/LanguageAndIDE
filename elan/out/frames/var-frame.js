"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarFrame = void 0;
class VarFrame {
    id;
    expr;
    constructor(id, expr) {
        this.id = id;
        this.expr = expr;
    }
    renderAsHtml() {
        return `<div class='frame'><span class='keyword'>var</span> ${this.id} <span class='keyword'>set to</span><span class='string-value'>  ${this.expr} </span></div>`;
    }
}
exports.VarFrame = VarFrame;
//# sourceMappingURL=var-frame.js.map
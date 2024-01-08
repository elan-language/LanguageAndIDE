"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameModel = void 0;
class FrameModel {
    load(rawCode) {
    }
    renderAsHtml() {
        return `
      <div id='1' class='frame'><span class='keyword'>main</span>
      <div id='2' class='frame'><span class='keyword'>var</span> a <span class='keyword'>set to</span><span class='string-value'> "Hello World"</span></div>
      <span class='keyword'>end main</span></div>`;
    }
}
exports.FrameModel = FrameModel;
//# sourceMappingURL=frame-model.js.map
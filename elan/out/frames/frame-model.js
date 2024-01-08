"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameModel = void 0;
const frame_factory_1 = require("./frame-factory");
class FrameModel {
    frame;
    load(rawCode) {
        [this.frame,] = (0, frame_factory_1.frameFactory)(rawCode);
    }
    renderAsHtml() {
        return this.frame?.renderAsHtml();
    }
}
exports.FrameModel = FrameModel;
//# sourceMappingURL=frame-model.js.map
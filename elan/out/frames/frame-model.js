"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameModel = void 0;
const frame_factory_1 = require("./frame-factory");
class FrameModel {
    frame;
    load(rawCode) {
        [this.frame,] = (0, frame_factory_1.frameFactory)(rawCode);
    }
    applyClass(id, cls) {
        this.frame?.applyClass(id, cls);
    }
    renderAsHtml() {
        return this.frame?.renderAsHtml();
    }
    newFrame() {
        this.frame?.newFrame();
    }
    userInput(key) {
        this.frame?.userInput(key);
    }
}
exports.FrameModel = FrameModel;
//# sourceMappingURL=frame-model.js.map
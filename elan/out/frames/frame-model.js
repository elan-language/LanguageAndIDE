"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameModel = void 0;
const frame_factory_1 = require("./frame-factory");
class FrameModel {
    frame;
    load(rawCode) {
        [this.frame,] = (0, frame_factory_1.frameFactory)(rawCode);
    }
    select(id) {
        this.frame?.clearSelector();
        this.frame?.select(id, "selected");
    }
    renderAsHtml() {
        return this.frame?.renderAsHtml();
    }
    newFrame(id) {
        this.frame?.clearSelector();
        this.frame?.newFrame(id);
    }
    userInput(key) {
        this.frame?.userInput(key);
    }
}
exports.FrameModel = FrameModel;
//# sourceMappingURL=frame-model.js.map
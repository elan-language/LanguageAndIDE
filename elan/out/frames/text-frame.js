"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFrame = void 0;
const frame_factory_1 = require("./frame-factory");
const text_selector_frame_1 = require("./text-selector-frame");
class TextFrame {
    value;
    textType;
    htmlId = "";
    constructor(value, textType) {
        this.value = value;
        this.textType = textType;
        this.elementId = (0, frame_factory_1.nextId)();
    }
    clearSelector() {
        throw new Error("Method not implemented.");
    }
    userInput(key) {
        throw new Error("Method not implemented.");
    }
    newFrame(id) {
        throw new Error("Method not implemented.");
    }
    elementId;
    applyClass(id, cls) {
    }
    renderAsHtml() {
        return this.textType === text_selector_frame_1.TextType.identifier ? `<identifier>${this.value}</identifier>` : `<expression>${this.value}</expression>`;
    }
}
exports.TextFrame = TextFrame;
//# sourceMappingURL=text-frame.js.map
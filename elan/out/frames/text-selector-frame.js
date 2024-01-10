"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSelectorFrame = exports.TextType = void 0;
const frame_factory_1 = require("./frame-factory");
const text_frame_1 = require("./text-frame");
var TextType;
(function (TextType) {
    TextType[TextType["identifier"] = 0] = "identifier";
    TextType[TextType["expression"] = 1] = "expression";
})(TextType || (exports.TextType = TextType = {}));
class TextSelectorFrame {
    textType;
    htmlId = "";
    constructor(textType, v) {
        this.textType = textType;
        this.elementId = (0, frame_factory_1.nextId)();
        this.currentValue = v ? v : "";
    }
    clearSelector() {
        throw new Error("Method not implemented.");
    }
    currentValue = "";
    isUpperCase(s) {
        return s !== s.toLowerCase() &&
            s === s.toUpperCase();
    }
    userInput(key) {
        if (this.textType === TextType.identifier && this.currentValue === "") {
            if (this.isUpperCase(key)) {
                return this;
            }
        }
        if (key === "Tab" && this.currentValue.length > 0) {
            return new text_frame_1.TextFrame(this.currentValue, this.textType);
        }
        if (key !== "Tab") {
            this.currentValue = this.currentValue + key;
        }
        return this;
    }
    newFrame(id) {
        throw new Error("Method not implemented.");
    }
    elementId;
    applyClass(id, cls) {
    }
    renderAsHtml() {
        return `<input id='ts${this.textType}' class='live' type='text' value='${this.currentValue}'>`;
    }
}
exports.TextSelectorFrame = TextSelectorFrame;
//# sourceMappingURL=text-selector-frame.js.map
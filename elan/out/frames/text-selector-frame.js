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
        this.value = v ? v : "";
    }
    clearSelector() {
        throw new Error("Method not implemented.");
    }
    value = "";
    isUpperCase(s) {
        return s !== s.toLowerCase() &&
            s === s.toUpperCase();
    }
    userInput(key) {
        if (this.textType === TextType.identifier && this.value === "") {
            if (this.isUpperCase(key)) {
                return this;
            }
        }
        if ((key === "Backspace" && this.value.length > 0)) {
            this.value = this.value.slice(0, -1);
        }
        if (key === "Tab" && this.value.length > 0) {
            return new text_frame_1.TextFrame(this.value, this.textType);
        }
        if (key.length === 1) {
            this.value = this.value + key;
        }
        return this;
    }
    newFrame(id) {
        throw new Error("Method not implemented.");
    }
    elementId;
    select(id, cls) {
    }
    renderAsHtml() {
        return `<input id='ts${this.textType}' class='live' type='text' value='${this.value}'>`;
    }
}
exports.TextSelectorFrame = TextSelectorFrame;
//# sourceMappingURL=text-selector-frame.js.map
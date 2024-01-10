"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementSelectorFrame = void 0;
const frame_factory_1 = require("./frame-factory");
const set_frame_1 = require("./set-frame");
const text_selector_frame_1 = require("./text-selector-frame");
const var_frame_1 = require("./var-frame");
class StatementSelectorFrame {
    classes = '';
    htmlId = "";
    constructor() {
        this.elementId = (0, frame_factory_1.nextId)();
    }
    clearSelector() {
        throw new Error("Method not implemented.");
    }
    matckkeyword(key) {
        if (this.index !== 0) {
            return;
        }
        switch (key) {
            case "v": {
                this.kw = "var";
                break;
            }
            case "s": {
                this.kw = "set";
                break;
            }
        }
    }
    createFrame(f) {
        switch (this.kw) {
            case "var": {
                const vf = new var_frame_1.VarFrame("", "");
                vf.addFrame(f, text_selector_frame_1.TextType.identifier);
                return vf;
            }
            case "set": {
                const sf = new set_frame_1.SetFrame("", "");
                sf.addFrame(f, text_selector_frame_1.TextType.identifier);
                return sf;
            }
        }
    }
    kw = "";
    index = 0;
    userInput(key) {
        this.matckkeyword(key);
        if (key === this.kw[this.index]) {
            this.index++;
        }
        if ((key === "Backspace" && this.index > 0)) {
            this.index--;
        }
        if ((key === "Tab" && this.index > 0) || (this.index === this.kw.length)) {
            return this.createFrame(new text_selector_frame_1.TextSelectorFrame(text_selector_frame_1.TextType.identifier));
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
        if (this.index === 0) {
            return `<statement id='${this.kw}${this.elementId}' class="frame">
                    <input id="ss" class="live" type="text">
                    </statement>`;
        }
        else {
            return `<statement id='${this.kw}${this.elementId}' class="frame">
                    <span class='keyword'>${this.kw.substring(0, this.index)}</span><input id="ss" class="live" type="text" placeholder="${this.kw.substring(this.index)}">
                    </statement>`;
        }
    }
}
exports.StatementSelectorFrame = StatementSelectorFrame;
//# sourceMappingURL=statement-selector-frame.js.map
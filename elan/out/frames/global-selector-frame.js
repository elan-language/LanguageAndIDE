"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalSelectorFrame = void 0;
const main_frame_1 = require("./main-frame");
const statement_selector_frame_1 = require("./statement-selector-frame");
class GlobalSelectorFrame {
    constructor() {
    }
    clearSelector() {
        throw new Error("Method not implemented.");
    }
    kw = "main";
    endkw = "end main";
    index = 0;
    htmlId = "";
    userInput(key) {
        if (key === this.kw[this.index]) {
            this.index++;
        }
        if ((key === "Tab" && this.index > 0) || (this.index === this.kw.length)) {
            const mf = new main_frame_1.MainFrame("");
            mf.addFrame(new statement_selector_frame_1.StatementSelectorFrame());
            return mf;
        }
        return this;
    }
    newFrame(id) {
        throw new Error("Method not implemented.");
    }
    applyClass(id, cls) {
    }
    renderAsHtml() {
        if (this.index === 0) {
            return `<input id="gs" class="live" type="text">`;
        }
        else {
            return `<global id='main' class='frame'>
                            <span class='keyword'>${this.kw.substring(0, this.index)}</span><input id="gs" class="live" type="text" placeholder="${this.kw.substring(this.index)}">
                            <statementBlock>
                            </statementBlock>
                            <keyword>end main</keyword>
                            </global>`;
        }
    }
}
exports.GlobalSelectorFrame = GlobalSelectorFrame;
//# sourceMappingURL=global-selector-frame.js.map
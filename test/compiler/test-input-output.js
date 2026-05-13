"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestInputOutput = void 0;
const web_helpers_1 = require("../../src/ide/web/web-helpers");
class TestInputOutput {
    breakPoint(_allScopedSymbols, _id, _singlestep) {
        throw new Error("Method not implemented.");
    }
    drawHtml(html) {
        this.drawn = html;
        return Promise.resolve();
    }
    waitForAnyKey() {
        throw new Error("Method not implemented.");
    }
    writeFile(path, data) {
        this.printed = data;
        return Promise.resolve();
    }
    readFile() {
        return Promise.resolve("Line1 \n Line2\n\rLine3");
    }
    getKey() {
        return Promise.resolve("");
    }
    waitForKey() {
        return Promise.resolve("");
    }
    getKeyWithModifier() {
        const t = ["", ""];
        return Promise.resolve(t);
    }
    clearKeyBuffer() {
        return Promise.resolve();
    }
    printed = "";
    inputed = "";
    drawn = "";
    drawBlockGraphics(html) {
        this.drawn = html;
        return Promise.resolve();
    }
    clearBlockGraphics() {
        this.drawn = "";
        return Promise.resolve();
    }
    drawVectorGraphics(html) {
        this.drawn = html;
        return Promise.resolve();
    }
    clearVectorGraphics() {
        this.drawn = "";
        return Promise.resolve();
    }
    clearDisplay() {
        this.drawn = "";
        return Promise.resolve();
    }
    print(line) {
        (0, web_helpers_1.checkForUnclosedHtmlTag)(line);
        this.printed = this.printed + line;
        return Promise.resolve();
    }
    printTab(position, text) {
        const charsSinceNl = this.printed.length;
        const spaces = "                                                                                ";
        const tab = spaces.substring(0, position - charsSinceNl);
        this.print(`${tab}${text}`);
        return Promise.resolve();
    }
    readLine() {
        return Promise.resolve(this.inputed);
    }
    clearPrintedText() {
        this.printed = "";
        return Promise.resolve();
    }
    clearSystemInfo() {
        this.printed = "";
        return Promise.resolve();
    }
    clearHtml() {
        this.drawn = "";
        return Promise.resolve();
    }
    tone(_duration, _frequency, _volume) {
        return Promise.resolve();
    }
}
exports.TestInputOutput = TestInputOutput;
//# sourceMappingURL=test-input-output.js.map
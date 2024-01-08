"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameFactory = void 0;
const file_frame_1 = require("./file-frame");
const main_frame_1 = require("./main-frame");
const var_frame_1 = require("./var-frame");
function frameFactory(code) {
    const trimmedCode = code.trimStart();
    const firstCharacter = trimmedCode[0];
    switch (firstCharacter) {
        case "#": return [new file_frame_1.FileFrame(trimmedCode), ""];
        case "m": return mainFrameFactory(trimmedCode);
        case "v": return varFrameFactory(trimmedCode);
    }
    return [null, ""];
}
exports.frameFactory = frameFactory;
function mainFrameFactory(code) {
    const mainBodyRegex = /main([\s\S]*)end main([\s\S]*)/;
    const match = code.match(mainBodyRegex);
    return [new main_frame_1.MainFrame(match[1]), match[2]];
}
function varFrameFactory(code) {
    const varRegex = /var(.*)set to (.*)\r\n(.*)/;
    const match = code.match(varRegex);
    return [new var_frame_1.VarFrame(match[1], match[2]), match[3]];
}
//# sourceMappingURL=frame-factory.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestSystem = getTestSystem;
const system_1 = require("../../src/compiler/system");
const test_input_output_1 = require("./test-input-output");
function getTestSystem(input) {
    const tc = new test_input_output_1.TestInputOutput();
    tc.inputed = input;
    const system = new system_1.System(tc);
    return system;
}
//# sourceMappingURL=test-system.js.map
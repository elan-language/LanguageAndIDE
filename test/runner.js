"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTests = runTests;
exports.doImport = doImport;
exports.getTestRunner = getTestRunner;
const assert_outcome_1 = require("../src/compiler/assert-outcome");
const test_status_1 = require("../src/compiler/test-status");
const web_helpers_1 = require("../src/ide/web/web-helpers");
async function runTests(tests) {
    const allOutcomes = [];
    for (const t of tests) {
        const outcomes = [];
        const testId = t[0];
        try {
            await t[1](outcomes);
        }
        catch (e) {
            const msg = e.message || "Test threw error";
            outcomes.push(new assert_outcome_1.AssertOutcome(test_status_1.TestStatus.error, msg, "", "", e));
        }
        allOutcomes.push([testId, outcomes]);
    }
    // clear tests each time or the tests array in the program gets duplicates
    tests.length = 0;
    return allOutcomes;
}
function doImport(str) {
    const url = (0, web_helpers_1.encodeCode)(str);
    return import(url);
}
async function testRunner(jsCode, system, stdlib) {
    return doImport(jsCode).then(async (elan) => {
        if (elan.program) {
            elan._inject(system, stdlib);
            const [, tests] = await elan.program();
            if (tests && tests.length > 0) {
                return await runTests(tests);
            }
        }
        return [];
    });
}
async function getTestRunner(system, stdlib) {
    return async (jsCode) => await testRunner(jsCode, system, stdlib);
}
//# sourceMappingURL=runner.js.map
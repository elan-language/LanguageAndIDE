"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testVBHeader = exports.testCSHeader = exports.testJavaHeader = exports.testPythonHeader = exports.testHeader = exports.testHeaderVersion = void 0;
exports.assertParses = assertParses;
exports.assertDoesNotParse = assertDoesNotParse;
exports.assertParseIncomplete = assertParseIncomplete;
exports.assertDoesNotParseWithMessage = assertDoesNotParseWithMessage;
exports.assertStatusIsValid = assertStatusIsValid;
exports.assertStatusIsIncomplete = assertStatusIsIncomplete;
exports.assertStatusIsInvalid = assertStatusIsInvalid;
exports.assertObjectCodeIs = assertObjectCodeIs;
exports.assertObjectCodeIsWithAdvisories = assertObjectCodeIsWithAdvisories;
exports.assertCompiles = assertCompiles;
exports.assertDoesNotCompile = assertDoesNotCompile;
exports.assertDoesNotCompileWithId = assertDoesNotCompileWithId;
exports.executeTestCode = executeTestCode;
exports.assertObjectCodeExecutes = assertObjectCodeExecutes;
exports.assertTestObjectCodeExecutes = assertTestObjectCodeExecutes;
exports.assertGraphicsContains = assertGraphicsContains;
exports.assertObjectCodeDoesNotExecute = assertObjectCodeDoesNotExecute;
exports.ignore_test = ignore_test;
exports.testHash = testHash;
exports.transforms = transforms;
exports.assertExportedFileIs = assertExportedFileIs;
exports.assertExportedPythonIs = assertExportedPythonIs;
exports.assertExportedJavaIs = assertExportedJavaIs;
exports.assertExportedCSIs = assertExportedCSIs;
exports.assertExportedVBis = assertExportedVBis;
const assert_1 = __importDefault(require("assert"));
const compile_error_1 = require("../../src/compiler/compile-error");
const std_lib_1 = require("../../src/compiler/standard-library/std-lib");
const environment_1 = require("../../src/environment");
const ast_visitor_1 = require("../../src/ide/compile-api/ast-visitor");
const language_cs_1 = require("../../src/ide/frames/language-cs");
const language_java_1 = require("../../src/ide/frames/language-java");
const language_python_1 = require("../../src/ide/frames/language-python");
const language_vb_1 = require("../../src/ide/frames/language-vb");
const status_enums_1 = require("../../src/ide/frames/status-enums");
const stub_input_output_1 = require("../../src/ide/stub-input-output");
const web_helpers_1 = require("../../src/ide/web/web-helpers");
const runner_1 = require("../runner");
const test_system_1 = require("./test-system");
function assertParses(file) {
    assert_1.default.strictEqual(file.parseError, undefined, "Unexpected parse error: " + file.parseError);
}
function assertDoesNotParse(file) {
    assert_1.default.ok(file.parseError);
}
function assertParseIncomplete(file) {
    assert_1.default.ok(file.readParseStatus() === status_enums_1.ParseStatus.incomplete);
}
function assertDoesNotParseWithMessage(file, msg) {
    assert_1.default.strictEqual(file.parseError, msg, "Incorrect parse error: " + file.parseError);
}
function assertStatusIsValid(file) {
    assert_1.default.strictEqual(file.readParseStatus(), status_enums_1.ParseStatus.valid);
}
function assertStatusIsIncomplete(file) {
    assert_1.default.strictEqual(file.readParseStatus(), status_enums_1.ParseStatus.valid);
}
function assertStatusIsInvalid(file) {
    assert_1.default.strictEqual(file.readParseStatus(), status_enums_1.ParseStatus.valid);
}
function assertObjectCodeIs(file, objectCode) {
    const actual = file.compile().replaceAll("\r", "");
    const expected = objectCode.replaceAll("\r", "");
    const errors = file.ast?.getAllCompileErrors() || [];
    assert_1.default.strictEqual(errors.length, 0, errors.map((e) => e.message).join(", "));
    assert_1.default.strictEqual(actual, expected);
}
function assertObjectCodeIsWithAdvisories(file, objectCode, msgs) {
    const actual = file.compile().replaceAll("\r", "");
    const expected = objectCode.replaceAll("\r", "");
    assert_1.default.strictEqual(actual, expected);
    const errors = file.ast?.getAllCompileErrors() || [];
    for (const e of errors) {
        assert_1.default.strictEqual(e.severity, compile_error_1.Severity.advisory);
    }
    for (let i = 0; i < msgs.length; i++) {
        const m = msgs[i];
        const e = errors[i];
        const id = e.locationId; // to help test migration
        const em = e.message + (e.link ?? "");
        assert_1.default.strictEqual(em, m);
    }
}
function assertCompiles(file) {
    file.compile();
    const errors = file.ast?.getAllCompileErrors() || [];
    assert_1.default.strictEqual(errors.length, 0, errors.map((e) => e.message).join(", "));
}
function assertDoesNotCompile(file, msgs) {
    file.compile();
    const errors = file.ast?.getAllCompileErrors() || [];
    for (let i = 0; i < msgs.length; i++) {
        const m = msgs[i];
        const e = errors[i];
        const id = e.locationId; // to help test migration
        const em = e.message + (e.link ?? "");
        assert_1.default.strictEqual(em, m);
    }
}
function assertDoesNotCompileWithId(file, id, msgs) {
    file.compile();
    const hasErrors = file.getById(id);
    const errors = file.ast?.getCompileErrorsFor(id) || [];
    for (let i = 0; i < msgs.length; i++) {
        const m = msgs[i];
        const e = errors[i];
        const em = e.message + (e.link ?? "");
        assert_1.default.strictEqual(em, m);
    }
}
function doImport(str) {
    const url = (0, web_helpers_1.encodeCode)(str);
    return import(url);
}
function executeCode(file, input) {
    const jsCode = file.compile();
    const errors = file.ast?.getAllCompileErrors().filter(e => e.severity !== compile_error_1.Severity.advisory) || [];
    assert_1.default.strictEqual(errors.length, 0, errors.map((e) => e.message).join(", "));
    const system = (0, test_system_1.getTestSystem)(input ?? "");
    const stdlib = new std_lib_1.StdLib(new stub_input_output_1.StubInputOutput());
    stdlib.system = system;
    system.stdlib = stdlib;
    return doImport(jsCode).then(async (elan) => {
        if (elan.program) {
            elan._inject(system, stdlib);
            const [main] = await elan.program();
            await main();
            return system;
        }
        return undefined;
    });
}
async function executeTestCode(file, input) {
    const jsCode = file.compile();
    const errors = file.ast?.getAllCompileErrors().filter(e => e.severity !== compile_error_1.Severity.advisory) || [];
    assert_1.default.strictEqual(errors.length, 0, errors.map((e) => e.message).join(", "));
    const system = (0, test_system_1.getTestSystem)(input ?? "");
    const stdlib = new std_lib_1.StdLib(new stub_input_output_1.StubInputOutput());
    stdlib.system = system;
    system.stdlib = stdlib;
    return doImport(jsCode).then(async (elan) => {
        if (elan.program) {
            elan._inject(system, stdlib);
            const [, tests] = await elan.program();
            return await (0, runner_1.runTests)(tests);
        }
        return [];
    });
}
async function assertObjectCodeExecutes(file, output, input) {
    let actual;
    try {
        const sl = await executeCode(file, input);
        actual = (sl?.elanInputOutput).printed;
    }
    catch (e) {
        assert_1.default.fail(e.message ?? "");
    }
    assert_1.default.strictEqual(actual, output);
}
async function assertTestObjectCodeExecutes(file, expectedOutcomes) {
    let actualOutcomes;
    try {
        actualOutcomes = await executeTestCode(file, "");
    }
    catch (e) {
        assert_1.default.fail(e.message ?? "");
    }
    assert_1.default.strictEqual(actualOutcomes.length, expectedOutcomes.length, "mismatched all outcomes");
    for (let i = 0; i < expectedOutcomes.length; i++) {
        const ao = actualOutcomes[i];
        const eo = expectedOutcomes[i];
        assert_1.default.strictEqual(ao[0], eo[0], "mismatched test names");
        assert_1.default.strictEqual(ao[1].length, eo[1].length, "mismatched outcomes");
        for (let j = 0; j < ao[1].length; j++) {
            const a = ao[1][j];
            const e = eo[1][j];
            assert_1.default.strictEqual(a.status, e.status);
            assert_1.default.strictEqual(a.actual, e.actual);
            assert_1.default.strictEqual(a.expected, e.expected);
            assert_1.default.strictEqual(a.htmlId, e.htmlId);
        }
    }
}
async function assertGraphicsContains(file, offset, snippet) {
    let graphics;
    try {
        const sl = await executeCode(file, "");
        graphics = (sl?.elanInputOutput).drawn;
    }
    catch (e) {
        assert_1.default.fail(e.message ?? "");
    }
    const divs = graphics.split("</div>");
    if (divs.length > offset) {
        assert_1.default.strictEqual(divs[offset], snippet);
    }
    else {
        assert_1.default.fail("no offset");
    }
}
async function assertObjectCodeDoesNotExecute(file, msg) {
    try {
        await executeCode(file);
        assert_1.default.fail();
    }
    catch (e) {
        if (msg) {
            if (e instanceof Error) {
                assert_1.default.strictEqual(e.message, msg);
            }
            else {
                assert_1.default.fail();
            }
        }
        // ok
    }
}
function ignore_test(name, test) { }
function testHash(s) {
    return Promise.resolve("");
}
function transforms() {
    return {
        transform: ast_visitor_1.transform,
        transformMany: ast_visitor_1.transformMany,
    };
}
const pre = environment_1.elanVersion.preRelease === "" ? "" : `-${environment_1.elanVersion.preRelease}`;
exports.testHeaderVersion = `Elan ${environment_1.elanVersion.major}.${environment_1.elanVersion.minor}.${environment_1.elanVersion.patch}${pre}`;
exports.testHeader = `# FFFF ${exports.testHeaderVersion} valid`;
exports.testPythonHeader = `# Python with Elan ${environment_1.elanVersion.major}.${environment_1.elanVersion.minor}.${environment_1.elanVersion.patch}${pre}`;
exports.testJavaHeader = `// Java with Elan ${environment_1.elanVersion.major}.${environment_1.elanVersion.minor}.${environment_1.elanVersion.patch}${pre}`;
exports.testCSHeader = `// C# with Elan ${environment_1.elanVersion.major}.${environment_1.elanVersion.minor}.${environment_1.elanVersion.patch}${pre}`;
exports.testVBHeader = `' VB.NET with Elan ${environment_1.elanVersion.major}.${environment_1.elanVersion.minor}.${environment_1.elanVersion.patch}${pre}`;
async function assertExportedFileIs(file, language, code) {
    let actual;
    try {
        assert_1.default.ok(file.setLanguage(language), "Failed to set language");
        actual = await file.renderAsExport();
    }
    catch (e) {
        assert_1.default.fail(e.message ?? "");
    }
    assert_1.default.strictEqual(actual.replaceAll("\r", ""), code.replaceAll("\r", ""));
}
async function assertExportedPythonIs(file, code) {
    await assertExportedFileIs(file, language_python_1.LanguagePython.Instance, code);
}
async function assertExportedJavaIs(file, code) {
    await assertExportedFileIs(file, language_java_1.LanguageJava.Instance, code);
}
async function assertExportedCSIs(file, code) {
    await assertExportedFileIs(file, language_cs_1.LanguageCS.Instance, code);
}
async function assertExportedVBis(file, code) {
    await assertExportedFileIs(file, language_vb_1.LanguageVB.Instance, code);
}
//# sourceMappingURL=compiler-test-helpers.js.map
import assert from "assert";
import { FileImpl } from "../../frames/file-impl";
import { ParseStatus } from "../../frames/status-enums";
import { Done } from "mocha";
import { getTestSystem } from "./test-system";
import { isSymbol } from "../../frames/symbols/symbol-helpers";
import { StdLib } from "../../std-lib";
import { runTests } from "../../runner";
import { transform, transformMany } from "../../frames/syntax-nodes/ast-visitor";
import { Transforms } from "../../frames/syntax-nodes/transforms";
import { AssertOutcome } from "../../system";

export function assertParses(file: FileImpl) {
    assert.strictEqual(file.parseError, undefined, "Unexpected parse error");
}

export function assertDoesNotParse(file: FileImpl) {
    assert.ok(file.parseError);
}

export function assertStatusIsValid(file: FileImpl) {
    assert.strictEqual(file.getParseStatus(), ParseStatus.valid);
}

export function assertStatusIsIncomplete(file: FileImpl) {
    assert.strictEqual(file.getParseStatus(), ParseStatus.valid);
}

export function assertStatusIsInvalid(file: FileImpl) {
    assert.strictEqual(file.getParseStatus(), ParseStatus.valid);
}

export function assertObjectCodeIs(file: FileImpl, objectCode: string) {
    const actual = file.compile().replaceAll("\r", "");
    const expected = objectCode.replaceAll("\r", "");
    const errors = file.compileErrors();
    assert.strictEqual(errors.length, 0, errors.map(e => e.message).join(", "));
    assert.strictEqual(actual, expected);
}

export function assertDoesNotCompile(file: FileImpl, msgs: string[]) {
    file.compile();

    const errors = file.compileErrors();

    for (var i = 0; i < msgs.length; i++) {
        const m = msgs[i];
        const e = errors[i];
        assert.strictEqual(e.message, m);
    }
}

function doImport(str: string) {
    const url = "data:text/javascript;base64," + btoa(str);
    return import(url);
}

function executeCode(file: FileImpl, input?: string) {

    const jsCode = file.compile();
    const errors = file.compileErrors();
    assert.strictEqual(errors.length, 0, errors.map(e => e.message).join(", "));

    const system = getTestSystem();
    const stdlib = new StdLib();

    if (input) {
        (system as any).inputed = input;
    }

    return doImport(jsCode).then(async (elan) => {
        if (elan.program) {
            elan._inject(system, stdlib);
            const [main,] = await elan.program();
            await main();
            return system;
        }
        return undefined;
    });
}

function executeTestCode(file: FileImpl, input?: string) {

    const jsCode = file.compile();
    const errors = file.compileErrors();
    assert.strictEqual(errors.length, 0, errors.map(e => e.message).join(", "));

    const system = getTestSystem();
    const stdlib = new StdLib();

    if (input) {
        (system as any).inputed = input;
    }

    return doImport(jsCode).then(async (elan) => {
        if (elan.program) {
            elan._inject(system, stdlib);
            const [, tests] = await elan.program();
            return runTests(tests);
        }
        return undefined;
    });
}


export async function assertObjectCodeExecutes(file: FileImpl, output: string, input?: string) {
    var actual;

    try {
        const sl = await executeCode(file, input) as any;
        actual = sl?.printed;
    }
    catch (e) {
        assert.fail((e as any).message ?? "");
    }
    assert.strictEqual(actual, output);
}

export async function assertTestObjectCodeExecutes(file: FileImpl, expectedOutcomes: [string, AssertOutcome[]][]) {
    var actualOutcomes: [string, AssertOutcome[]][];

    try {
        actualOutcomes = await executeTestCode(file, "") as any;
    }
    catch (e) {
        assert.fail((e as any).message ?? "");
    }

    assert.strictEqual(actualOutcomes.length, expectedOutcomes.length, "mismatched all outcomes");


    for (var i = 0; i < expectedOutcomes.length; i++) {

        const ao = actualOutcomes[i];
        const eo = expectedOutcomes[i];

        assert.strictEqual(ao[0], eo[0], "mismatched test names");
        assert.strictEqual(ao[1].length, eo[1].length, "mismatched outcomes");

        for (var j = 0; j < ao[1].length; j++) {

            const a = ao[1][j];
            const e = eo[1][j];

            assert.strictEqual(a.status, e.status);
            assert.strictEqual(a.actual, e.actual);
            assert.strictEqual(a.expected, e.expected);
            assert.strictEqual(a.htmlId, e.htmlId);
        }
    }
}

export async function assertObjectCodeDoesNotExecute(file: FileImpl, msg?: string) {

    try {
        await executeCode(file);
        assert.fail();
    }
    catch (e) {
        if (msg) {
            if (e instanceof Error) {
                assert.strictEqual(e.message, msg);
            }
            else {
                assert.fail();
            }
        }
        // ok
    }
}

export function ignore_test(name: string, test: (done: Done) => void) {
}

export function testHash(s: string) {
    return Promise.resolve("");
}

export function transforms() {
    return {
        transform: transform,
        transformMany: transformMany
    } as Transforms;
}
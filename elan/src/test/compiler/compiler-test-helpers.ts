import assert from "assert";
import { FileImpl } from "../../frames/file-impl";
import { ParseStatus } from "../../frames/status-enums";
import { Done } from "mocha";
import { getTestSystem } from "./test-system";
import { isSymbol } from "../../symbols/symbolHelpers";
import { StdLib } from "../../std-lib";

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

export function assertDoesNotCompile(file: FileImpl, msgs : string[]) {
    file.compile();
    
    const errors = file.compileErrors();

    for (var i = 0; i < msgs.length; i++) {
        const m = msgs[i];
        const e = errors[i];
        assert.strictEqual(e.message, m);
    }
}

export function assertIsSymbol(toTest: any, id: string, name: string) {
    if (isSymbol(toTest)) {
        var sid = toTest.symbolId;
        var st = toTest.symbolType;

        assert.strictEqual(sid, id);
        assert.strictEqual(st?.name, name);
    }
    else {
        assert.fail("expected symbol");
    }
} 

function doImport(str: string) {
    const url = "data:text/javascript;base64," + btoa(str);
    return import(url);
}

function executeCode(file: FileImpl, input? : string) {

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

function executeTestCode(file: FileImpl, input? : string) {

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
            const [main, tests] = await elan.program();
          
            system.print("Test Runner:");
            for (const t of tests as [[string, () => void]]) {
                try {
                    system.print(`\n${t[0]}:`);
                    t[1]();
                    system.print(` pass`);
                }
                catch (e) {
                    system.print(` fail`);
                    system.print(`- ${(e as any).message}`);
                }
            }

            return system;
        }
        return undefined;
    });
}


export async function assertObjectCodeExecutes(file: FileImpl, output: string, input? : string) {
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

export async function assertTestObjectCodeExecutes(file: FileImpl, output : string) {
    var actual;
    
    try {
        const sl = await executeTestCode(file, "") as any;
        actual = sl?.printed; 
    }
    catch (e) {
        assert.fail((e as any).message ?? "");
    }
    assert.strictEqual(actual, output);
}

export async function assertObjectCodeDoesNotExecute(file: FileImpl, msg? : string) {

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

export function testHash(s : string) {
    return Promise.resolve("");
}
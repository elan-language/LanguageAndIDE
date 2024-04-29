import assert from "assert";
import { FileImpl } from "../../frames/file-impl";
import { ParseStatus } from "../../frames/parse-status";
import { Done } from "mocha";
import { getTestSystem } from "./test-system";
import { isSymbol } from "../../symbols/symbolHelpers";
import { StdLib } from "../../std-lib";
import { CompileStatus } from "../../frames/compile-status";

export function assertParses(file: FileImpl) {
    assert.strictEqual(file.parseError, undefined, "Unexpected parse error");
}

export function assertDoesNotParse(file: FileImpl) {
    assert.ok(file.parseError);
}

export function assertStatusIsValid(file: FileImpl) {
    assert.strictEqual(file.parseStatus(), ParseStatus.valid);
}

export function assertStatusIsIncomplete(file: FileImpl) {
    assert.strictEqual(file.parseStatus(), ParseStatus.valid);
}

export function assertStatusIsInvalid(file: FileImpl) {
    assert.strictEqual(file.parseStatus(), ParseStatus.valid);
}

export function assertObjectCodeIs(file: FileImpl, objectCode: string) {
    const actual = file.compile().replaceAll("\r", "");
    const expected = objectCode.replaceAll("\r", "");
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
    assert.strictEqual(CompileStatus[file.compileStatus()], CompileStatus[CompileStatus.error]);
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
    // const jsCode = ts.transpile(tsCode, {
    //     "module": ts.ModuleKind.ES2022,
    //     "target": ts.ScriptTarget.ES2022,
    // });

    const system = getTestSystem();
    const stdlib = new StdLib();

    if (input) {
        (system as any).inputed = input;
    }

    return doImport(jsCode).then(async (elan) => {
        if (elan.program) {
            elan._inject(system, stdlib);
            const main = await elan.program();
            await main();
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
        assert.fail();
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
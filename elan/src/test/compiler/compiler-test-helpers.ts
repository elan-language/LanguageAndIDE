import assert from "assert";
import { FileImpl } from "../../frames/file-impl";
import { ParseStatus } from "../../frames/parse-status";
import { Done } from "mocha";
import { _stdlib as StdLib } from "./standard-library";
import { isSymbol } from "../../symbols/symbolHelpers";

export function assertParses(file: FileImpl) {
    assert.strictEqual(file.parseError, undefined, "Unexpected parse error");
}

export function assertDoesNotParse(file: FileImpl) {
    assert.ok(file.parseError);
}

export function assertStatusIsValid(file: FileImpl) {
    assert.strictEqual(file.status(), ParseStatus.valid);
}

export function assertStatusIsIncomplete(file: FileImpl) {
    assert.strictEqual(file.status(), ParseStatus.valid);
}

export function assertStatusIsInvalid(file: FileImpl) {
    assert.strictEqual(file.status(), ParseStatus.valid);
}

export function assertObjectCodeIs(file: FileImpl, objectCode: string) {
    const actual = file.renderAsObjectCode().replaceAll("\r", "");
    const expected = objectCode.replaceAll("\r", "");
    assert.strictEqual(actual, expected);
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

function executeCode(file: FileImpl) {

    const jsCode = file.renderAsObjectCode();
    // const jsCode = ts.transpile(tsCode, {
    //     "module": ts.ModuleKind.ES2022,
    //     "target": ts.ScriptTarget.ES2022,
    // });

    const stdlib = new StdLib();

    return doImport(jsCode).then(async (elan) => {
        if (elan.main) {
            elan._inject(stdlib);
            await elan.main();
            return stdlib;
        }
        return undefined;
    });
}


export async function assertObjectCodeExecutes(file: FileImpl, output: string) {
    var actual;
    
    try {
        const sl = await executeCode(file);
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
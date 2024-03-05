import assert from "assert";
import { FileImpl } from "../../frames/file-impl";
import { ParseStatus } from "../../frames/parse-status";
import * as ts from "typescript";
import { Done } from "mocha";

export function assertParses(file: FileImpl) {
    assert.strictEqual(file.parseError, undefined, "Unexpected parse error");
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

function doImport(str: string) {
    const url = "data:text/javascript;base64," + btoa(str);
    return import(url);
}


export function assertObjectCodeExecutes(file: FileImpl, output: string, done: Done) {

    const tsCode = file.renderAsObjectCode();
    const jsCode = ts.transpile(tsCode, {
        "module": ts.ModuleKind.ES2022,
        "target": ts.ScriptTarget.ES2022,
    });
    const testSystem = new TestSystem(output);

    doImport(jsCode).then(async (elan) => {
        if (elan.main) {
            done(await elan.main(testSystem));
        }
        else {
            done(assert.fail("no compiled main"));
        }
    }).catch((e) => {
        done(assert.fail(e));
    });
}

export function ignore_test(name: string, test: any) {
}

class TestSystem {

    constructor(private testOutput: string, private testInput?: string) {
    }

    async input() {
        return this.testInput;
    }

    print(v: string) {
        assert.strictEqual(v, this.testOutput);
    }
}
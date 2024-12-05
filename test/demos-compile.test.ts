import assert from "assert";
import { DefaultProfile } from "../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { CompileStatus, ParseStatus, RunStatus, TestStatus } from "../src/frames/status-enums";
import { ignore_test, testHash, transforms } from "./compiler/compiler-test-helpers";
import { createTestRunner, key, loadFileAsModelNew } from "./testHelpers";

suite("Demo compile", () => {
  test("test best-fit", async () => {
    const f = await loadFileAsModelNew(`C:\\elan-language\\IDE\\demo_programs\\best-fit.elan`);
    const runner = await createTestRunner();
    await f.refreshAllStatuses(runner);
    assert.equal(f.readParseStatus(), ParseStatus.valid);
    assert.equal(f.readCompileStatus(), CompileStatus.ok);
    assert.equal(f.readTestStatus(), TestStatus.pass);
  });
});

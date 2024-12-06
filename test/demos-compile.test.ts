import assert from "assert";
import { CompileStatus, ParseStatus, TestStatus } from "../src/frames/status-enums";
import { createTestRunner, loadFileAsModelNew } from "./testHelpers";

suite("Demo compile", () => {
  test("test best-fit", async () => {
    const f = await loadFileAsModelNew(`${__dirname}\\..\\..\\demo_programs\\best-fit.elan`);
    const runner = await createTestRunner();
    await f.refreshAllStatuses(runner);
    assert.equal(f.readParseStatus(), ParseStatus.valid);
    assert.equal(f.readCompileStatus(), CompileStatus.ok);
    assert.equal(f.readTestStatus(), TestStatus.pass);
  });
});

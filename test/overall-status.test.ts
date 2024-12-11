import assert from "assert";
import { DefaultProfile } from "../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../src/frames/file-impl";
import { CompileStatus, ParseStatus, RunStatus, TestStatus } from "../src/frames/status-enums";
import { ignore_test, testHash, transforms } from "./compiler/compiler-test-helpers";
import { createTestRunner, key, loadFileAsModelNew } from "./testHelpers";

suite("Overall Status Tests", () => {
  ignore_test("Pattern for starting from literal program", async () => {
    const code = `# FFFF Elan v1.0.0 valid
  
      constant a set to 3
      main
        print a
      end main
      `;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
  });

  test("new file created with all statuses at default", async () => {
    const prof = new DefaultProfile();
    const f = new FileImpl(testHash, prof, transforms(), true);
    assert.equal(f.readParseStatus(), ParseStatus.default);
    assert.equal(f.readCompileStatus(), CompileStatus.default);
    assert.equal(f.readTestStatus(), TestStatus.default);
    assert.equal(f.readRunStatus(), RunStatus.default);
  });

  ignore_test("test top-level Parse, Compile, Test Status changes", async () => {
    const f = await loadFileAsModelNew(`${__dirname}\\files\\programs/merge-sort.elan`);
    const runner = await createTestRunner();
    f.refreshAllStatuses();
    assert.equal(f.readParseStatus(), ParseStatus.valid);
    assert.equal(f.readCompileStatus(), CompileStatus.ok);
    assert.equal(f.readTestStatus(), TestStatus.pass);
    //1. Make a test fail
    const test64 = f.getById("test64");
    assert.equal(test64.renderAsHtml().startsWith(`<el-test class="ok`), true);
    const exp20 = f.getById("expr20");
    exp20.select();
    exp20.processKey(key("Backspace"));
    exp20.processKey(key("2"));
    await f.refreshAllStatuses();
    assert.equal(f.readParseStatus(), ParseStatus.valid);
    assert.equal(f.readCompileStatus(), CompileStatus.ok);
    assert.equal(f.readTestStatus(), TestStatus.fail);
    assert.equal(test64.renderAsHtml().startsWith(`<el-test class="error`), true);
    exp20.processKey(key("Backspace"));
    exp20.processKey(key("1"));
    f.refreshAllStatuses();
    assert.equal(f.readParseStatus(), ParseStatus.valid);
    assert.equal(f.readCompileStatus(), CompileStatus.ok);
    assert.equal(f.readTestStatus(), TestStatus.pass);
    assert.equal(test64.renderAsHtml().startsWith(`<el-test class="ok`), true);
    //2. Make a parse fail
    let v4 = f.getById("var4");
    v4.select();
    v4.processKey(key("Backspace"));
    v4.processKey(key("Backspace"));
    const m1 = f.getById("main1");
    v4 = f.getById("var4");
    assert.equal(v4.renderAsSource(), "");
    assert.equal(
      v4.renderAsHtml().startsWith(`<el-field id="var4" class="selected focused empty warning"`),
      true,
    );
    f.refreshAllStatuses();
    assert.equal(f.readParseStatus(), ParseStatus.incomplete);
    assert.equal(f.readCompileStatus(), CompileStatus.default);
    assert.equal(m1.renderAsHtml().startsWith(`<main class="warning`), true);
    v4.processKey(key("L"));
    assert.equal(
      v4.renderAsHtml().startsWith(`<el-field id="var4" class="selected focused error"`),
      true,
    );
    f.refreshAllStatuses();
    assert.equal(f.readParseStatus(), ParseStatus.invalid);
    assert.equal(f.readCompileStatus(), CompileStatus.default);
    // Make parse valid but with a compile warning
    v4.processKey(key("Backspace"));
    v4.processKey(key("l"));
    f.refreshAllStatuses();
    assert.equal(f.readParseStatus(), ParseStatus.valid);
    assert.equal(f.readCompileStatus(), CompileStatus.unknownSymbol);
    assert.equal(m1.renderAsHtml().startsWith(`<main class="warning`), true);
    // Make good again
    v4.processKey(key("i"));
    f.refreshAllStatuses();
    assert.equal(f.readParseStatus(), ParseStatus.valid);
    assert.equal(f.readCompileStatus(), CompileStatus.ok);
    assert.equal(m1.renderAsHtml().startsWith(`<main class="ok`), true);
  });
});

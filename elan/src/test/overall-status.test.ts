import assert from "assert";
import * as vscode from "vscode";
import { DefaultProfile } from "../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../frames/file-impl";
import { createTestRunner, key, loadFileAsModel } from "./testHelpers";
import {
  ignore_test,
  testHash,
  transforms,
} from "./compiler/compiler-test-helpers";
import {
  CompileStatus,
  ParseStatus,
  RunStatus,
  TestStatus,
} from "../frames/status-enums";
import { getTestRunner } from "../runner";
import { getTestSystem } from "./compiler/test-system";
import { StdLib } from "../std-lib";

suite("Editing Fields Tests", () => {
  vscode.window.showInformationMessage("Start all unit tests.");

  ignore_test("Pattern for starting from literal program", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid
  
      constant a set to 3
      main
        print a
      end main
      `;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
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

  ignore_test(
    "test top-level Parse, Compile, Test Status changes",
    async () => {
      const f = (await loadFileAsModel("programs/merge-sort.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      assert.equal(f.readTestStatus(), TestStatus.pass);
      //1. Make a test fail
      const test64 = f.getById("test64");
      assert.equal(test64.renderAsHtml().startsWith(`<test class="ok`), true);
      const exp20 = f.getById("expr20");
      exp20.select();
      exp20.processKey(key("Backspace"));
      exp20.processKey(key("2"));
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      assert.equal(f.readTestStatus(), TestStatus.fail);
      assert.equal(
        test64.renderAsHtml().startsWith(`<test class="error`),
        true,
      );
      exp20.processKey(key("Backspace"));
      exp20.processKey(key("1"));
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      assert.equal(f.readTestStatus(), TestStatus.pass);
      assert.equal(test64.renderAsHtml().startsWith(`<test class="ok`), true);
      //2. Make a parse fail
      let v4 = f.getById("var4");
      v4.select();
      v4.processKey(key("Backspace"));
      v4.processKey(key("Backspace"));
      const m1 = f.getById("main1");
      v4 = f.getById("var4");
      assert.equal(v4.renderAsSource(), "");
      assert.equal(
        v4
          .renderAsHtml()
          .startsWith(
            `<field id="var4" class="selected focused empty warning"`,
          ),
        true,
      );
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.incomplete);
      assert.equal(f.readCompileStatus(), CompileStatus.default);
      assert.equal(m1.renderAsHtml().startsWith(`<main class="warning`), true);
      v4.processKey(key("L"));
      assert.equal(
        v4
          .renderAsHtml()
          .startsWith(`<field id="var4" class="selected focused error"`),
        true,
      );
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.invalid);
      assert.equal(f.readCompileStatus(), CompileStatus.default);
      // Make parse valid but with a compile warning
      v4.processKey(key("Backspace"));
      v4.processKey(key("l"));
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.unknownSymbol);
      assert.equal(m1.renderAsHtml().startsWith(`<main class="warning`), true);
      // Make good again
      v4.processKey(key("i"));
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      assert.equal(m1.renderAsHtml().startsWith(`<main class="ok`), true);
    },
  );

  test(
    "test wordle3",
    async () => {
      const f = (await loadFileAsModel("programs/wordle3.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      // assert.equal(f.readTestStatus(), TestStatus.pass);
    },
  );

  test(
    "test wordle-player",
    async () => {
      const f = (await loadFileAsModel("programs/wordle-player.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      assert.equal(f.readTestStatus(), TestStatus.pass);
    },
  );

  test(
    "test best-fit",
    async () => {
      const f = (await loadFileAsModel("programs/best-fit.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      //assert.equal(f.readTestStatus(), TestStatus.pass);
    },
  );

  test(
    "test binary-search",
    async () => {
      const f = (await loadFileAsModel("programs/binary-search.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      //assert.equal(f.readTestStatus(), TestStatus.pass);
    },
  );

  test(
    "test merge-sort",
    async () => {
      const f = (await loadFileAsModel("programs/merge-sort.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      //assert.equal(f.readTestStatus(), TestStatus.pass);
    },
  );

  test(
    "test roman-numerals-1",
    async () => {
      const f = (await loadFileAsModel("programs/roman-numerals-1.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      //assert.equal(f.readTestStatus(), TestStatus.pass);
    },
  );

  test(
    "test roman-numerals-4",
    async () => {
      const f = (await loadFileAsModel("programs/roman-numerals-4.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      //assert.equal(f.readTestStatus(), TestStatus.pass);
    },
  );
  test(
    "test roman-numerals-5",
    async () => {
      const f = (await loadFileAsModel("programs/roman-numerals-5.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      //assert.equal(f.readTestStatus(), TestStatus.pass);
    },
  );
  ignore_test(
    "test roman-numerals-6",
    async () => {
      const f = (await loadFileAsModel("programs/roman-numerals-6.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      //assert.equal(f.readTestStatus(), TestStatus.pass);
    },
  );
  ignore_test(
    "test roman-numerals-7",
    async () => {
      const f = (await loadFileAsModel("programs/roman-numerals-7.elan")) as FileImpl;
      const runner = createTestRunner();
      await f.refreshAllStatuses(runner);
      assert.equal(f.readParseStatus(), ParseStatus.valid);
      assert.equal(f.readCompileStatus(), CompileStatus.ok);
      //assert.equal(f.readTestStatus(), TestStatus.pass);
    },
  );
});

import assert from "assert";
import * as vscode from "vscode";
import { DefaultProfile } from "../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../frames/file-impl";
import { key, loadFileAsModel } from "./testHelpers";
import { Constant } from "../frames/globals/constant";
import { ignore_test, testHash, transforms } from "./compiler/compiler-test-helpers";
import { CompileStatus, ParseStatus, TestStatus } from "../frames/status-enums";
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

    test("test top-level Parse and Compile Status changes", async () => {
        const f = (await loadFileAsModel("programs/merge-sort.elan")) as FileImpl;
        const system = getTestSystem();
        const stdlib = new StdLib();
        const runner = getTestRunner(system, stdlib);
        await f.refreshAllStatuses(runner);
        assert.equal(f.readParseStatus(), ParseStatus.valid);
        assert.equal(f.readCompileStatus(), CompileStatus.ok);
        let v4 = f.getById("var4");
        v4.select();
        v4.processKey(key("Backspace"));
        v4.processKey(key("Backspace"));
        const m1 = f.getById("main1");
        v4 = f.getById("var4");
        assert.equal(v4.renderAsSource(), "");
        assert.equal(v4.renderAsHtml().startsWith(`<field id="var4" class="selected focused empty warning"`), true);
        await f.refreshAllStatuses(runner);
        assert.equal(f.readParseStatus(), ParseStatus.incomplete);
        assert.equal(f.readCompileStatus(), CompileStatus.default); 
        assert.equal(m1.renderAsHtml().startsWith(`<main class="warning`), true); 
        v4.processKey(key("L"));
        assert.equal(v4.renderAsHtml().startsWith(`<field id="var4" class="selected focused error"`), true);
        await f.refreshAllStatuses(runner);
        assert.equal(f.readParseStatus(), ParseStatus.invalid);
        assert.equal(f.readCompileStatus(), CompileStatus.default);
        v4.processKey(key("Backspace"));
        v4.processKey(key("l"));
        await f.refreshAllStatuses(runner);
        assert.equal(f.readParseStatus(), ParseStatus.valid);
        assert.equal(f.readCompileStatus(), CompileStatus.unknownSymbol); 
        assert.equal(m1.renderAsHtml().startsWith(`<main class="warning`), true);
        v4.processKey(key("i"));
        await f.refreshAllStatuses(runner);
        assert.equal(f.readParseStatus(), ParseStatus.valid);
        assert.equal(f.readCompileStatus(), CompileStatus.ok); 
        assert.equal(m1.renderAsHtml().startsWith(`<main class="ok`), true); 
    });
});
import assert from "assert";
import * as vscode from "vscode";
import { CodeSourceFromString } from "../frames/code-source";
import { DefaultProfile } from "../frames/default-profile";
import { Regexes } from "../frames/fields/regexes";
import { FileImpl } from "../frames/file-impl";
import { hash } from "../util";
import { ignore_test, transforms } from "./compiler/compiler-test-helpers";
import { T03_mainWithAllStatements } from "./model-generating-functions.";
import { assertElementHasClasses, key } from "./testHelpers";

suite("Misc Tests", () => {
  vscode.window.showInformationMessage("Start all unit tests.");

  ignore_test("Invalid identifier", async () => {
    const file = T03_mainWithAllStatements();
    await assertElementHasClasses(file, "fileStatus", "incomplete");
    await assertElementHasClasses(file, "var3", "incomplete");
    file.getById("var4").processKey(key("X"));
    await assertElementHasClasses(file, "var3", "invalid");
    await assertElementHasClasses(file, "fileStatus", "invalid");
  });

  ignore_test("Valid identifier", async () => {
    const file = T03_mainWithAllStatements();
    await assertElementHasClasses(file, "fileStatus", "incomplete");
    await assertElementHasClasses(file, "var3", "incomplete");
    file.getById("var4").processKey(key("q"));
    await assertElementHasClasses(file, "var4", "valid");
    await assertElementHasClasses(file, "fileStatus", "incomplete"); //Because there are other incomplete fields
  });

  ignore_test("Valid variable statement", async () => {
    const file = T03_mainWithAllStatements();
    await assertElementHasClasses(file, "fileStatus", "incomplete");
    await assertElementHasClasses(file, "var3", "incomplete");
    file.getById("var4").processKey(key("q"));
    file.getById("expr5").processKey(key("5"));
    await assertElementHasClasses(file, "var3", "valid");
  });

  //Regex
  test("Test Regexes", () => {
    assert.equal(Regexes.newLine.test(""), false);
    assert.equal(Regexes.newLine.test("\n"), true);
    assert.equal(Regexes.newLine.test("\r\n"), true);
  });

  //Code source

  test("code source - readToNonMatchingCloseBracket1", () => {
    const source = new CodeSourceFromString("foo, bar, yon) ");
    const read = source.readToNonMatchingCloseBracket();
    assert.equal(read, "foo, bar, yon");
    assert.equal(source.getRemainingCode(), ") ");
  });
  test("code source - readToNonMatchingCloseBracket2", () => {
    const source = new CodeSourceFromString(`"x)y" ) `);
    const read = source.readToNonMatchingCloseBracket();
    assert.equal(read, `"x)y" `);
    assert.equal(source.getRemainingCode(), ") ");
  });
  test("code source - readToNonMatchingCloseBracket3", () => {
    const source = new CodeSourceFromString(`x() ) `);
    const read = source.readToNonMatchingCloseBracket();
    assert.equal(read, `x() `);
    assert.equal(source.getRemainingCode(), ") ");
  });

  test("parse Frames - empty file", async () => {
    const source = new CodeSourceFromString("");
    const fl = new FileImpl(hash, new DefaultProfile(), transforms());
    await await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    const code = `# 3d5cc500bca56a6ef67992ad5ba558b08fcae4d47cb1c10d7487bdf2ec842b86 Elan Beta 1 valid

`;
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });
});

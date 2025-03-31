import assert from "assert";
import { CodeSourceFromString } from "../src/frames/code-source";
import { DefaultProfile } from "../src/frames/default-profile";
import { Regexes } from "../src/frames/fields/regexes";
import { FileImpl } from "../src/frames/file-impl";
import { hash } from "../src/util";
import { ignore_test, testHeaderVersion, transforms } from "./compiler/compiler-test-helpers";
import { T03_mainWithAllStatements } from "./model-generating-functions";
import { assertElementHasClasses, key } from "./testHelpers";

suite("Misc Tests", () => {
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

  //RegExp
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
    await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    const code = `# 14fdf0594bba0db0ab1657374310d3f97f7fc84b35bed0f76160bd5d46bfa7e6 ${testHeaderVersion} valid

`;
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });
});

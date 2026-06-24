import assert from "assert";
import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { Regexes } from "../../src/ide/frames/fields/regexes";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { LanguageElan } from "../../src/ide/frames/language-elan";
import { Profile } from "../../src/ide/frames/profile";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { processInnerCode } from "../../src/tools/codeParser";
import { ignore_test, testHeader, transforms } from "../compiler/compiler-test-helpers";

suite("Misc Tests", () => {
  //RegExp
  test("Test Regexes", () => {
    assert.equal(Regexes.newLine.test(""), false);
    assert.equal(Regexes.newLine.test("\n"), true);
    assert.equal(Regexes.newLine.test("\r\n"), true);
    assert.equal(Regexes.identifier.test(`foo_bar`), true);
    assert.equal(Regexes.identifier.test(`_bar`), true);
    assert.equal(Regexes.identifier.test(`3foo_bar`), false);
    assert.equal(Regexes.identifier.test(`3_bar`), false);
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
    const fl = new FileImpl(
      () => Promise.resolve("FFFF"),
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsElanSource();
    const code = `${testHeader}

`;
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });

  ignore_test("code parser", async () => {
    const code = `
main
  variable li set to [3, 6, 1, 0, 99, 4, 67]
  call inPlaceRippleSort(li)
  print(li)
end main
`;
    const htmlElan = await processInnerCode(code);
    assert.equal(htmlElan[0].startsWith("<el-main"), true);
  });
});

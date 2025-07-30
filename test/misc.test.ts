import assert from "assert";
import { testHeader, transforms } from "./compiler/compiler-test-helpers";
import { CodeSourceFromString } from "../src/ide/frames/code-source-from-string";
import { DefaultProfile } from "../src/ide/frames/default-profile";
import { Regexes } from "../src/ide/frames/fields/regexes";
import { FileImpl } from "../src/ide/frames/file-impl";
import { StdLib } from "../src/compiler/standard-library/std-lib";
import { StubInputOutput } from "../src/ide/stub-input-output";

suite("Misc Tests", () => {
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
    const fl = new FileImpl(
      () => Promise.resolve("FFFF"),
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fl.parseFrom(source);
    const elan = await fl.renderAsSource();
    const code = `${testHeader}

`;
    assert.equal(elan, code.replaceAll("\n", "\r\n"));
  });
});

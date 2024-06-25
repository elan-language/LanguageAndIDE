import assert from "assert";
import { CodeSourceFromString } from "../frames/code-source";
import { DefaultProfile } from "../frames/default-profile";
import { AssignableField } from "../frames/fields/assignableField";
import { FileImpl } from "../frames/file-impl";
import { testHash, transforms } from "./compiler/compiler-test-helpers";

suite("Autocomplete", () => {
  test("Pass_Minimal", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var foo set to 1
  var foobar set to 2
  set f
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    await fileImpl.renderAsHtml();

    const fld = fileImpl.getById("ident10") as AssignableField;
    const symbols = fld.autocompleteSymbols;

    const expected = [
      ["foo", "Int"],
      ["foobar", "Int"],
    ];

    assert.strictEqual(symbols.length, expected.length);

    for (let i = 0; i < expected.length; i++) {
      const s = symbols[i];
      const e = expected[i];

      assert.strictEqual(s.symbolId, e[0]);
      assert.strictEqual(s.symbolType(transforms()).name, e[1]);
    }
  });
});

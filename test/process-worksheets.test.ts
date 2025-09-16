import assert from "assert";
import { processWorksheetCode } from "../src/build-scripts/preprocess-worksheets";

suite("process worksheets", () => {
  test("process constructor", async () => {
    const code = `constructor()
  set property.p1 to 1
end constructor`;

    let actual = await processWorksheetCode(code);

    const expected = ``;

    assert.strictEqual(actual, expected);
  });
});

import assert from "assert";
import { processWorksheetCode } from "../src/build-scripts/preprocess-worksheets";

suite("process worksheets", () => {
  test("process file", async () => {
    const code = `procedure fillRandom(grid as Array2D<of Int>)
  for col from 0 to 39 step 1
    for row from 0 to 29 step 1
      let cell be if random() > 0.5 then black else white
      call grid.put(col, row, cell)
    end for
  end for
end procedure`;

    let actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-header"), true);
  });

  test("process statement", async () => {
    const code = `for col from 0 to 39 step 1
  for row from 0 to 29 step 1
    let cell be if random() > 0.5 then black else white
    call grid.put(col, row, cell)
  end for
end for`;

    let actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-statement"), true);
  });

  test("process constructor", async () => {
    const code = `constructor()
  set property.p1 to 1
end constructor`;

    let actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-constructor"), true);
  });

  test("process expression", async () => {
    const code = `a + b`;

    let actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-id"), true);
  });

  test("process keyword1", async () => {
    const code = `let`;

    let actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-kw"), true);
  });

  test("process keyword2", async () => {
    const code = `property`;

    let actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-kw"), true);
  });

  test("process identifier1", async () => {
    const code = `foo`;

    let actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-id"), true);
  });

  test("process identifier2", async () => {
    const code = `foo()`;

    let actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-method"), true);
  });

  test("process type1", async () => {
    const code = `Int`;

    let actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-type"), true);
  });

  test("process type2", async () => {
    const code = `List<of Int>`;

    let actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-type"), true);
  });
});

import assert from "assert";
import { processCode, processWorksheetCode } from "../src/tools/codeParser";
import { processSteps } from "../src/tools/markupParser";

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

    const actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-header"), true);
  });

  test("process statement", async () => {
    const code = `for col from 0 to 39 step 1
  for row from 0 to 29 step 1
    let cell be if random() > 0.5 then black else white
    call grid.put(col, row, cell)
  end for
end for`;

    const actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-statement"), true);
  });

  test("process constructor", async () => {
    const code = `constructor()
  set property.p1 to 1
end constructor`;

    const actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-constructor"), true);
  });

  test("process expression", async () => {
    const code = `a + b`;

    const actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-id"), true);
  });

  test("process keyword1", async () => {
    const code = `let`;

    const actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-kw"), true);
  });

  test("process keyword2", async () => {
    const code = `property`;

    const actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-kw"), true);
  });

  test("process identifier1", async () => {
    const code = `foo`;

    const actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-id"), true);
  });

  test("process identifier2", async () => {
    const code = `foo()`;

    const actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-method"), true);
  });

  test("process type1", async () => {
    const code = `Int`;

    const actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-type"), true);
  });

  test("process type2", async () => {
    const code = `List<of Int>`;

    const actual = await processWorksheetCode(code);

    assert.strictEqual(actual.startsWith("<el-type"), true);
  });

  test("process multiple code", async () => {
    const code = `<code>let</code>
<code>Int</code>`;

    const actual = await processCode(code);

    const expected = `<code><el-kw>let</el-kw></code>
<code><el-type>Int</el-type></code>`;

    assert.strictEqual(actual, expected);
  });

  test("process step", async () => {
    const code = `<step></step>
<step></step>`;

    const actual = await processSteps(code);

    const expected = `<div class="step" id="step0">
</div>
<div class="step" id="step1">
</div>`;

    assert.strictEqual(actual, expected);
  });
});

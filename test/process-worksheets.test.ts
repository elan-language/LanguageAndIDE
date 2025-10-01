import assert from "assert";
import { processCode, processWorksheetCode } from "../src/tools/codeParser";
import { processHints, processSteps } from "../src/tools/markupParser";

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

  test("process multiple steps", async () => {
    const steps = `<step id="Preliminaries"><content></content></step>
<step><content></content></step>`;

    const actual = await processSteps(steps);

    const expected = `<div class="step" id="step0"><content></content><label class="done" for="done0">Step Completed</label><input class="step-complete" type="checkbox" id="done0"><span> Total hints used: <span class="hints-taken"></span><span class="hints-total"></span></span></div>
<div class="step" id="step1"><content></content><label class="done" for="done1">Step Completed</label><input class="step-complete" type="checkbox" id="done1"><span> Total hints used: <span class="hints-taken"></span><span class="hints-total"></span></span></div>`;

    assert.strictEqual(actual, expected);
  });

  test("process multiple hints", async () => {
    const hints = `<hint></hint><content><p>hint details</p></content>
<hint></hint><content><p>hint details</p></content>`;

    const actual = await processHints(hints, 0);

    const expected = `<div class="hint" id="hint0-0" data-hint="PHA+aGludCBkZXRhaWxzPC9wPg=="></div>
<div class="hint" id="hint0-1" data-hint="PHA+aGludCBkZXRhaWxzPC9wPg=="></div>`;

    assert.strictEqual(actual, expected);
  });
});

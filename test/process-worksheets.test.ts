import assert from "assert";
import { processWorksheetsInDirectory } from "../src/build-scripts/preprocess-worksheets";
import { processInnerCode } from "../src/tools/codeParser";
import {
  processCode,
  processHints,
  processLoads,
  processQuestions,
  processSteps,
} from "../src/tools/markupParser";
import { codeBlockEndTag, codeBlockTag, codeEndTag, codeTag } from "../src/tools/parserConstants";
import { ignore_test } from "./compiler/compiler-test-helpers";

suite("process worksheets", () => {
  test("process file with header", async () => {
    const code = `# 39dadda3dc0838303aa6ec281b404d197527891272e1abb29369f83f5974a6de Elan 1.5.1 guest default_profile valid
`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-header"), true);
  });

  test("process file", async () => {
    const code = `procedure fillRandom(grid as Array2D<of Int>)
  for col from 0 to 39 step 1
    for row from 0 to 29 step 1
      let cell be if random() > 0.5 then black else white
      call grid.put(col, row, cell)
    end for
  end for
end procedure`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-proc"), true);
  });

  test("process statement", async () => {
    const code = `for col from 0 to 39 step 1
  for row from 0 to 29 step 1
    let cell be if random() > 0.5 then black else white
    call grid.put(col, row, cell)
  end for
end for`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-statement"), true);
  });

  test("process constructor", async () => {
    const code = `constructor()
  set property.p1 to 1
end constructor`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-constructor"), true);
  });

  test("process expression", async () => {
    const code = `a + b`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-id"), true);
  });

  test("process keyword1", async () => {
    const code = `let`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-kw"), true);
  });

  test("process keyword2", async () => {
    const code = `property`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-kw"), true);
  });

  test("process identifier1", async () => {
    const code = `foo`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-id"), true);
  });

  test("process identifier2", async () => {
    const code = `foo()`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-method"), true);
  });

  test("process type1", async () => {
    const code = `Int`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-type"), true);
  });

  test("process type2", async () => {
    const code = `List<of Int>`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-type"), true);
  });

  test("process expression", async () => {
    const code = `mark[something] + "2" + mark[something]`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-id"), true);
  });

  test("process wrapped expression", async () => {
    const code = `<code>
  mark[something] + "2" + mark[something]
</code>`;

    const actual = await processCode(code, codeTag, codeEndTag);

    const expected = `<el-code><el-id>mark</el-id>[<el-id>something</el-id>] + "<el-lit>2</el-lit>" + <el-id>mark</el-id>[<el-id>something</el-id>]</el-code>`;

    assert.strictEqual(actual, expected);
  });

  test("process wrapped test", async () => {
    const code = `<codeblock>
  test ranges
    let mark be "00000"
    let i be 3
    let expression be mark[something] + "2" + mark[something]
    assert expression is "00020"
  end test
</codeblock>`;

    const actual = await processCode(code, codeBlockTag, codeBlockEndTag);

    assert.strictEqual(actual.startsWith("<el-code-block><el-test"), true);
  });

  test("process multiple code", async () => {
    const code = `<code>let</code>
<code>Int</code>`;

    const actual = await processCode(code, codeTag, codeEndTag);

    const expected = `<el-code><el-kw>let</el-kw></el-code>
<el-code><el-type>Int</el-type></el-code>`;

    assert.strictEqual(actual, expected);
  });

  test("process multiple codeblock", async () => {
    const code = `<codeblock>let</codeblock>
<codeblock>Int</codeblock>`;

    const actual = await processCode(code, codeBlockTag, codeBlockEndTag);

    const expected = `<el-code-block><el-kw>let</el-kw></el-code-block>
<el-code-block><el-type>Int</el-type></el-code-block>`;

    assert.strictEqual(actual, expected);
  });

  test("process multiple steps", async () => {
    const steps = `<step><content>STEPNUMBER</content></step>
<step><content>STEPID</content></step>`;

    const actual = await processSteps(steps);

    const expected = `<div class="step" id="step0"><content>0</content><label class="done" for="done0">Step Completed</label><input class="step-complete" type="checkbox" id="done0"><span> Total hints used: <span class="hints-taken"></span>/<span class="hints-total"></span></span></div>
<div class="step" id="step1"><content>step1</content><label class="done" for="done1">Step Completed</label><input class="step-complete" type="checkbox" id="done1"><span> Total hints used: <span class="hints-taken"></span>/<span class="hints-total"></span></span></div>`;

    assert.strictEqual(actual, expected);
  });

  test("process multiple hints", async () => {
    const hints = `<hint>HINTNUMBER</hint><content><p>hint details</p></content>
<hint>HINTID</hint><content><p>hint details</p></content>`;

    const actual = await processHints(hints, 0);

    const expected = `<div class="hint" id="hint0-1" data-hint="PHA+aGludCBkZXRhaWxzPC9wPg==">0-1</div>
<div class="content" id="hint0-1content"></div>
<div class="hint" id="hint0-2" data-hint="PHA+aGludCBkZXRhaWxzPC9wPg==">hint0-2</div>
<div class="content" id="hint0-2content"></div>`;

    assert.strictEqual(actual, expected);
  });

  test("process multiple questions", async () => {
    const questions = `<question><p>question1 details QUESTIONNUMBER</p></question>
<question><p>question2 details QUESTIONID</p></question>`;

    const actual = await processQuestions(questions, 0);

    const expected = `<p>question1 details 0-0</p>
<textarea class="question" id="question0-0"></textarea>
<p>question2 details question0-1</p>
<textarea class="question" id="question0-1"></textarea>`;

    assert.strictEqual(actual, expected);
  });

  test("process multiple loads", async () => {
    const questions = `<load file="fileLOADNUMBER.elan">Load LOADNUMBER</load>
<load file="file2.elan">Load LOADID</load>`;

    const actual = await processLoads(questions, 0);

    const expected = `<button class="load" id="load0-0" value="file0-0.elan">Load 0-0</button>
<button class="load" id="load0-1" value="file2.elan">Load load0-1</button>`;

    assert.strictEqual(actual, expected);
  });

  test("process file", async () => {
    const code = `
            function markAttempt(attempt as String, target as String) returns String
            variable mark set to "00000"
            variable unused set to something
            for n from 0 to 4 step 1
              if attempt[n] is unused[n] then
                set mark to setChar(mark, n, "2")
                set unused to something
              end if
            end for
            for n from 0 to 4 step 1
              if (mark[n] isnt "2") and unused.contains(attempt[n]) then
                set mark to setChar(mark, n, "1")
                set unused to something
              end if
            end for
            return mark
        end function
`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual.startsWith("<el-func"), true);
  });

  test("process test worksheets", async () => {
    const rootdir = `${__dirname}/../../`;
    const worksheets = `${rootdir}test/raw_worksheets/`;

    processWorksheetsInDirectory(worksheets);
  });
});

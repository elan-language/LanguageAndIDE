import assert from "assert";
import { processWorksheetsInDirectory } from "../../src/build-scripts/preprocess-worksheets";
import { processInnerCode } from "../../src/tools/codeParser";
import {
  processFinals,
  processHelps,
  processHints,
  processLoads,
  processQuestions,
  processSteps,
} from "../../src/tools/markupParser";
import { ignore_test } from "../compiler/compiler-test-helpers";

suite("process worksheets", () => {
  ignore_test("process multiple steps", async () => {
    const steps = `<step><content>STEPNUMBER</content></step>
<step><content>STEPID</content></step>`;

    const actual = await processSteps(steps);

    const expected = `<div class="step" id="step1"><content>1</content><h4>Notes</h4><textarea class="notes" id="notes1" placeholder="Student or teacher may optionally add notes here"></textarea><label class="done" for="done1">Step Completed</label><input class="step-complete" type="checkbox" id="done1"><span> Total hints used: <span class="hints-taken"></span>/<span class="hints-total"></span></span></div>
<div class="step" id="step2"><content>step2</content><h4>Notes</h4><textarea class="notes" id="notes2" placeholder="Student or teacher may optionally add notes here"></textarea><label class="done" for="done2">Step Completed</label><input class="step-complete" type="checkbox" id="done2"><span> Total hints used: <span class="hints-taken"></span>/<span class="hints-total"></span></span></div>`;

    assert.strictEqual(actual, expected);
  });

  ignore_test("process final", async () => {
    const steps = `<final><content>FINALNUMBER FINALID</content></final>`;

    const actual = await processFinals(steps);

    const expected = `<div class="final" id="final3"><content>3 final3</content></div>`;

    assert.strictEqual(actual, expected);
  });

  ignore_test("process multiple hints", async () => {
    const hints = `<hint>HINTNUMBER</hint><content><p>hint details</p></content>
<hint>HINTID</hint><content><p>hint details</p></content>`;

    const actual = await processHints(hints, 0);

    const expected = `<div class="hint" id="hint0-1" data-hint="PHA+aGludCBkZXRhaWxzPC9wPg==">0-1</div>
<div class="content" id="hint0-1content"></div>
<div class="hint" id="hint0-2" data-hint="PHA+aGludCBkZXRhaWxzPC9wPg==">hint0-2</div>
<div class="content" id="hint0-2content"></div>`;

    assert.strictEqual(actual, expected);
  });

  ignore_test("process multiple helps", async () => {
    const hints = `<help>LangRef.html#call</help>
<help>LangRef.html#let</help>`;

    const actual = await processHelps(hints, 0);

    const expected = `<a class="help" href="LangRef.html#call" id="help0-0">show in Help</a>
<a class="help" href="LangRef.html#let" id="help0-1">show in Help</a>`;

    assert.strictEqual(actual, expected);
  });

  ignore_test("process multiple questions", async () => {
    const questions = `<question><p>question1 details QUESTIONNUMBER</p></question>
<question><p>question2 details QUESTIONID</p></question>`;

    const actual = await processQuestions(questions, 0);

    const expected = `<p>question1 details 0-0</p>
<textarea class="question" id="question0-0" placeholder="input is required"></textarea>
<p>question2 details question0-1</p>
<textarea class="question" id="question0-1" placeholder="input is required"></textarea>`;

    assert.strictEqual(actual, expected);
  });

  ignore_test("process multiple loads", async () => {
    const loads = `<load file="test.elan">Load LOADNUMBER</load>
<load file="test2.elan">Load LOADID</load>`;

    const actual = await processLoads(loads, 0);

    const expected = `<button class="load" id="load0-0" data-file="test.elan">Load 0-0</button><div id="code-load0-0" hidden=""></div>
<button class="load" id="load0-1" data-file="test2.elan">Load load0-1</button><div id="code-load0-1" hidden=""></div>`;

    assert.strictEqual(actual, expected);
  });

  ignore_test("process load in paragraph", async () => {
    const html = `<final><p>testing<load file="test.elan">Load LOADNUMBER</load></p></final>`;

    const actual = await processFinals(html);

    const expected = `<div class="final" id="final3"><p>testing<button class="load" id="load3-0" data-file="test.elan">Load 3-0</button></p><div id="code-load3-0" hidden=""></div><p></p></div>`;

    assert.strictEqual(actual, expected);
  });

  ignore_test("process file", async () => {
    const code = `
            function markAttempt(attempt as String, target as String) returns String
            variable mark set to "00000"
            variable unused set to something
            for n in range(0, 5)
              if attempt[n] is unused[n] then
                assign mark to setChar(mark, n, "2")
                assign unused to something
              end if
            end for
            for n in range(0, 5)
              if (mark[n] isnt "2") and unused.contains(attempt[n]) then
                assign mark to setChar(mark, n, "1")
                assign unused to something
              end if
            end for
            return mark
        end function
`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-func"), true);
  });

  ignore_test("process test worksheets", async () => {
    const rootdir = `.\\out\test/../../`;
    const worksheets = `${rootdir}test/raw_worksheets/`;

    processWorksheetsInDirectory(worksheets);
  });
});

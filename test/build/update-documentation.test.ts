import assert from "assert";
import { processDocumentation } from "../../src/build-scripts/update-documentation";
import { processInnerCode } from "../../src/tools/codeParser";
import { processCode } from "../../src/tools/markupParser";
import {
  codeTag,
  codeEndTag,
  codeBlockTag,
  codeBlockEndTag,
} from "../../src/tools/parserConstants";
import { ignore_test } from "../compiler/compiler-test-helpers";
suite("process code", () => {
  test("process documentation", async () => {
    const failures: string[] = [];
    for (const [fileName, contents] of await processDocumentation()) {
      if (contents.includes("Code does not parse")) {
        failures.push(`${fileName} : Code does not parse`);
      }
    }
    assert.strictEqual(failures.length, 0, failures.join("\n"));
  });

  ignore_test("process file with header", async () => {
    const code = `# 39dadda3dc0838303aa6ec281b404d197527891272e1abb29369f83f5974a6de Elan 1.5.1 valid
`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-header"), true);
  });

  ignore_test("process file", async () => {
    const code = `procedure fillRandom(grid as List<of List<of Int>>)
  for col in range(0, 40)
    for row in range(0, 30)
      variable cell set to if_(random() > 0.5, black, white)
      assign grid[col][row] to cell
    end for
  end for
end procedure`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-proc"), true);
  });

  test("process statement", async () => {
    const code = `for col in range(0, 40)
  for row in range(0, 30)
    variable cell set to if_(random() > 0.5, black, white)
    assign grid[col][row] to cell
  end for
end for`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-statement"), true);
  });

  ignore_test("process constructor", async () => {
    const code = `constructor()
  assign this.p1 to 1
end constructor`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-method>"), true);
  });

  test("process expression", async () => {
    const code = `a + b`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-id"), true);
  });

  test("process main", async () => {
    const code = `main 
  variable r set to 2.0
  print($"area = {(pi*r*r).round(2)}")
end main`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-main"), true);
  });

  test("process let", async () => {
    const code = `let a be 1`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-statement"), true);
  });

  ignore_test("process return", async () => {
    const code = `return 1`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-statement"), true);
  });

  test("process keyword1", async () => {
    const code = `assign`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-kw"), true);
  });

  test("process keyword2", async () => {
    const code = `property`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-kw"), true);
  });

  test("process identifier1", async () => {
    const code = `foo`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-id"), true);
  });

  test("process identifier2", async () => {
    const code = `foo()`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-method"), true);
  });

  test("process type1", async () => {
    const code = `Int`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-type"), true);
  });

  test("process function1", async () => {
    const code = `function hex(n as Int) returns String
  return ""
end function`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-func"), true);
  });

  test("process function", async () => {
    const code = `function hex(n as Int) returns String
  variable h set to ""
  if (n &lt; 1) then
    assign h to "0"
  else
    variable m set to n
    while m &gt; 0
      assign h to hexDigit(m mod 16) + h
      assign m to divAsInt(m, 16)
    end while
  end if
  return h
end function
function hexDigit(i as Int) returns String
  return "0123456789abcdef".subString(i, i + 1)
end function`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-func"), true);
  });

  test("process type2", async () => {
    const code = `List<of Int>`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-type"), true);
  });

  test("process expression", async () => {
    const code = `mark[something] + "2" + mark[something]`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-id"), true);
  });

  test("process parameter", async () => {
    const code = `bubbles as List&lt;of CircleVG&gt;`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-id"), true);
  });

  test("process call statement", async () => {
    const code = `call moveGrowBurst(bubbles)`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-statement"), true);
  });

  test("process comment", async () => {
    const code = `# `;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-statement"), true);
  });

  test("process lambda", async () => {
    const code = `lambda n as Node => n.point.equals(p)`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-kw"), true);
  });

  test("process copy", async () => {
    const code = `copy withHead(head as Square) returns Game
  return copyWithPropertyUpdated(this, "head", head)
end copy`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-func"), true);
  });

  test("process procedure", async () => {
    const code = `procedure updateSnake(currentDirRef as AsRef&lt;of Direction&gt;, tailRef as AsRef&lt;of List&lt;of Int&gt;&gt;, headRef as AsRef&lt;of List&lt;of Int&gt;&gt;, body as List&lt;of List&lt;of Int&gt;&gt;)
  variable head set to headRef.value()
  variable tail set to tailRef.value()
  variable currentDir set to currentDirRef.value()
  assign currentDir to directionByKey(currentDir, getKey())
  call tailRef.set(body[0])
  call body.append(head)
  call headRef.set(getAdjacentSquare(head, currentDir))
  call currentDirRef.set(currentDir)
end procedure`;

    const actual = await processInnerCode(code);

    assert.strictEqual(actual[0].startsWith("<el-proc"), true);
  });

  ignore_test("process wrapped expression", async () => {
    const code = `<code>
  mark[something] + "2" + mark[something]
</code>`;

    const actual = await processCode(code, codeTag, codeEndTag);

    const expected = `<code><span class="elan"><el-id>mark</el-id>[<el-id>something</el-id>] + "<el-lit>2</el-lit>" + <el-id>mark</el-id>[<el-id>something</el-id>]</span>
<span class="python"><el-id>mark</el-id>[<el-id>something</el-id>] + "<el-lit>2</el-lit>" + <el-id>mark</el-id>[<el-id>something</el-id>]</span>
<span class="cs"><el-id>mark</el-id>[<el-id>something</el-id>] + "<el-lit>2</el-lit>" + <el-id>mark</el-id>[<el-id>something</el-id>]</span>
<span class="vb"><el-id>mark</el-id>[<el-id>something</el-id>] + "<el-lit>2</el-lit>" + <el-id>mark</el-id>[<el-id>something</el-id>]</span>
<span class="java"><el-id>mark</el-id>[<el-id>something</el-id>] + "<el-lit>2</el-lit>" + <el-id>mark</el-id>[<el-id>something</el-id>]</span></code>`;

    assert.strictEqual(actual, expected);
  });

  ignore_test("process wrapped test", async () => {
    const code = `<codeblock>
  test ranges
    variable mark set to "00000"
    variable i set to 3
    variable expression set to mark[something] + "2" + mark[something]
    assert expression is "00020"
  end test
</codeblock>`;

    const actual = await processCode(code, codeBlockTag, codeBlockEndTag);

    assert.strictEqual(actual.startsWith(`<codeblock><div class="elan"><el-test`), true);
  });

  ignore_test("process multiple code", async () => {
    const code = `<code>new</code>
<code>Int</code>`;

    const actual = await processCode(code, codeTag, codeEndTag);

    const expected = `<code><span class="elan"><el-kw>new</el-kw></span>
<span class="python"><el-kw>new</el-kw></span>
<span class="cs"><el-kw>new</el-kw></span>
<span class="vb"><el-kw>new</el-kw></span>
<span class="java"><el-kw>new</el-kw></span></code>
<code><span class="elan"><el-type>Int</el-type></span>
<span class="python"><el-type>int</el-type></span>
<span class="cs"><el-type>int</el-type></span>
<span class="vb"><el-type>Integer</el-type></span>
<span class="java"><el-type>int</el-type></span></code>`;

    assert.strictEqual(actual, expected);
  });

  ignore_test("process multiple codeblock", async () => {
    const code = `<codeblock>new</codeblock>
<codeblock>Int</codeblock>`;

    const actual = await processCode(code, codeBlockTag, codeBlockEndTag);

    const expected = `<codeblock><div class="elan"><el-kw>new</el-kw></div>
<div class="python"><el-kw>new</el-kw></div>
<div class="cs"><el-kw>new</el-kw></div>
<div class="vb"><el-kw>new</el-kw></div>
<div class="java"><el-kw>new</el-kw></div></codeblock>
<codeblock><div class="elan"><el-type>Int</el-type></div>
<div class="python"><el-type>int</el-type></div>
<div class="cs"><el-type>int</el-type></div>
<div class="vb"><el-type>Integer</el-type></div>
<div class="java"><el-type>int</el-type></div></codeblock>`;

    assert.strictEqual(actual, expected);
  });
});

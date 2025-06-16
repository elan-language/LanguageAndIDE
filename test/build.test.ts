import assert from "assert";
import { updateHints } from "../src/build-scripts/update-worksheet-hints";

suite("Build", () => {
  test("Pass", async () => {
    const code = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html lang="en-GB">

<head>
</head>

<body>

<div class="hint" id="hint3a" data-hint="">Hint3</div>
<div class="content" id="hint3acontent"><el-code>something</el-code></div>

<div class="hint" id="hint4a" data-hint="">Hint4</div>
<div class="content" id="hint4acontent"><el-code>something else</el-code></div>

</body>
</html>`;

    let actual = updateHints(code);

    const expected = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html lang="en-GB"><head>
</head>

<body>

<div class="hint" id="hint3a" data-hint="PGVsLWNvZGU+c29tZXRoaW5nPC9lbC1jb2RlPg==">Hint3</div>
<div class="content" id="hint3acontent"></div>

<div class="hint" id="hint4a" data-hint="PGVsLWNvZGU+c29tZXRoaW5nIGVsc2U8L2VsLWNvZGU+">Hint4</div>
<div class="content" id="hint4acontent"></div>


</body></html>`;

    assert.strictEqual(actual, expected);
  });
});

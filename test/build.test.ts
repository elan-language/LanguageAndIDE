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

<div class="hint" id="hint3a" data-hint="">
  <span class="show">Hint 1</span><span class="taken"> - USED</span>
  <!-- content of hint goes here-->
</div>

<div class="hint" id="hint4a" data-hint="">
  <span class="show">Hint 2</span><span class="taken"> - USED</span>
  <!-- content of hint goes here-->
</div>

</body>
</html>`;

    let actual = updateHints(code);

    const expected = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html lang="en-GB"><head>
</head>

<body>

<div class="hint" id="hint3a" data-hint="CiAgCiAgPCEtLSBjb250ZW50IG9mIGhpbnQgZ29lcyBoZXJlLS0+Cg=="><span class="show">Hint 1</span><span class="taken"> - USED</span></div>

<div class="hint" id="hint4a" data-hint="CiAgCiAgPCEtLSBjb250ZW50IG9mIGhpbnQgZ29lcyBoZXJlLS0+Cg=="><span class="show">Hint 2</span><span class="taken"> - USED</span></div>


</body></html>`;

    assert.strictEqual(actual, expected);
  });
});

import assert from "assert";
import { processDocumentation } from "../../src/build-scripts/update-documentation";
suite("process documentation", () => {
  test("process file with header", async () => {
    const failures: string[] = [];
    for (const [fileName, contents] of await processDocumentation()) {
      if (contents.includes("Code does not parse")) {
        failures.push(`${fileName} : Code does not parse`);
      }
    }
    assert.strictEqual(failures.length, 0, failures.join("\n"));
  });
});

import { processDocumentation } from "../../src/build-scripts/update-documentation";
suite("process worksheets", () => {
  test("process file with header", async () => {
    processDocumentation();
  });
});

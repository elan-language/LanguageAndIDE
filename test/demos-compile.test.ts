import { testDemoProgram } from "./testHelpers";

suite("Demo compile", () => {
  test("test best-fit", async () => {
    await testDemoProgram("best-fit.elan");
  });
  test("test binary-search", async () => {
    await testDemoProgram("binary-search.elan");
  });
  test("test bubbles", async () => {
    await testDemoProgram("bubbles.elan");
  });
  test("test burrow", async () => {
    await testDemoProgram("burrow.elan");
  });
  test("test cards", async () => {
    await testDemoProgram("cards.elan");
  });
  test("test chessboard", async () => {
    await testDemoProgram("chessboard.elan");
  });
  test("test in-place-ripple-sort", async () => {
    await testDemoProgram("in-place-ripple-sort.elan");
  });
  test("test kaleidoscope", async () => {
    await testDemoProgram("kaleidoscope.elan");
  });
  test("test life", async () => {
    await testDemoProgram("life.elan");
  });
  test("test maze-generator", async () => {
    await testDemoProgram("maze-generator.elan");
  });
  test("test merge-sort", async () => {
    await testDemoProgram("merge-sort.elan");
  });
  test("test password-generator", async () => {
    await testDemoProgram("password-generator.elan");
  });
  test("test pathfinder", async () => {
    await testDemoProgram("pathfinder.elan");
  });
  test("test roman-numerals-turing-machine.elan", async () => {
    await testDemoProgram("roman-numerals-turing-machine.elan");
  });
  test("test snake_FP", async () => {
    await testDemoProgram("snake_FP.elan");
  });
  test("test snake_OOP", async () => {
    await testDemoProgram("snake_OOP.elan");
  });
  test("test snake_PP", async () => {
    await testDemoProgram("snake_PP.elan");
  });
  test("test turtle-snowflake", async () => {
    await testDemoProgram("turtle-snowflake.elan");
  });
  test("test turtle-spiral", async () => {
    await testDemoProgram("turtle-spiral.elan");
  });
  test("test wordle-solver", async () => {
    await testDemoProgram("wordle-solver.elan");
  });
});
